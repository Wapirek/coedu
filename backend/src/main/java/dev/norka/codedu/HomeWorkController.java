package dev.norka.codedu;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeWorkController {


    private List<String> homeWorkList;
    public HomeWorkController() {
        homeWorkList.add("xd");
        homeWorkList.add("xd1");
        homeWorkList.add("xd2");
    }

    @GetMapping("/xd")
    public String GetAllHomeworks(){
        return homeWorkList.get(0);

    }

}
