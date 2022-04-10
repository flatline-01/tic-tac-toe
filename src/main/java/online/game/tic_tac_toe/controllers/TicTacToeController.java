package online.game.tic_tac_toe.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TicTacToeController {
    @GetMapping("/")
    public String index(){
        return "index";
    }
    @GetMapping("/game")
    public String game(){
        return "game";
    }
}
