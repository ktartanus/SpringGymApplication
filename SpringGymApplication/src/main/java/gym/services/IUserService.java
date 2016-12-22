package gym.services;

import gym.Validations.EmailExistsException;
import gym.Validations.UserExistsException;
import gym.dto.RegistrationDTO;
import gym.model.User;

public interface IUserService {
    User registerNewUserAccount(RegistrationDTO registrationDTO)
            throws EmailExistsException, UserExistsException;
}