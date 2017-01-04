package gym.services;

import gym.dto.TrainingDTO;
import gym.dto.ValidListDTO;
import gym.model.Training;

import java.util.List;

public interface ITrainingService {

    public Training addTraining(TrainingDTO trainingDTO);
    public List<TrainingDTO> getTrainings();
    public List<TrainingDTO> addTrainings(ValidListDTO<TrainingDTO> validListDTO);
    public void deleteTrainings(List<Long> ids);
    public void updateTrainings(ValidListDTO<TrainingDTO> validListDTO);

}