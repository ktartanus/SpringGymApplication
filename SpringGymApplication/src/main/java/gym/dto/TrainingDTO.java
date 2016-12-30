package gym.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import gym.model.enums.Excercise;
import gym.model.enums.TrainingStatus;
import gym.validations.VEnum;
import gym.validations.VStatus;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Tarti on 2016-12-28.
 */
@VStatus
public class TrainingDTO {

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

    @JsonProperty("data_treningu")
    private Date date;

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
