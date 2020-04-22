package com.tbd.kore.controller;

import net.redhogs.cronparser.CronExpressionDescriptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import com.tbd.kore.repository.ScheduleRepository;

import java.text.ParseException;


@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @PostMapping(value = "/description/", consumes = MediaType.TEXT_PLAIN_VALUE , produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getDescription(@RequestBody String cronExpression){
        try {
            String description = CronExpressionDescriptor.getDescription(cronExpression);
            return new ResponseEntity<>(description, HttpStatus.OK);
        } catch (ParseException e) {
            return new ResponseEntity<>("Cannot cast the cron expression", HttpStatus.BAD_REQUEST);
        }
    }



}
