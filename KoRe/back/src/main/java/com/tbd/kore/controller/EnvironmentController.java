package com.tbd.kore.controller;

import com.tbd.kore.model.report.Environment;
import com.tbd.kore.repository.EnvironmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/environment")
public class EnvironmentController {

    @Autowired
    private EnvironmentRepository environmentRepository;

    @GetMapping("/")
    public ResponseEntity<List<Environment>> getAllEnvironments() {
        return new ResponseEntity<>(environmentRepository.findAll(), HttpStatus.OK);
    }

}
