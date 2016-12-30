package gym.validations;

/**
 * Created by Tarti on 2016-12-30.
 */
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import javax.validation.constraints.NotNull;

@Documented
@Constraint(validatedBy = VEnumValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@NotNull(message = "Value cannot be null")
@ReportAsSingleViolation
public @interface VEnum {

    Class<? extends Enum<?>> enumClazz();

    String message() default "Value is not correct";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}