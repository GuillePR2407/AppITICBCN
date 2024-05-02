package com.example.apiiticbcn.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.apiiticbcn.models.Asignatura;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignaturaRepository extends JpaRepository<Asignatura, Long> {
}
