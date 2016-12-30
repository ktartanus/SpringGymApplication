package gym.services;

import gym.controller.RestErrorHandler;
import gym.model.enums.Role;
import gym.validations.EmailExistsException;
import gym.validations.UserExistsException;
import gym.dto.RegistrationDTO;
import gym.model.User;
import gym.model.UserRepository;
import gym.model.UserRole;
import gym.model.UserRolesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService implements IUserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(RestErrorHandler.class);


    private UserRepository userRepository;

    private UserRolesRepository userRolesRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, UserRolesRepository userRolesRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public User registerNewUserAccount(RegistrationDTO registrationDTO)
            throws EmailExistsException, UserExistsException {

        if (emailExist(registrationDTO.getEmail())) {
            throw new EmailExistsException(
                    "There is an account with that email address:"  + registrationDTO.getEmail());
        }
        if (userNameExist(registrationDTO.getAccountName())) {
            throw new UserExistsException(
                    "There is an account with that username:"  + registrationDTO.getAccountName());
        }
        User user = new User();
        user.setUserName(registrationDTO.getAccountName());
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setEmail(registrationDTO.getEmail());
        user.setEnabled(1);
        User newUser = userRepository.save(user);

        UserRole user_role = new UserRole();
        user_role.setRole(Role.ROLE_USER);
        user_role.setUser(newUser);
        userRolesRepository.save(user_role);
        return newUser;
    }
    private boolean emailExist(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;
    }
    private boolean userNameExist(String name){
        User user = userRepository.findByUserName(name);
        return user != null;
    }

    public User getLoggedUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        LOGGER.debug("Username : " + username);
        return userRepository.findByUserName(username);
    }

}