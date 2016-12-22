package gym.Validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import gym.dto.RegistrationDTO;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(final PasswordMatches constraintAnnotation) {
        //
    }

    @Override
    public boolean isValid(final Object obj, final ConstraintValidatorContext context) {
        final RegistrationDTO user = (RegistrationDTO) obj;
        return user.getPassword().equals(user.getPasswordRepeat());
    }

}