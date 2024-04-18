package com.example.apiiticbcn.controllers;

import java.util.List;

import com.example.apiiticbcn.repository.UserRepository;
import com.example.apiiticbcn.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.apiiticbcn.models.User;

//for Angular Client (withCredentials)
//@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

  @Autowired
  private UserDetailsServiceImpl userService;

  @GetMapping("/users")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }

  @GetMapping("/allUsers")
  @PreAuthorize("hasRole('ADMIN')")
  public List<User> getAllUsers() {
    return userService.getAllUsers();
  }
}
