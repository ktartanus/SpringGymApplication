package gym.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BasicController {

    @RequestMapping("/")
    public String empty() {
        return "redirect:index";
    }

    @RequestMapping("/index")
    public String ind() {
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/user/index")
    public String indUser() {
        return "user/index";
    }

    @RequestMapping("/403")
    public String accessDenied() {
        return "403";
    }

    @RequestMapping("/user/statistics")
    public String statistics() {
        return "user/statistics";
    }

    @RequestMapping("/user/calculators")
    public String calculators() {
        return "user/calculators";
    }
}
