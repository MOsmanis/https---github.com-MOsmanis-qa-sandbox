package qa.learning.sandbox.jpa;

import jakarta.persistence.*;


@Entity
@Table(name = "lecture")
public class Lecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long name;
    private Long classId;
    private Long teacherId;
    private String scheduleDay;
    private String scheduleTime;

    public Long getId()
    {
        return id;
    }

    public Long getName()
    {
        return name;
    }

    public void setName(Long name)
    {
        this.name = name;
    }

    public Long getClassId()
    {
        return classId;
    }

    public void setClassId(Long classId)
    {
        this.classId = classId;
    }

    public Long getTeacherId()
    {
        return teacherId;
    }

    public void setTeacherId(Long teacherId)
    {
        this.teacherId = teacherId;
    }

    public String getScheduleDay()
    {
        return scheduleDay;
    }

    public void setScheduleDay(String scheduleDay)
    {
        this.scheduleDay = scheduleDay;
    }

    public String getScheduleTime()
    {
        return scheduleTime;
    }

    public void setScheduleTime(String scheduleTime)
    {
        this.scheduleTime = scheduleTime;
    }
}
