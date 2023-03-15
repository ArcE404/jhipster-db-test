package com.cenfotec.domain;

import com.cenfotec.domain.enumeration.Genero;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ejemplo.
 */
@Entity
@Table(name = "mi_ejemplo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ejemplo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 8, max = 100)
    @Column(name = "campo_1", length = 100, nullable = false, unique = true)
    private String campo1;

    @Min(value = 0)
    @Column(name = "capo_2")
    private Integer capo2;

    @NotNull
    @Column(name = "campo_3", nullable = false)
    private Boolean campo3;

    @Column(name = "campo_4")
    private LocalDate campo4;

    @Enumerated(EnumType.STRING)
    @Column(name = "campo_5")
    private Genero campo5;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ejemplo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCampo1() {
        return this.campo1;
    }

    public Ejemplo campo1(String campo1) {
        this.setCampo1(campo1);
        return this;
    }

    public void setCampo1(String campo1) {
        this.campo1 = campo1;
    }

    public Integer getCapo2() {
        return this.capo2;
    }

    public Ejemplo capo2(Integer capo2) {
        this.setCapo2(capo2);
        return this;
    }

    public void setCapo2(Integer capo2) {
        this.capo2 = capo2;
    }

    public Boolean getCampo3() {
        return this.campo3;
    }

    public Ejemplo campo3(Boolean campo3) {
        this.setCampo3(campo3);
        return this;
    }

    public void setCampo3(Boolean campo3) {
        this.campo3 = campo3;
    }

    public LocalDate getCampo4() {
        return this.campo4;
    }

    public Ejemplo campo4(LocalDate campo4) {
        this.setCampo4(campo4);
        return this;
    }

    public void setCampo4(LocalDate campo4) {
        this.campo4 = campo4;
    }

    public Genero getCampo5() {
        return this.campo5;
    }

    public Ejemplo campo5(Genero campo5) {
        this.setCampo5(campo5);
        return this;
    }

    public void setCampo5(Genero campo5) {
        this.campo5 = campo5;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ejemplo)) {
            return false;
        }
        return id != null && id.equals(((Ejemplo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ejemplo{" +
            "id=" + getId() +
            ", campo1='" + getCampo1() + "'" +
            ", capo2=" + getCapo2() +
            ", campo3='" + getCampo3() + "'" +
            ", campo4='" + getCampo4() + "'" +
            ", campo5='" + getCampo5() + "'" +
            "}";
    }
}
