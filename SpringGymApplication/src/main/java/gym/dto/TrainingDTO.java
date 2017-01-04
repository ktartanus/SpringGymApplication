package gym.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import gym.model.enums.Excercise;
import gym.model.enums.TrainingStatus;
import gym.validations.VDuplicateExcercise;
import gym.validations.VEnum;
import gym.validations.VStatus;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

@VStatus
@VDuplicateExcercise
public class TrainingDTO {

    private Long id;

    @NotNull
    @NotEmpty
    @VEnum( enumClazz=Excercise.class)
    private String excercise;

    @NotNull
    @NotEmpty
    @VEnum( enumClazz=TrainingStatus.class)
    private String status;

    @NotNull
    @Min(value = 1)
    private Integer series;

    @NotNull
    @Min(value=1)
    private Integer repeats;

    //@JsonProperty("data_treningu")
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExcercise() {
        return excercise;
    }

    public void setExcercise(String excercise) {
        this.excercise = excercise;
    }

    public String getStatus() { return status;   }

    public void setStatus(String status) {    this.status = status; }

    public Integer getSeries() {
        return series;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public Integer getRepeats() {
        return repeats;
    }

    public void setRepeats(Integer repeats) {
        this.repeats = repeats;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
