package gym.dto;

/**
 * Created by Tarti on 2016-12-30.
 */
public class GlobalErrorDTO {

    private String annotation;

    private String message;

    public GlobalErrorDTO(String annotation, String message) {
        this.annotation = annotation;
        this.message = message;
    }

    public String getAnnotation() {
        return annotation;
    }

    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
