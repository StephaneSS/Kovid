package com.tbd.kore.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @GetMapping("/")
    public String getStarted(){
        return "Hello, World";
    }

    @GetMapping(value = "/description/{cronExpression}", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<String> getDescription(@PathVariable String cronExpression){
        return new ResponseEntity<>("Description for" + cronExpression, HttpStatus.OK);
    }

}
