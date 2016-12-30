package gym.services;

import gym.dto.TrainingDTO;
import gym.dto.ValidListDTO;
import gym.model.Training;

public interface ITrainingService {

    public Training addTraining(TrainingDTO trainingDTO);
    public ValidListDTO<TrainingDTO> getTrainings();

}