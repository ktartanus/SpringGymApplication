package gym.validations;

import gym.dto.TrainingDTO;
import gym.model.Training;
import gym.model.TrainingRepository;
import gym.model.enums.Excercise;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import java.util.List;

public class VDuplicateExcerciseValidator implements ConstraintValidator<VDuplicateExcercise, Object> {

    @Autowired
    TrainingRepository trainingRepository;

    @Override
    public void initialize(VDuplicateExcercise constraintAnnotation) {
    }

    @Override
    public boolean isValid(final Object obj, final ConstraintValidatorContext context) {

        final TrainingDTO training = (TrainingDTO) obj;

        Excercise excercise = Excercise.valueOf(training.getExcercise());
        List<Training> trainingList = trainingRepository.findByExcerciseAndTrainingDate(excercise, training.getDate());

        if(trainingList.size()>0){
            return false;
        }
        return true;

    }
}
