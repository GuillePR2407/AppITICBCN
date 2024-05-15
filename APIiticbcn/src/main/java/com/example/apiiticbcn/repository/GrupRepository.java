package com.example.apiiticbcn.repository;

import com.example.apiiticbcn.models.Grup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrupRepository extends JpaRepository<Grup, Long> {
}
