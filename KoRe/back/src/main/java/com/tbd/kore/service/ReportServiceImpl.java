package com.tbd.kore.service;

import com.tbd.kore.model.report.ExecutionLog;
import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.ReportSimple;
import com.tbd.kore.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private JobRunnerService jobRunnerService;

    @Override
    public List<ReportSimple> getAllSimple() {
        return reportRepository
                .findAll().stream()
                .map(ReportSimple::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<Report> getAll() {
        return reportRepository.findAll();
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
        jobRunnerService.scheduleNewJobsForReport(savedReport);

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
            jobRunnerService.removeScheduledJobForReport(oldReport);
            oldReport.setSchedules(report.getSchedules());
            Report savedReport = reportRepository.save(oldReport);
            jobRunnerService.scheduleNewJobsForReport(savedReport);
            return savedReport;
        });
    }

    @Override
    public Optional<Report> deleteById(Long id) {

        return reportRepository.findById(id).map(report -> {
            jobRunnerService.removeScheduledJobForReport(report);
            reportRepository.deleteById(id);
            return report;
        });

    }

    @Override
    public Optional<Report> addExecutionToReportById(Long reportId, ExecutionLog execution){
        return reportRepository.findById(reportId).map(report -> {
            report.getExecutionLogs().add(execution);
            return reportRepository.save(report);
        });
    }
}
