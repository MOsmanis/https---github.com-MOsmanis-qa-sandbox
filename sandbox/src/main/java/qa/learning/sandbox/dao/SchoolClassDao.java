package qa.learning.sandbox.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import qa.learning.sandbox.jpa.SchoolClass;

@Repository
public interface SchoolClassDao extends JpaRepository<SchoolClass, String> {
}
