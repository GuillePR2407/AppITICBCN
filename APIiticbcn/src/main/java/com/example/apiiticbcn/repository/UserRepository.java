package com.example.apiiticbcn.repository;

import java.util.Optional;

import com.example.apiiticbcn.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("SELECT u.role.id FROM User u WHERE u.email = :email")
    Optional<Long> findRoleIdByEmail(@Param("email") String email);
}
