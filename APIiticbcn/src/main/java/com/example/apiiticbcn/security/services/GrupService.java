package com.example.apiiticbcn.security.services;

import com.example.apiiticbcn.models.Asignatura;
import com.example.apiiticbcn.models.Grup;
import com.example.apiiticbcn.models.EAsignatura;
import com.example.apiiticbcn.repository.AsignaturaRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class GrupService {
    private final AsignaturaRepository asignaturaRepository;

    public GrupService(AsignaturaRepository asignaturaRepository) {
        this.asignaturaRepository = asignaturaRepository;
    }

    public void addDefaultAsignaturas(Grup grup) {
        List<Asignatura> asignaturas = new ArrayList<>();
        switch (grup.getName()) {
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
    }
}