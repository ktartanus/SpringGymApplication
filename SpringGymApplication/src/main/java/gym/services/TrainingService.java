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

    public ValidListDTO <TrainingDTO> getTrainings(){
        User loggedUser = userService.getLoggedUser();
        ValidListDTO<TrainingDTO> trainingListDTO = new ValidListDTO<TrainingDTO>();
        List<Training> trainingList= trainingRepository.findByUser(loggedUser);
        for(Training training : trainingList){
             TrainingDTO trainingDTO = createTrainingDTO(training);
             trainingListDTO.add(trainingDTO);
        }

        return trainingListDTO;
    }

    private TrainingDTO createTrainingDTO(Training training){
        Date converted_Date = DateUtil.removeTime(training.getTraining_date());

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
        newTraining.setTraining_date(trainingDTO.getDate());
        newTraining.setStatus(TrainingStatus.valueOf(trainingDTO.getStatus()));

        return newTraining;
    }

}
