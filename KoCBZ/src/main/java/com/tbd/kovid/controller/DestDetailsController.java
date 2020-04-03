package com.tbd.kovid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import com.tbd.kovid.model.DestDetails;
import com.tbd.kovid.services.DestDetailsRepository;



@RestController
public class DestDetailsController {

    @Autowired
    private DestDetailsRepository destDetailsRepository;

    @SuppressWarnings("unchecked")
	@GetMapping("/destdetails")
    public Page<DestDetails> getDestDetails(Pageable pageable) {
        return (Page<DestDetails>) destDetailsRepository.listDestDetails(pageable);
    }


    @PostMapping("/create")
    public DestDetails createEnvironment(@Valid @RequestBody DestDetails destDetails) {
        return destDetailsRepository.save(destDetails);
    }

    @PutMapping("/destdetails/{reportId}")
    public String updateReport(@PathVariable Long reportId,
                                   @Valid @RequestBody DestDetails destDetailsRequest) {
    	if(!destDetailsRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
    	
    	destDetailsRepository.save(new DestDetails(destDetailsRequest.getReportId(), destDetailsRequest.getDestinationId(),  destDetailsRequest.getDestHost(), destDetailsRequest.getDestPath()));
         return "DestDetails has been updated";       
    }


    @DeleteMapping("destdetails/{reportId}")
    public ResponseEntity<?> deleteEnv(@PathVariable Long reportId) {
    	
    	if(!destDetailsRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
        DestDetails destDetails = destDetailsRepository.findByReportId(reportId);
              
        destDetailsRepository.delete(destDetails);
        return ResponseEntity.ok().build();
    }
}
