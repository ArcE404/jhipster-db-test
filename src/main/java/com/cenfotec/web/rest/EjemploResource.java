package com.cenfotec.web.rest;

import com.cenfotec.domain.Ejemplo;
import com.cenfotec.repository.EjemploRepository;
import com.cenfotec.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.cenfotec.domain.Ejemplo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EjemploResource {

    private final Logger log = LoggerFactory.getLogger(EjemploResource.class);

    private static final String ENTITY_NAME = "ejemplo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EjemploRepository ejemploRepository;

    public EjemploResource(EjemploRepository ejemploRepository) {
        this.ejemploRepository = ejemploRepository;
    }

    /**
     * {@code POST  /ejemplos} : Create a new ejemplo.
     *
     * @param ejemplo the ejemplo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ejemplo, or with status {@code 400 (Bad Request)} if the ejemplo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ejemplos")
    public ResponseEntity<Ejemplo> createEjemplo(@Valid @RequestBody Ejemplo ejemplo) throws URISyntaxException {
        log.debug("REST request to save Ejemplo : {}", ejemplo);
        if (ejemplo.getId() != null) {
            throw new BadRequestAlertException("A new ejemplo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ejemplo result = ejemploRepository.save(ejemplo);
        return ResponseEntity
            .created(new URI("/api/ejemplos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ejemplos/:id} : Updates an existing ejemplo.
     *
     * @param id the id of the ejemplo to save.
     * @param ejemplo the ejemplo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ejemplo,
     * or with status {@code 400 (Bad Request)} if the ejemplo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ejemplo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ejemplos/{id}")
    public ResponseEntity<Ejemplo> updateEjemplo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Ejemplo ejemplo
    ) throws URISyntaxException {
        log.debug("REST request to update Ejemplo : {}, {}", id, ejemplo);
        if (ejemplo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ejemplo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ejemploRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ejemplo result = ejemploRepository.save(ejemplo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ejemplo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ejemplos/:id} : Partial updates given fields of an existing ejemplo, field will ignore if it is null
     *
     * @param id the id of the ejemplo to save.
     * @param ejemplo the ejemplo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ejemplo,
     * or with status {@code 400 (Bad Request)} if the ejemplo is not valid,
     * or with status {@code 404 (Not Found)} if the ejemplo is not found,
     * or with status {@code 500 (Internal Server Error)} if the ejemplo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ejemplos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ejemplo> partialUpdateEjemplo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Ejemplo ejemplo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ejemplo partially : {}, {}", id, ejemplo);
        if (ejemplo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ejemplo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ejemploRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ejemplo> result = ejemploRepository
            .findById(ejemplo.getId())
            .map(existingEjemplo -> {
                if (ejemplo.getCampo1() != null) {
                    existingEjemplo.setCampo1(ejemplo.getCampo1());
                }
                if (ejemplo.getCapo2() != null) {
                    existingEjemplo.setCapo2(ejemplo.getCapo2());
                }
                if (ejemplo.getCampo3() != null) {
                    existingEjemplo.setCampo3(ejemplo.getCampo3());
                }
                if (ejemplo.getCampo4() != null) {
                    existingEjemplo.setCampo4(ejemplo.getCampo4());
                }
                if (ejemplo.getCampo5() != null) {
                    existingEjemplo.setCampo5(ejemplo.getCampo5());
                }

                return existingEjemplo;
            })
            .map(ejemploRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ejemplo.getId().toString())
        );
    }

    /**
     * {@code GET  /ejemplos} : get all the ejemplos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ejemplos in body.
     */
    @GetMapping("/ejemplos")
    public List<Ejemplo> getAllEjemplos() {
        log.debug("REST request to get all Ejemplos");
        return ejemploRepository.findAll();
    }

    /**
     * {@code GET  /ejemplos/:id} : get the "id" ejemplo.
     *
     * @param id the id of the ejemplo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ejemplo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ejemplos/{id}")
    public ResponseEntity<Ejemplo> getEjemplo(@PathVariable Long id) {
        log.debug("REST request to get Ejemplo : {}", id);
        Optional<Ejemplo> ejemplo = ejemploRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ejemplo);
    }

    /**
     * {@code DELETE  /ejemplos/:id} : delete the "id" ejemplo.
     *
     * @param id the id of the ejemplo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ejemplos/{id}")
    public ResponseEntity<Void> deleteEjemplo(@PathVariable Long id) {
        log.debug("REST request to delete Ejemplo : {}", id);
        ejemploRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
