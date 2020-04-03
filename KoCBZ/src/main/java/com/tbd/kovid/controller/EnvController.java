package com.tbd.kovid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import com.tbd.kovid.model.Environment;
import com.tbd.kovid.services.EnvRepository;


@RestController
public class EnvController {

    @Autowired
    private EnvRepository envRepository;

    @SuppressWarnings("unchecked")
	@GetMapping("/environments")
    public Page<Environment> getReports(Pageable pageable) {
        return (Page<Environment>) envRepository.listEnvironments(pageable);
    }


    @PostMapping("/create")
    public Environment createEnvironment(@Valid @RequestBody Environment env) {
        return envRepository.save(env);
    }

    @PutMapping("/environments/{envId}")
    public String updateReport(@PathVariable Long envId,
                                   @Valid @RequestBody Environment envRequest) {
    	if(!envRepository.exists(envId)) {
            throw new ResourceNotFoundException("Environment not found with id " + envId);
        }
    	
    	envRepository.save(new Environment(envRequest.getEnvType(), envRequest.getEnvName()));
         return "Environment has been updated";       
    }


    @DeleteMapping("environments/{envId}")
    public ResponseEntity<?> deleteEnv(@PathVariable Long envId) {
    	
    	if(!envRepository.exists(envId)) {
            throw new ResourceNotFoundException("Environment not found with id " + envId);
        }
        Environment env = envRepository.findByEnvironmentId(envId);
              
        envRepository.delete(env);
        return ResponseEntity.ok().build();
    }
}
