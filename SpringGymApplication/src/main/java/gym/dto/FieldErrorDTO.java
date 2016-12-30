package gym.dto;

/**
 * Created by Tarti on 2016-12-28.
 */
public class FieldErrorDTO {

    private String field;

    private String message;


    public FieldErrorDTO(String field, String message) {
        this.field = field;
        this.message = message;
    }


    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}