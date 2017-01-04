package gym.services;

import gym.dto.TrainingDTO;
import gym.dto.ValidListDTO;
import gym.model.Training;
import gym.model.TrainingRepository;
import gym.model.User;
import gym.model.enums.Excercise;
import gym.model.enums.TrainingStatus;
import gym.utlis.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TrainingService implements ITrainingService {

    private IUserService userService;

    private TrainingRepository trainingRepository;

    @Autowired
    public TrainingService(IUserService userService, TrainingRepository trainingRepository){
        this.userService = userService;
        this.trainingRepository = trainingRepository;
    }

    public Training addTraining(TrainingDTO trainingDTO){
        User loggedUser = userService.getLoggedUser();

        Training newTraining = createTraining(trainingDTO, loggedUser);
        trainingRepository.save(newTraining);

        return newTraining;
    }

    public List<TrainingDTO> getTrainings(){
        User loggedUser = userService.getLoggedUser();
        List<TrainingDTO> trainingListDTO = new ArrayList<>();
        List<Training> trainingList= trainingRepository.findByUser(loggedUser);
        for(Training training : trainingList){
             TrainingDTO trainingDTO = createTrainingDTO(training);
             trainingListDTO.add(trainingDTO);
        }

        return trainingListDTO;
    }

    public List<TrainingDTO> addTrainings(ValidListDTO<TrainingDTO> validListDTO){
        User loggedUser = userService.getLoggedUser();
        List<TrainingDTO> trainingDTOList = new ArrayList<>();

        for(TrainingDTO trainingDTO : validListDTO){
            Training newTraining = createTraining(trainingDTO, loggedUser);
            newTraining = trainingRepository.save(newTraining);
            System.out.println("Data treningu : " + newTraining.getTrainingDate());
            TrainingDTO newTrainingDTO = createTrainingDTO(newTraining);
            trainingDTOList.add(newTrainingDTO);
        }
        return trainingDTOList;
    }

    public void deleteTrainings(List<Long> ids) {
        User loggedUser = userService.getLoggedUser();
        for(Long id : ids){
            Training training = trainingRepository.findOne(id);
            if(training!= null && training.getUser() == loggedUser) {
                trainingRepository.deleteByTrainingId(id);
            }
        }
    }

    public void updateTrainings(ValidListDTO<TrainingDTO> validListDTO) {
        User loggedUser = userService.getLoggedUser();

        for(TrainingDTO trainingDTO : validListDTO){
            Training updatedTraining = updateTraining(trainingDTO, loggedUser);
            trainingRepository.save(updatedTraining);
        }
    }

    private TrainingDTO createTrainingDTO(Training training){
        Date converted_Date = DateUtil.removeTime(training.getTrainingDate());

        TrainingDTO newTrainingDTO = new TrainingDTO();
        newTrainingDTO.setExcercise(training.getExcercise().name());
        newTrainingDTO.setRepeats(training.getRepeats());
        newTrainingDTO.setStatus(training.getStatus().name());
        newTrainingDTO.setDate(converted_Date);
        newTrainingDTO.setSeries(training.getSeries_number());

        return newTrainingDTO;
    }

    private Training createTraining(TrainingDTO trainingDTO, User loggedUser){

        Training newTraining = new Training();
        newTraining.setUser(loggedUser);
        newTraining.setExcercise(Excercise.valueOf(trainingDTO.getExcercise()));
        newTraining.setRepeats(trainingDTO.getRepeats());
        newTraining.setSeries_number(trainingDTO.getSeries());
        newTraining.setTrainingDate(trainingDTO.getDate());
        newTraining.setStatus(TrainingStatus.valueOf(trainingDTO.getStatus()));

        return newTraining;
    }

    private Training updateTraining(TrainingDTO trainingDTO, User loggedUser){

        Training newTraining = new Training();
        newTraining.setTrainingId(trainingDTO.getId());
        newTraining.setUser(loggedUser);
        newTraining.setExcercise(Excercise.valueOf(trainingDTO.getExcercise()));
        newTraining.setRepeats(trainingDTO.getRepeats());
        newTraining.setSeries_number(trainingDTO.getSeries());
        newTraining.setTrainingDate(trainingDTO.getDate());
        newTraining.setStatus(TrainingStatus.valueOf(trainingDTO.getStatus()));

        return newTraining;
    }


}
