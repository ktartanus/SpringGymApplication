package gym.controller;

        import javax.validation.Valid;

        import gym.dto.RegistrationDTO;
        import org.springframework.stereotype.Controller;
        import org.springframework.validation.BindingResult;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public class RegistrationController {

    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String newRegistration(RegistrationDTO registrationDTO) {
        return "registrationForm";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String handleRegistration(@Valid RegistrationDTO registrationDTO, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return "registrationForm";
        }
        return "login";
    }
}