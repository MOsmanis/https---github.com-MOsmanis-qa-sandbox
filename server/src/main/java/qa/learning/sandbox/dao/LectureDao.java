package qa.learning.sandbox.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import qa.learning.sandbox.jpa.Lecture;

@Repository
public interface LectureDao extends JpaRepository<Lecture, String> {
}
