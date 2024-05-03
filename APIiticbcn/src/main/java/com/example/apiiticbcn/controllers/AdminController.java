package com.example.apiiticbcn.controllers;

import java.util.List;

import com.example.apiiticbcn.models.Matricula;
import com.example.apiiticbcn.payload.request.MatriculaUserRequest;
import com.example.apiiticbcn.repository.UserRepository;
import com.example.apiiticbcn.security.services.MatriculaService;
import com.example.apiiticbcn.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.example.apiiticbcn.models.User;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

  @Autowired
  private UserDetailsServiceImpl userService;

  @Autowired
  private MatriculaService matriculaService;

  @GetMapping("/allUsers")
  @PreAuthorize("hasRole('ADMIN')")
  public List<User> getAllUsers() {
    return userService.getAllUsers();
  }

  @PostMapping("/addMatricula/{email}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> addMatricula(@PathVariable String email, @RequestBody Matricula matricula) {
    try {
      // Save the Matricula entity first
      Matricula savedMatricula = matriculaService.save(matricula);

      // Then set the saved Matricula entity on the User entity and save the User entity
      User user = userService.addMatricula(email, savedMatricula);
      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (UsernameNotFoundException e) {
      // Handle error
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/deleteUser/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    try {
      userService.deleteUser(id);
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (UsernameNotFoundException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PutMapping("/updateUser")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> updateUser(@RequestBody User user) {
    try {
      User updatedUser = userService.updateUser(user);
      return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    } catch (UsernameNotFoundException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}