package com.example.apiiticbcn.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apiiticbcn.models.User;
import com.example.apiiticbcn.models.Role;
import com.example.apiiticbcn.models.ERole;
import com.example.apiiticbcn.payload.request.LoginRequest;
import com.example.apiiticbcn.payload.request.SignupRequest;
import com.example.apiiticbcn.payload.response.UserInfoResponse;
import com.example.apiiticbcn.payload.response.MessageResponse;
import com.example.apiiticbcn.repository.RoleRepository;
import com.example.apiiticbcn.repository.UserRepository;
import com.example.apiiticbcn.security.jwt.JwtUtils;
import com.example.apiiticbcn.security.services.UserDetailsImpl;

//for Angular Client (withCredentials)
//@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  /*
    {
        "username": "Guille",
        "password": "123456"
    }
   */
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    // Detalles del usuario autenticado
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    
    // Generación de la cookie con el JWT
    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    String jwtToken = jwtCookie.getValue();

    List<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
            .body(new UserInfoResponse(userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles));
  }
  /*
  {
    "username": "Guille",
    "email": "guille@iticbcn.cat",
    "password": "123456",
    "role": "admin"
  }
  */
  @Transactional
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()));

    String strRole = signUpRequest.getRole();
    Role role;

    if (strRole == null || strRole.isEmpty()) {
      role = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    } else {
      switch (strRole) {
        case "admin":
          role = roleRepository.findByName(ERole.ROLE_ADMIN)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          break;
        case "prof":
          role = roleRepository.findByName(ERole.ROLE_PROFESSOR)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          break;
        case "alum":
          role = roleRepository.findByName(ERole.ROLE_STUDENT)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          break;
        default:
          role = roleRepository.findByName(ERole.ROLE_USER)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      }
    }

    user.setRole(role);

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(new MessageResponse("You've been signed out!"));
  }
}