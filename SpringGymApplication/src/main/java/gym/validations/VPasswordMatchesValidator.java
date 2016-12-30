package gym.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import gym.dto.RegistrationDTO;

public class VPasswordMatchesValidator implements ConstraintValidator<VPasswordMatches, Object> {

    @Override
    public void initialize(final VPasswordMatches constraintAnnotation) {
        //
    }

    @Override
    public boolean isValid(final Object obj, final ConstraintValidatorContext context) {
        final RegistrationDTO user = (RegistrationDTO) obj;
        return user.getPassword().equals(user.getPasswordRepeat());
    }

}