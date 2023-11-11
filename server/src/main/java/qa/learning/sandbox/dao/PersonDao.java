package qa.learning.sandbox.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import qa.learning.sandbox.jpa.Person;

@Repository
public interface PersonDao extends JpaRepository<Person, String> {
}
