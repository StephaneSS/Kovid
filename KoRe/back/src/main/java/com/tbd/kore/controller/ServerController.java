package com.tbd.kore.controller;

import com.tbd.kore.model.ServerConnexion;
import com.tbd.kore.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/server")
public class ServerController {

    @Autowired
    private ServerRepository serverRepository;

    @GetMapping("/")
    public ResponseEntity<List<ServerConnexion>> getAllServers() {
        return new ResponseEntity<>(serverRepository.findAll(), HttpStatus.OK);
    }

}
