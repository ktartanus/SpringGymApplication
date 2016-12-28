package gym.services;

import gym.validations.EmailExistsException;
import gym.validations.UserExistsException;
import gym.dto.RegistrationDTO;
import gym.model.User;

public interface IUserService {
    User registerNewUserAccount(RegistrationDTO registrationDTO)
            throws EmailExistsException, UserExistsException;
}