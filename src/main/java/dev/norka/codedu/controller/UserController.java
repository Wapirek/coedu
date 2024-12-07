package dev.norka.codedu.controller;

import dev.norka.codedu.entity.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return user;
    }
}
