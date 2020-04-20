package com.tbd.kore.controller;

import com.tbd.kore.model.report.Argument;
import com.tbd.kore.model.report.ArgumentType;
import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.Schedule;
import com.tbd.kore.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @PostMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Report> updateReportById(@PathVariable("id") Long id, @RequestBody Report report) {
        report.setId(id);
        return new ResponseEntity<>(reportRepository.save(report), HttpStatus.OK);
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

    @GetMapping(value="/test")
    public ResponseEntity<Report> testReport(){
        Report report = new Report();
        report.setId(1L);
        report.setName("test_name");
        report.setDescription("test_desc");
        List<Argument> args = new ArrayList<>();
        args.add(new Argument(154158L,1L, ArgumentType.STRING, "arg_name" , "arg_value"));
        args.add(new Argument(2545863L, 2L, ArgumentType.NUMBER, "arg_name2" , "56"));
        report.setArguments(args);
        List<Schedule> schedules = new ArrayList<>();
        schedules.add(new Schedule());
        schedules.add(new Schedule());
        report.setSchedules(schedules);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

}
