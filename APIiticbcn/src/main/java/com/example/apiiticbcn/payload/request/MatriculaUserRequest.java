package com.example.apiiticbcn.payload.request;

import com.example.apiiticbcn.models.Matricula;

public class MatriculaUserRequest {
    private String email;
    private Matricula matricula;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Matricula getMatricula() {
        return matricula;
    }

    public void setMatricula(Matricula matricula) {
        this.matricula = matricula;
    }

    // getters and setters
}
