package com.tbd.kore.service;

import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.ReportSimple;
import com.tbd.kore.model.report.Schedule;
import com.tbd.kore.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private JobRunnerService jobRunnerService;

    @Autowired
    private ScheduleTaskService scheduleTaskService;

    @Override
    public List<ReportSimple> getAllSimple() {
        return reportRepository
                .findAll().stream()
                .map(ReportSimple::new)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Report> getById(Long id) {
        return reportRepository.findById(id);
    }

    @Override
    public Report add(Report report) {
        // reset auto generated fields
        report.setId(null);
        report.setExecutionLogs(new ArrayList<>());

        Report savedReport = reportRepository.save(report);
        savedReport.getSchedules().forEach(jobRunnerService::addRunnerFromSchedule);

        return savedReport;
    }

    @Override
    public Optional<Report> updateById(Long id, Report report) {
        Optional<Report> optReport = reportRepository.findById(id);
        return optReport.map( oldReport -> {
            if(report.getName() != null && !report.getName().trim().isEmpty() ) {
                oldReport.setName(report.getName());
            }
            if(report.getDescription() != null && !report.getDescription().trim().isEmpty()) {
                oldReport.setDescription(report.getDescription());
            }
            oldReport.setArguments(report.getArguments());
            oldReport.getSchedules().stream().map(Schedule::getId).forEach(scheduleTaskService::removeTaskFromScheduler);
            oldReport.setSchedules(report.getSchedules());
            Report savedReport = reportRepository.save(oldReport);
            savedReport.getSchedules().forEach(jobRunnerService::addRunnerFromSchedule);
            return savedReport;
        });
    }

    @Override
    public Optional<Report> deleteById(Long id) {

        return reportRepository.findById(id).map(report -> {
            report.getSchedules().stream().map(Schedule::getId).forEach(scheduleTaskService::removeTaskFromScheduler);
            reportRepository.deleteById(id);
            return report;
        });

    }
}
