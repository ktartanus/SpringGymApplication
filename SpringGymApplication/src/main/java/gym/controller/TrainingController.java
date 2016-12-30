package gym.controller;


import gym.dto.TrainingDTO;

import gym.dto.ValidListDTO;
import gym.model.Training;

import gym.services.ITrainingService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;


/**
 * Created by Tarti on 2016-12-28.
 */
@Controller
public class TrainingController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RestErrorHandler.class);

    @Autowired
    private MessageSource messageSource;
    @Autowired
    private ITrainingService trainingService;

    @RequestMapping(value="/addTraining", method=RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public TrainingDTO addNewTraining(@Valid @RequestBody TrainingDTO trainingDTO) {
        Training registeredTraining = new Training();
        registeredTraining = trainingService.addTraining(trainingDTO);

        return trainingDTO;
    }

    @RequestMapping(value="/getTrainings", produces = "application/json; charset=utf-8")
    @ResponseBody
    public ValidListDTO<TrainingDTO> getTrainings() {
        ValidListDTO<TrainingDTO> trainings = trainingService.getTrainings();

        return trainings;
    }

}
