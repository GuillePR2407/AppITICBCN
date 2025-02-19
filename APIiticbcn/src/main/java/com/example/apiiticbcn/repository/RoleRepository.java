package com.example.apiiticbcn.repository;


import java.util.Optional;

import com.example.apiiticbcn.models.ERole;
import com.example.apiiticbcn.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
