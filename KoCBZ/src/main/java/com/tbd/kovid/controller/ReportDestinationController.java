package com.tbd.kovid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import com.tbd.kovid.model.ReportDestination;
import com.tbd.kovid.services.ReportDestinationRepository;


@RestController
public class ReportDestinationController {

    @Autowired
    private ReportDestinationRepository reportDestinationRepository;

  

    @PostMapping("/create")
    public ReportDestination createReport(@Valid @RequestBody ReportDestination reportDestination) {
        return reportDestinationRepository.save(reportDestination);
    }

    @PutMapping("/reportDestination/{reportId}")
    public String updateReport(@PathVariable Long reportId,
                                   @Valid @RequestBody ReportDestination reportDestinationRequest) {
    	if(!reportDestinationRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
    	
    	reportDestinationRepository.save(new ReportDestination(reportDestinationRequest.getReportId(), reportDestinationRequest.getDestinationId(), reportDestinationRequest.getDestMail(), 
    			reportDestinationRequest.getActive(), reportDestinationRequest.getDestType(), reportDestinationRequest.getDestObject(),	reportDestinationRequest.getDestSubject()));
         return "Report has been updated";       
    }


    @DeleteMapping("/reportDestination/{reportId}")
    public ResponseEntity<?> deleteReport(@PathVariable Long reportId) {
    	
    	if(!reportDestinationRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
    	ReportDestination reportDestination = reportDestinationRepository.findByReportId(reportId);
              
        reportDestinationRepository.delete(reportDestination);
        return ResponseEntity.ok().build();
    }
}
