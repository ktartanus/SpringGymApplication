package gym.model;

import gym.model.enums.Excercise;
import gym.model.enums.TrainingStatus;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by Tarti on 2016-12-29.
 */


@Entity
@Table(name = "TRAINING")
public class Training implements Serializable{

    private static final long serialVersionUID = 12131L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="TRAINING_ID")
    private Long trainingId;

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    private TrainingStatus status;

    @Column(name = "EXCERCISE")
    @Enumerated(EnumType.STRING)
    private Excercise excercise;

    @Column(name = "SERIES_NUMBER")
    private Integer series_number;

    @Column(name = "REPEATS")
    private Integer repeats;

    @Column(name ="TRAINING_DATE")
    private Date training_date;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_TO_TRAINING_ID")
    private User user;

    public TrainingStatus getStatus() { return status; }

    public void setStatus(TrainingStatus status) { this.status = status; }

    public Long getTrainingId() {
        return trainingId;
    }

    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
    }

    public Excercise getExcercise() {
        return excercise;
    }

    public void setExcercise(Excercise excercise) {
        this.excercise = excercise;
    }

    public Integer getSeries_number() {
        return series_number;
    }

    public void setSeries_number(Integer series_number) {
        this.series_number = series_number;
    }

    public Integer getRepeats() {
        return repeats;
    }

    public void setRepeats(Integer repeats) {
        this.repeats = repeats;
    }

    public Date getTraining_date() {
        return training_date;
    }

    public void setTraining_date(Date training_date) {
        this.training_date = training_date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
