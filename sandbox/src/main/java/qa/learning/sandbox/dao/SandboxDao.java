package qa.learning.sandbox.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.TypeMismatchException;
import org.hibernate.query.IllegalQueryOperationException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SandboxDao  {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Object> executeRawSQL(String sql) throws IllegalQueryOperationException, TypeMismatchException,
        HibernateException
    {
        Query query = entityManager.createNativeQuery(sql);
        return (List<Object>) query.getResultList();
    }
}
