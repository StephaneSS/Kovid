package com.tbd.kovid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import com.tbd.kovid.model.Report;
import com.tbd.kovid.services.ReportRepository;


@RestController
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @SuppressWarnings("unchecked")
	@GetMapping("/reports")
    public Page<Report> getReports(Pageable pageable) {
        return (Page<Report>) reportRepository.listReports(pageable);
    }


    @PostMapping("/create")
    public Report createReport(@Valid @RequestBody Report report) {
        return reportRepository.save(report);
    }

    @PutMapping("/reports/{reportId}")
    public String updateReport(@PathVariable Long reportId,
                                   @Valid @RequestBody Report reportRequest) {
    	if(!reportRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
    	
    	reportRepository.save(new Report(reportRequest.getReportShortName(), reportRequest.getReportName()));
         return "Report has been updated";       
    }


    @DeleteMapping("/reports/{reportId}")
    public ResponseEntity<?> deleteReport(@PathVariable Long reportId) {
    	
    	if(!reportRepository.exists(reportId)) {
            throw new ResourceNotFoundException("Report not found with id " + reportId);
        }
        Report report = reportRepository.findByReportId(reportId);
              
        reportRepository.delete(report);
        return ResponseEntity.ok().build();
    }
}
