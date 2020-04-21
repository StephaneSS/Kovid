package com.tbd.kore.controller;

import com.tbd.kore.model.report.Report;
import com.tbd.kore.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> addReport(@RequestBody Report report) {
        report.setId(null);
        report.setExecutionLogs(new ArrayList<>());
        return new ResponseEntity<>(reportRepository.save(report), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> getReportById(@PathVariable("id") Long id) {
        return reportRepository.findById(id)
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PatchMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> updateReportById(@PathVariable("id") Long id, @RequestBody Report report) {
        Optional<Report> optReport = reportRepository.findById(id);
        if (optReport.isPresent()) {
            Report oldReport = optReport.get();
            if(report.getName() != null && !report.getName().trim().isEmpty() ) {
                oldReport.setName(report.getName());
            }
            if(report.getDescription() != null && !report.getDescription().trim().isEmpty()) {
                oldReport.setDescription(report.getDescription());
            }
            oldReport.setSchedules(report.getSchedules());
            oldReport.setArguments(report.getArguments());
            return new ResponseEntity<>(reportRepository.save(oldReport), HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteReportById(@PathVariable("id") Long id) {

        HttpStatus responseStatus = HttpStatus.NOT_FOUND;

        if(reportRepository.existsById(id)) {
            reportRepository.deleteById(id);
            responseStatus = HttpStatus.OK;
        }

        return ResponseEntity.status(responseStatus).build();

    }

}
