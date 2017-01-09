package gym.controller;


import gym.dto.TrainingDTO;
import gym.dto.ValidListDTO;
import gym.model.enums.Excercise;
import gym.model.enums.TrainingStatus;
import gym.services.ITrainingService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@Controller
public class RestTrainingController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RestErrorHandler.class);

    ////Przemyslec osobne obiekty dto na update i na add

    @Autowired
    private ITrainingService trainingService;

    @RequestMapping(value="/getTrainings", produces = "application/json; charset=utf-8")
    @ResponseBody
    public ValidListDTO<TrainingDTO> getTrainings() {

        return new ValidListDTO<>(trainingService.getTrainings());
    }

    @RequestMapping(value="/getStatusEnum", produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<TrainingStatus> getStatuses() {

        return trainingService.getTrainngStatuses();
    }

    @RequestMapping(value="/getExcerciseEnum", produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<Excercise> getExcercises() {

        return trainingService.getTrainngExcercises();
    }

    @RequestMapping(value="/addTraining", method=RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public TrainingDTO addNewTraining(@Valid @RequestBody TrainingDTO trainingDTO) {
        trainingService.addTraining(trainingDTO);

        return trainingDTO;
    }

    @RequestMapping(value="/addTrainings", method=RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public ValidListDTO<TrainingDTO> addNewTrainings(@Valid @RequestBody ValidListDTO<TrainingDTO> trainingList) {

        List<TrainingDTO> newTrainingDTOList = trainingService.addTrainings(trainingList);
        return new ValidListDTO<>(newTrainingDTOList);
    }

    @RequestMapping(value="/updateTrainings", method=RequestMethod.PATCH, produces = "application/json; charset=utf-8")
    @ResponseBody
    public ValidListDTO<TrainingDTO> updateTrainings(@Valid @RequestBody ValidListDTO<TrainingDTO> trainingList) {

        trainingService.updateTrainings(trainingList);

        return trainingList;
    }

    @RequestMapping(value="/deleteTrainings", method=RequestMethod.DELETE, produces = "application/json; charset=utf-8")
    @ResponseBody
    public void deleteTrainings(@RequestBody List<Long> ids) {

        trainingService.deleteTrainings(ids);

    }

}
