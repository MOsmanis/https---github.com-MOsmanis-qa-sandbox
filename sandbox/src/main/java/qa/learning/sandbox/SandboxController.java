package qa.learning.sandbox;

import net.sf.jsqlparser.util.validation.Validation;
import net.sf.jsqlparser.util.validation.ValidationError;
import net.sf.jsqlparser.util.validation.feature.DatabaseType;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import qa.learning.sandbox.dao.SchoolClassDao;
import qa.learning.sandbox.dao.LectureDao;
import qa.learning.sandbox.dao.PersonDao;
import qa.learning.sandbox.jpa.Lecture;
import qa.learning.sandbox.jpa.Person;
import qa.learning.sandbox.jpa.SchoolClass;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@CrossOrigin(origins="http://localhost:5173")
@RestController
public class SandboxController {
    private final SchoolClassDao schoolClassDao;
    private final LectureDao lectureDao;
    private final PersonDao personDao;
    private final SandboxService sandboxService;

    @Autowired
    public SandboxController(SchoolClassDao schoolClassDao, LectureDao lectureDao, PersonDao personDao, SandboxService sandboxService)
    {
        this.schoolClassDao = schoolClassDao;
        this.lectureDao = lectureDao;
        this.personDao = personDao;
        this.sandboxService = sandboxService;
    }

    @CrossOrigin(origins="http://localhost:5173")
    @GetMapping("/persons")
    @ResponseStatus(HttpStatus.OK)
    public List<Person> getPersons() throws Exception
    {
        return personDao.findAll();
    }

    @GetMapping("/classes")
    @ResponseStatus(HttpStatus.OK)
    public List<SchoolClass> getSchoolClasses() throws Exception
    {
        return schoolClassDao.findAll();
    }

    @GetMapping("/lectures")
    @ResponseStatus(HttpStatus.OK)
    public List<Lecture> getLectures() throws Exception
    {
        return lectureDao.findAll();
    }

    @RequestMapping(value = "/sql", method = POST, consumes = APPLICATION_JSON_VALUE, produces =
        APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<List<String>> getResults(@RequestBody SqlDto request) throws Exception
    {
        String sql = request.getSqlQuery();
        List<ValidationError> validationErrors = new Validation(
            Arrays.asList(DatabaseType.MYSQL),
            sql).validate();
        if(!validationErrors.isEmpty()) {
            return validationErrors.stream()
                .flatMap(e->e.getErrors().stream())
                .map(Throwable::getMessage)
                .map(List::of)
                .toList();
        }
        try {
            return sandboxService.getRawSqlResults(sql);
        } catch(SQLGrammarException e) {
            return List.of(List.of(e.getMessage()));
        }
    }

    private static class SqlDto {
        private String sqlQuery;

        public String getSqlQuery()
        {
            return sqlQuery;
        }

        public void setSqlQuery(String sqlQuery)
        {
            this.sqlQuery = sqlQuery;
        }
    }
}
