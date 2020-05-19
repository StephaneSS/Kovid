package com.tbd.kore.controller;

import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.ReportSimple;
import com.tbd.kore.service.ReportServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportServiceImpl reportService;

    @GetMapping(value="/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReportSimple>> getAllReports() {
        return new ResponseEntity<>(reportService.getAllSimple(), HttpStatus.OK);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> addReport(@RequestBody Report report) {
        return new ResponseEntity<>(reportService.add(report), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> getReportById(@PathVariable("id") Long id) {
        return reportService.getById(id)
                .map( report -> new ResponseEntity<>(report, HttpStatus.OK) )
                .orElse( ResponseEntity.status(HttpStatus.NOT_FOUND).build() );
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> updateReportById(@PathVariable("id") Long id, @RequestBody Report report) {
        return reportService.updateById(id, report)
                .map( updatedReport -> new ResponseEntity<>(updatedReport, HttpStatus.OK) )
                .orElse( ResponseEntity.status(HttpStatus.NOT_FOUND).build() );
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteReportById(@PathVariable("id") Long id) {

        HttpStatus responseStatus = reportService.deleteById(id)
                .map( unused -> HttpStatus.OK )
                .orElse( HttpStatus.NOT_FOUND );

        return ResponseEntity.status(responseStatus).build();

    }

}
