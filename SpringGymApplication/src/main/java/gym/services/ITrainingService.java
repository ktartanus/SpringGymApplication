package gym.services;

import gym.dto.TrainingDTO;
import gym.dto.ValidListDTO;
import gym.model.Training;


/**
 * Created by Tarti on 2016-12-29.
 */
public interface ITrainingService {

    public Training addTraining(TrainingDTO trainingDTO);
    public ValidListDTO<TrainingDTO> getTrainings();

}