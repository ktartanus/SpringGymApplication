package gym.validations;

import gym.dto.TrainingDTO;
import gym.model.enums.TrainingStatus;
import gym.utlis.DateUtil;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Date;

public class VStatusValidator implements ConstraintValidator<VStatus, Object> {


    @Override
    public void initialize(VStatus constraintAnnotation) {

    }

    @Override
    public boolean isValid(final Object obj, final ConstraintValidatorContext context) {

        final TrainingDTO training = (TrainingDTO) obj;
        if(!TrainingStatus.contains(training.getStatus())){
            return false;
        }
        TrainingStatus trainingStatus = TrainingStatus.valueOf(training.getStatus());


        Date trainingDate = DateUtil.removeTime(training.getDate());
        Date actualDate = DateUtil.removeTime(new Date());
        System.out.println(actualDate);
        System.out.println(trainingDate);

        if(trainingDate.before(actualDate) && trainingStatus == TrainingStatus.IN_PROGRESS) {
            return false;
        }

        return true;
    }


}