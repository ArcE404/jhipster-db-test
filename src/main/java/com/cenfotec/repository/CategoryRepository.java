package com.cenfotec.repository;

import com.cenfotec.domain.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Category entity.
 *
 * When extending this class, extend CategoryRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface CategoryRepository extends CategoryRepositoryWithBagRelationships, JpaRepository<Category, Long> {
    default Optional<Category> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Category> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Category> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct category from Category category left join fetch category.parent",
        countQuery = "select count(distinct category) from Category category"
    )
    Page<Category> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct category from Category category left join fetch category.parent")
    List<Category> findAllWithToOneRelationships();

    @Query("select category from Category category left join fetch category.parent where category.id =:id")
    Optional<Category> findOneWithToOneRelationships(@Param("id") Long id);
}
