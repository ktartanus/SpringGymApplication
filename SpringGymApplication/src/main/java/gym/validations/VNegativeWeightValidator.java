package gym.validations;


import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class VNegativeWeightValidator implements ConstraintValidator<VNegativeWeight, String> {

    @Override
    public void initialize(final VNegativeWeight constraintAnnotation) {
    }

    @Override
    public boolean isValid(final String weight, final ConstraintValidatorContext context) {
        if(weight == null || Objects.equals(weight, "")){
            return false;
        }
        String[]weightArray = weight.split("x");
        for (int i = 0; i <weightArray.length ; i++) {
            int singleSeriesWeight = Integer.parseInt(weightArray[i]);
            if(singleSeriesWeight <= 0){
                return false;
            }
        }
        return true;
    }

}