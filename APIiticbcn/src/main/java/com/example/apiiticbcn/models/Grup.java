package com.example.apiiticbcn.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "grups")
public class Grup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EGrup name;

    @OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL)
    private List<Matricula> matriculas = new ArrayList<>();

    @OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Asignatura> asignaturas = new ArrayList<>();


    public Grup() {

    }

    public Grup(EGrup name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EGrup getName() {
        return name;
    }

    public void setName(EGrup name) {
        this.name = name;
    }

    public List<Matricula> getMatriculas() {
        return matriculas;
    }
    @JsonIgnore
    public void setMatriculas(List<Matricula> matriculas) {
        this.matriculas = matriculas;
    }

    public List<Asignatura> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(List<Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }


}