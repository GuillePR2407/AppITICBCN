package com.example.apiiticbcn.models;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Table(name = "grups")
public class Grup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EGrup name;

    //@Enumerated(EnumType.STRING)
    //@ElementCollection
    //private List<EAsignatura> asignaturas = new ArrayList<>();

    public Grup() {

    }

    public Grup(EGrup name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EGrup getName() {
        return name;
    }

    public void setName(EGrup name) {
        this.name = name;
    }

    /*
    public List<EAsignatura> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(List<EAsignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }

     */
}