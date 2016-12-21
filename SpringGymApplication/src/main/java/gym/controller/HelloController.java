package gym.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {
    
    @RequestMapping("/fckMyLife")
    public String index() {
        return "Greetings from Spring Boot Noob!";
    }

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

    @RequestMapping("/indexRogal")
    public String indRogal() {
        return "indexRogal";
    }
}
