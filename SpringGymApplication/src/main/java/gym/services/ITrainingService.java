package gym.services;

import gym.dto.TrainingDTO;
import gym.dto.ValidListDTO;
import gym.model.Training;
import gym.model.enums.Excercise;
import gym.model.enums.TrainingStatus;

import java.util.List;

public interface ITrainingService {

    public Training addTraining(TrainingDTO trainingDTO);
    public List<TrainingDTO> getTrainings();
    public List<TrainingDTO> addTrainings(ValidListDTO<TrainingDTO> validListDTO);
    public void deleteTrainings(List<Long> ids);
    public List<TrainingDTO> updateTrainings(ValidListDTO<TrainingDTO> validListDTO);
    public List<TrainingStatus> getTrainngStatuses();
    public List<Excercise> getTrainngExcercises();

}