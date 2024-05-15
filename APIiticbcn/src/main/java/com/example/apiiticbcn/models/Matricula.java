package com.example.apiiticbcn.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "matriculas")
public class Matricula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "matricula", cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "grupo_id", nullable = false)
    @JsonBackReference
    private Grup grupo;

    public Matricula() {}

    public Matricula(User user, Grup grupo) {
        this.user = user;
        this.grupo = grupo;
    }

    public User getUser() {
        return user;
    }
    @JsonIgnore
    public void setUser(User user) {
        this.user = user;
    }

    public Grup getGrupo() {
        return grupo;
    }

    public void setGrupo(Grup grupo) {
        this.grupo = grupo;
    }
    // getters y setters
}