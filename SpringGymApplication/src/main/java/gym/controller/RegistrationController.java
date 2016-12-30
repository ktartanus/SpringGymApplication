package gym.controller;

        import javax.validation.Valid;

        import gym.validations.EmailExistsException;
        import gym.validations.UserExistsException;
        import gym.dto.RegistrationDTO;
        import gym.model.User;
        import gym.services.IUserService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Controller;
        import org.springframework.ui.Model;
        import org.springframework.validation.BindingResult;
        import org.springframework.validation.Errors;
        import org.springframework.web.bind.annotation.ModelAttribute;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RequestMethod;
        import org.springframework.web.context.request.WebRequest;
        import org.springframework.web.servlet.ModelAndView;


@Controller
public class RegistrationController {

    @Autowired
    private IUserService service;

    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String newRegistration(WebRequest request, Model model) {
        RegistrationDTO registrationDTO = new RegistrationDTO();
        model.addAttribute("registrationDTO", registrationDTO);
        return "registrationForm";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ModelAndView registerUserAccount(
            @ModelAttribute("registrationDTO") @Valid RegistrationDTO registrationDTO,
            BindingResult result,
            WebRequest request,
            Errors errors) {

        User registered = new User();
        if (!result.hasErrors()) {
            registered = createUserAccount(registrationDTO, result);
        }
        if (registered == null) {
            result.rejectValue("email", "message.regError");
        }
        if (result.hasErrors()) {
            return new ModelAndView("registrationForm", "user", registrationDTO);
        }
        else {
            return new ModelAndView("login", "registrationDTO", registrationDTO);

        }
    }
    private User createUserAccount(RegistrationDTO registrationDTO, BindingResult result) {
        User registered = null;
        try {
            registered = service.registerNewUserAccount(registrationDTO);
        } catch (EmailExistsException e) {
            return null;
        }
        catch (UserExistsException e) {
            return null;
        }
        return registered;
    }
}