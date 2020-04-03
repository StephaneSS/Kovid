package com.tbd.kovid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import com.tbd.kovid.model.ReportArguments;
import com.tbd.kovid.services.ReportArgRepository;


@RestController
public class ReportArgController {

    @Autowired
    private ReportArgRepository reportArgRepository;

   
    @PostMapping("/create")
    public ReportArguments createReport(@Valid @RequestBody ReportArguments reportArguments) {
        return reportArgRepository.save(reportArguments);
    }

    @PutMapping("/reports/{reportId}")
    public String updateReport(@PathVariable Long reportId,
                                   @Valid @RequestBody ReportArguments reportArgumentsRequest) {
    	if(!reportArgRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
    	
    	reportArgRepository.save(new ReportArguments(reportArgumentsRequest.getReportId(),  reportArgumentsRequest.getArgumentId(), reportArgumentsRequest.getArgumentKey(), 
    			reportArgumentsRequest.getArgumentValue(), reportArgumentsRequest.getArgumentType()));
         return "Report has been updated";       
    }


    @DeleteMapping("/reports/{reportId}")
    public ResponseEntity<?> deleteReport(@PathVariable Long reportId) {
    	
    	if(!reportArgRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
    	ReportArguments reportArguments = reportArgRepository.findByReportId(reportId);
              
        reportArgRepository.delete(reportArguments);
        return ResponseEntity.ok().build();
    }
}
