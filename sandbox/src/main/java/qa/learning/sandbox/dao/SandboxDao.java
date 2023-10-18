package qa.learning.sandbox.dao;

import jakarta.persistence.*;
import org.hibernate.HibernateException;
import org.hibernate.TypeMismatchException;
import org.hibernate.query.IllegalQueryOperationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SandboxDao  {
    private final EntityManager entityManager;

    @Autowired
    public SandboxDao(EntityManager entityManager, JdbcTemplate jdbcTemplate)
    {
        this.entityManager = entityManager;
    }

    public List<Tuple> executeRawSQL(String sql) throws IllegalQueryOperationException, TypeMismatchException,
        HibernateException
    {
        Query query = entityManager.createNativeQuery(sql, Tuple.class);
        List<Tuple> resultList = query.getResultList();
        if(resultList==null) {
            return new ArrayList<>();
        }
        return resultList;
    }
}
