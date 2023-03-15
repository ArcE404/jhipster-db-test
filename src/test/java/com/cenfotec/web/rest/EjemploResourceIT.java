package com.cenfotec.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cenfotec.IntegrationTest;
import com.cenfotec.domain.Ejemplo;
import com.cenfotec.domain.enumeration.Genero;
import com.cenfotec.repository.EjemploRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link EjemploResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EjemploResourceIT {

    private static final String DEFAULT_CAMPO_1 = "AAAAAAAAAA";
    private static final String UPDATED_CAMPO_1 = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPO_2 = 0;
    private static final Integer UPDATED_CAPO_2 = 1;

    private static final Boolean DEFAULT_CAMPO_3 = false;
    private static final Boolean UPDATED_CAMPO_3 = true;

    private static final LocalDate DEFAULT_CAMPO_4 = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CAMPO_4 = LocalDate.now(ZoneId.systemDefault());

    private static final Genero DEFAULT_CAMPO_5 = Genero.MASCULINO;
    private static final Genero UPDATED_CAMPO_5 = Genero.FEMENINO;

    private static final String ENTITY_API_URL = "/api/ejemplos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EjemploRepository ejemploRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEjemploMockMvc;

    private Ejemplo ejemplo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ejemplo createEntity(EntityManager em) {
        Ejemplo ejemplo = new Ejemplo()
            .campo1(DEFAULT_CAMPO_1)
            .capo2(DEFAULT_CAPO_2)
            .campo3(DEFAULT_CAMPO_3)
            .campo4(DEFAULT_CAMPO_4)
            .campo5(DEFAULT_CAMPO_5);
        return ejemplo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ejemplo createUpdatedEntity(EntityManager em) {
        Ejemplo ejemplo = new Ejemplo()
            .campo1(UPDATED_CAMPO_1)
            .capo2(UPDATED_CAPO_2)
            .campo3(UPDATED_CAMPO_3)
            .campo4(UPDATED_CAMPO_4)
            .campo5(UPDATED_CAMPO_5);
        return ejemplo;
    }

    @BeforeEach
    public void initTest() {
        ejemplo = createEntity(em);
    }

    @Test
    @Transactional
    void createEjemplo() throws Exception {
        int databaseSizeBeforeCreate = ejemploRepository.findAll().size();
        // Create the Ejemplo
        restEjemploMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isCreated());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeCreate + 1);
        Ejemplo testEjemplo = ejemploList.get(ejemploList.size() - 1);
        assertThat(testEjemplo.getCampo1()).isEqualTo(DEFAULT_CAMPO_1);
        assertThat(testEjemplo.getCapo2()).isEqualTo(DEFAULT_CAPO_2);
        assertThat(testEjemplo.getCampo3()).isEqualTo(DEFAULT_CAMPO_3);
        assertThat(testEjemplo.getCampo4()).isEqualTo(DEFAULT_CAMPO_4);
        assertThat(testEjemplo.getCampo5()).isEqualTo(DEFAULT_CAMPO_5);
    }

    @Test
    @Transactional
    void createEjemploWithExistingId() throws Exception {
        // Create the Ejemplo with an existing ID
        ejemplo.setId(1L);

        int databaseSizeBeforeCreate = ejemploRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEjemploMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCampo1IsRequired() throws Exception {
        int databaseSizeBeforeTest = ejemploRepository.findAll().size();
        // set the field null
        ejemplo.setCampo1(null);

        // Create the Ejemplo, which fails.

        restEjemploMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isBadRequest());

        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCampo3IsRequired() throws Exception {
        int databaseSizeBeforeTest = ejemploRepository.findAll().size();
        // set the field null
        ejemplo.setCampo3(null);

        // Create the Ejemplo, which fails.

        restEjemploMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isBadRequest());

        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEjemplos() throws Exception {
        // Initialize the database
        ejemploRepository.saveAndFlush(ejemplo);

        // Get all the ejemploList
        restEjemploMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ejemplo.getId().intValue())))
            .andExpect(jsonPath("$.[*].campo1").value(hasItem(DEFAULT_CAMPO_1)))
            .andExpect(jsonPath("$.[*].capo2").value(hasItem(DEFAULT_CAPO_2)))
            .andExpect(jsonPath("$.[*].campo3").value(hasItem(DEFAULT_CAMPO_3.booleanValue())))
            .andExpect(jsonPath("$.[*].campo4").value(hasItem(DEFAULT_CAMPO_4.toString())))
            .andExpect(jsonPath("$.[*].campo5").value(hasItem(DEFAULT_CAMPO_5.toString())));
    }

    @Test
    @Transactional
    void getEjemplo() throws Exception {
        // Initialize the database
        ejemploRepository.saveAndFlush(ejemplo);

        // Get the ejemplo
        restEjemploMockMvc
            .perform(get(ENTITY_API_URL_ID, ejemplo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ejemplo.getId().intValue()))
            .andExpect(jsonPath("$.campo1").value(DEFAULT_CAMPO_1))
            .andExpect(jsonPath("$.capo2").value(DEFAULT_CAPO_2))
            .andExpect(jsonPath("$.campo3").value(DEFAULT_CAMPO_3.booleanValue()))
            .andExpect(jsonPath("$.campo4").value(DEFAULT_CAMPO_4.toString()))
            .andExpect(jsonPath("$.campo5").value(DEFAULT_CAMPO_5.toString()));
    }

    @Test
    @Transactional
    void getNonExistingEjemplo() throws Exception {
        // Get the ejemplo
        restEjemploMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEjemplo() throws Exception {
        // Initialize the database
        ejemploRepository.saveAndFlush(ejemplo);

        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();

        // Update the ejemplo
        Ejemplo updatedEjemplo = ejemploRepository.findById(ejemplo.getId()).get();
        // Disconnect from session so that the updates on updatedEjemplo are not directly saved in db
        em.detach(updatedEjemplo);
        updatedEjemplo
            .campo1(UPDATED_CAMPO_1)
            .capo2(UPDATED_CAPO_2)
            .campo3(UPDATED_CAMPO_3)
            .campo4(UPDATED_CAMPO_4)
            .campo5(UPDATED_CAMPO_5);

        restEjemploMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEjemplo.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEjemplo))
            )
            .andExpect(status().isOk());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
        Ejemplo testEjemplo = ejemploList.get(ejemploList.size() - 1);
        assertThat(testEjemplo.getCampo1()).isEqualTo(UPDATED_CAMPO_1);
        assertThat(testEjemplo.getCapo2()).isEqualTo(UPDATED_CAPO_2);
        assertThat(testEjemplo.getCampo3()).isEqualTo(UPDATED_CAMPO_3);
        assertThat(testEjemplo.getCampo4()).isEqualTo(UPDATED_CAMPO_4);
        assertThat(testEjemplo.getCampo5()).isEqualTo(UPDATED_CAMPO_5);
    }

    @Test
    @Transactional
    void putNonExistingEjemplo() throws Exception {
        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();
        ejemplo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEjemploMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ejemplo.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEjemplo() throws Exception {
        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();
        ejemplo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEjemploMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEjemplo() throws Exception {
        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();
        ejemplo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEjemploMockMvc
            .perform(
                put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEjemploWithPatch() throws Exception {
        // Initialize the database
        ejemploRepository.saveAndFlush(ejemplo);

        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();

        // Update the ejemplo using partial update
        Ejemplo partialUpdatedEjemplo = new Ejemplo();
        partialUpdatedEjemplo.setId(ejemplo.getId());

        partialUpdatedEjemplo.campo5(UPDATED_CAMPO_5);

        restEjemploMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEjemplo.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEjemplo))
            )
            .andExpect(status().isOk());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
        Ejemplo testEjemplo = ejemploList.get(ejemploList.size() - 1);
        assertThat(testEjemplo.getCampo1()).isEqualTo(DEFAULT_CAMPO_1);
        assertThat(testEjemplo.getCapo2()).isEqualTo(DEFAULT_CAPO_2);
        assertThat(testEjemplo.getCampo3()).isEqualTo(DEFAULT_CAMPO_3);
        assertThat(testEjemplo.getCampo4()).isEqualTo(DEFAULT_CAMPO_4);
        assertThat(testEjemplo.getCampo5()).isEqualTo(UPDATED_CAMPO_5);
    }

    @Test
    @Transactional
    void fullUpdateEjemploWithPatch() throws Exception {
        // Initialize the database
        ejemploRepository.saveAndFlush(ejemplo);

        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();

        // Update the ejemplo using partial update
        Ejemplo partialUpdatedEjemplo = new Ejemplo();
        partialUpdatedEjemplo.setId(ejemplo.getId());

        partialUpdatedEjemplo
            .campo1(UPDATED_CAMPO_1)
            .capo2(UPDATED_CAPO_2)
            .campo3(UPDATED_CAMPO_3)
            .campo4(UPDATED_CAMPO_4)
            .campo5(UPDATED_CAMPO_5);

        restEjemploMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEjemplo.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEjemplo))
            )
            .andExpect(status().isOk());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
        Ejemplo testEjemplo = ejemploList.get(ejemploList.size() - 1);
        assertThat(testEjemplo.getCampo1()).isEqualTo(UPDATED_CAMPO_1);
        assertThat(testEjemplo.getCapo2()).isEqualTo(UPDATED_CAPO_2);
        assertThat(testEjemplo.getCampo3()).isEqualTo(UPDATED_CAMPO_3);
        assertThat(testEjemplo.getCampo4()).isEqualTo(UPDATED_CAMPO_4);
        assertThat(testEjemplo.getCampo5()).isEqualTo(UPDATED_CAMPO_5);
    }

    @Test
    @Transactional
    void patchNonExistingEjemplo() throws Exception {
        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();
        ejemplo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEjemploMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ejemplo.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEjemplo() throws Exception {
        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();
        ejemplo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEjemploMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEjemplo() throws Exception {
        int databaseSizeBeforeUpdate = ejemploRepository.findAll().size();
        ejemplo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEjemploMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ejemplo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ejemplo in the database
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEjemplo() throws Exception {
        // Initialize the database
        ejemploRepository.saveAndFlush(ejemplo);

        int databaseSizeBeforeDelete = ejemploRepository.findAll().size();

        // Delete the ejemplo
        restEjemploMockMvc
            .perform(delete(ENTITY_API_URL_ID, ejemplo.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ejemplo> ejemploList = ejemploRepository.findAll();
        assertThat(ejemploList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
