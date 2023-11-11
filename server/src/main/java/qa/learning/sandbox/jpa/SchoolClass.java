package qa.learning.sandbox.jpa;

import jakarta.persistence.*;

@Entity
@Table(name = "school_class")
public class SchoolClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long grade;
    private String letter;
    private Long teacherId;

    public Long getId()
    {
        return id;
    }

    public Long getGrade()
    {
        return grade;
    }

    public void setGrade(Long grade)
    {
        this.grade = grade;
    }

    public String getLetter()
    {
        return letter;
    }

    public void setLetter(String letter)
    {
        this.letter = letter;
    }

    public Long getTeacherId()
    {
        return teacherId;
    }

    public void setTeacherId(Long teacherId)
    {
        this.teacherId = teacherId;
    }
}
