package com.example.apiiticbcn.security.services;

import com.example.apiiticbcn.models.Asignatura;
import com.example.apiiticbcn.models.Grup;
import com.example.apiiticbcn.models.EAsignatura;
import com.example.apiiticbcn.models.EGrup;
import com.example.apiiticbcn.repository.AsignaturaRepository;
import com.example.apiiticbcn.repository.GrupRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GrupService {
    private final AsignaturaRepository asignaturaRepository;
    private final GrupRepository grupRepository;

    public GrupService(AsignaturaRepository asignaturaRepository, GrupRepository grupRepository) {
        this.asignaturaRepository = asignaturaRepository;
        this.grupRepository = grupRepository;
    }

    public Grup save(Grup grup) {
        return grupRepository.save(grup);
    }

    public Grup findById(Long id) {
        return grupRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No Grup found with id: " + id));
    }

    public void addDefaultAsignaturas(Grup grup) {
        EGrup groupName = grup.getName();

        if (groupName == null) {
            throw new IllegalArgumentException("El nombre del grupo no puede ser null");
        }
        List<Asignatura> asignaturas = new ArrayList<>();

        switch (groupName) {
            case DAM1:
                asignaturas.add(new Asignatura(EAsignatura.ACCES_A_DADES_UF1));
                asignaturas.add(new Asignatura(EAsignatura.ACCES_A_DADES_UF2));
                break;
            case DAM2:
                asignaturas.add(new Asignatura(EAsignatura.ACCES_A_DADES_UF3));
                asignaturas.add(new Asignatura(EAsignatura.ACCES_A_DADES_UF4));
                break;
            case DAW1:
                asignaturas.add(new Asignatura(EAsignatura.XARXES_UF1));
                asignaturas.add(new Asignatura(EAsignatura.XARXES_UF2));
                break;
            case DAW2:
                asignaturas.add(new Asignatura(EAsignatura.XARXES_UF3));
                asignaturas.add(new Asignatura(EAsignatura.XARXES_UF4));
                break;
            case ASIX1:
                asignaturas.add(new Asignatura(EAsignatura.JAVASCRIPT_UF1));
                asignaturas.add(new Asignatura(EAsignatura.JAVASCRIPT_UF2));
                break;
            case ASIX2:
                asignaturas.add(new Asignatura(EAsignatura.JAVASCRIPT_UF3));
                break;
            // Add more cases as needed
            default:
                // Handle the case where the groupName is not recognized
                break;
        }
        asignaturas.forEach(asignatura -> {
            asignatura.setGrupo(grup);
            asignaturaRepository.save(asignatura);
        });
        grup.setAsignaturas(asignaturas);
        grupRepository.save(grup); // Save the group after adding the default subjects
    }
}