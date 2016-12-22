package gym.services;

import gym.Validations.EmailExistsException;
import gym.Validations.UserExistsException;
import gym.dto.RegistrationDTO;
import gym.model.User;
import gym.model.UserRepository;
import gym.model.UserRole;
import gym.model.UserRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRolesRepository userRolesRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        System.out.println("dodano nowego usera");

        UserRole user_role = new UserRole();
        user_role.setRole("ROLE_USER");
        user_role.setUserid(newUser.getUserid());
        userRolesRepository.save(user_role);
        System.out.println("dodano role do usera");
        return newUser;
    }
    private boolean emailExist(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }
    private boolean userNameExist(String name){
        User user = userRepository.findByUserName(name);
        if (user != null) {
            return true;
        }
        return false;
    }

}