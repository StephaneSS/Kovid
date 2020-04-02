package com.tbd.kovid.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import javax.validation.Valid;
import com.tbd.kovid.model.ReportSched;
import com.tbd.kovid.services.ReportSchedRepository;


@RestController
public class ReportSchedController {

    @Autowired
    private ReportSchedRepository reportSchedRepository;

    @GetMapping("/reportSched")
    public List<ReportSched> findByReportId(Long reportId) {
        return (List<ReportSched>) reportSchedRepository.findByReportId(reportId);
    }


    @PostMapping("/create")
    public ReportSched createReportSched(@Valid @RequestBody ReportSched reportSched) {
        return reportSchedRepository.save(reportSched);
    }

    @PutMapping("/reportSched/{reportId}{schedId}")
    public String updateReportSched(@PathVariable Long reportId, @PathVariable Long schedId, 
                                   @Valid @RequestBody ReportSched reportSchedrequest) {
    	if(!reportSchedRepository.existsSchedId(reportId, schedId )) {
            throw new ResourceNotFoundException("Schedule not found with id " + reportId);
        }
    	
    	reportSchedRepository.save(new ReportSched(reportSchedrequest.getReportId(), reportSchedrequest.getSchedId(), reportSchedrequest.getReportSched()));
         return "ReportSched has been updated";       
    }


    @DeleteMapping("/reportSched/{reportId}{schedId}")
    public ResponseEntity<?> deleteEnv(@PathVariable Long reportId, @PathVariable Long schedId) {
    	
    	if(!reportSchedRepository.existsSchedId(reportId, schedId )) {
            throw new ResourceNotFoundException("Schedule not found with id " + reportId);
        }
          
    	ReportSched reportSched = reportSchedRepository.findBySchedId(reportId, schedId);
    	reportSchedRepository.delete(reportSched);
        return ResponseEntity.ok().build();
    }
}
