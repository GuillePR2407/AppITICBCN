package com.example.apiiticbcn.security.services;



import com.example.apiiticbcn.models.Matricula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.apiiticbcn.repository.UserRepository;
import com.example.apiiticbcn.models.User;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

    return UserDetailsImpl.build(user);
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User addMatricula(String email, Matricula matricula) {
    // Find the user by email
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

    // Assign the matricula to the user
    user.setMatricula(matricula);

    // Save the updated user in the database
    User updatedUser = userRepository.save(user);

    // Return the updated user
    return updatedUser;
  }

  public void deleteUserByEmail(String email) {
    // Find the user by email
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

    // Delete the user
    userRepository.delete(user);
  }

  public User updateUser(User updatedUser) {
    // Find the user by id
    User user = userRepository.findById(updatedUser.getId())
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + updatedUser.getId()));

    // Update the user details
    user.setEmail(updatedUser.getEmail());
    user.setUsername(updatedUser.getUsername());
    // Add other fields that you want to update

    // Save the updated user in the database
    User savedUser = userRepository.save(user);

    // Return the updated user
    return savedUser;
  }

  public UserDetails loadUserByEmail(String email) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

    return UserDetailsImpl.build(user);
  }

}
