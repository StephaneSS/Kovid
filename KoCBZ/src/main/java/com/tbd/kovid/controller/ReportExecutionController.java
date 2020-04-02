package com.tbd.kovid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import com.tbd.kovid.model.ReportExecution;
import com.tbd.kovid.services.ReportExecutionRepository;


@RestController
public class ReportExecutionController {

    @Autowired
    private ReportExecutionRepository reportExecutionRepository;

  

    @PostMapping("/create")
    public ReportExecution createReport(@Valid @RequestBody ReportExecution reportExecution) {
        return reportExecutionRepository.save(reportExecution);
    }

    @PutMapping("/reportExecution/{reportId}")
    public String updateReport(@PathVariable Long reportId,
                                   @Valid @RequestBody ReportExecution reportExecutionRequest) {
    	if(!reportExecutionRepository.exists(reportId)) {
            throw new ResourceNotFoundException("ReportExecution not found with id " + reportId);
        }
    	
    	reportExecutionRepository.save(new ReportExecution(reportExecutionRequest.getReportId(), reportExecutionRequest.getExecId(), reportExecutionRequest.getStartDate(), 
    			reportExecutionRequest.getEndDate(), reportExecutionRequest.getStatus(), reportExecutionRequest.getEnvId() ));
    	
         return "Report has been updated";       
    }


    @DeleteMapping("/reports/{reportId}")
    public ResponseEntity<?> deleteReport(@PathVariable Long reportId) {
    	
    	if(!reportExecutionRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
    	ReportExecution reportExecution = reportExecutionRepository.findByReportId(reportId);
              
        reportExecutionRepository.delete(reportExecution);
        return ResponseEntity.ok().build();
    }
}
