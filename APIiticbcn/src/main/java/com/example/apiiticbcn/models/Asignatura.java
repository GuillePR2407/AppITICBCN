package com.example.apiiticbcn.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "asignaturas")
public class Asignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EAsignatura name;

    @ManyToOne
    @JoinColumn(name = "grupo_id")
    @JsonBackReference
    private Grup grupo;

    public Asignatura() {

    }

    public Asignatura(EAsignatura name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EAsignatura getName() {
        return name;
    }

    public void setName(EAsignatura name) {
        this.name = name;
    }

    public Grup getGrupo() {
        return grupo;
    }

    public void setGrupo(Grup grupo) {
        this.grupo = grupo;
    }
}