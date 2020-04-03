package com.tbd.kore.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @PostMapping(value = "/description/", consumes = MediaType.TEXT_PLAIN_VALUE , produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getDescription(@RequestBody String cronExpression){
        return new ResponseEntity<>("Description for: " + cronExpression, HttpStatus.OK);
    }

}
