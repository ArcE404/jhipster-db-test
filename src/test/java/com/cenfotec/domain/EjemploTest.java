package com.cenfotec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.cenfotec.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EjemploTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ejemplo.class);
        Ejemplo ejemplo1 = new Ejemplo();
        ejemplo1.setId(1L);
        Ejemplo ejemplo2 = new Ejemplo();
        ejemplo2.setId(ejemplo1.getId());
        assertThat(ejemplo1).isEqualTo(ejemplo2);
        ejemplo2.setId(2L);
        assertThat(ejemplo1).isNotEqualTo(ejemplo2);
        ejemplo1.setId(null);
        assertThat(ejemplo1).isNotEqualTo(ejemplo2);
    }
}
