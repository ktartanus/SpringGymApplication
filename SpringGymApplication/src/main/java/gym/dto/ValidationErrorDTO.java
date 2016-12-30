package gym.dto;

/**
 * Created by Tarti on 2016-12-28.
 */
import java.util.ArrayList;
import java.util.List;

public class ValidationErrorDTO {

    private List<FieldErrorDTO> fieldErrors = new ArrayList<>();
    private List<GlobalErrorDTO> globalErrors = new ArrayList<>();

    public ValidationErrorDTO() {

    }

    public void addFieldError(String path, String message) {
        FieldErrorDTO error = new FieldErrorDTO(path, message);
        fieldErrors.add(error);
    }

    public void addGlobalError(String annotation, String message) {
        GlobalErrorDTO error = new GlobalErrorDTO(annotation, message);
        globalErrors.add(error);
    }

    public List<FieldErrorDTO> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(List<FieldErrorDTO> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }

    public List<GlobalErrorDTO> getGlobalErrors() {
        return globalErrors;
    }

    public void setGlobalErrors(List<GlobalErrorDTO> globalErrors) {
        this.globalErrors = globalErrors;
    }
}