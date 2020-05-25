package com.tbd.kore.service;

import com.tbd.kore.job.ReportPipeline;
import com.tbd.kore.model.JobReport;
import com.tbd.kore.model.report.ExecutionLog;
import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.Schedule;
import com.tbd.kore.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.logging.Logger;

@Service
public class JobRunnerService {
    private static final Logger LOG = Logger.getLogger(String.valueOf(JobRunnerService.class));

    @Autowired
    private ScheduleTaskService scheduleTaskService;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ReportServiceImpl reportService;

    @PostConstruct
    private void postConstruct() {
        LOG.info("Set scheduled tasks");
        reportService.getAll().forEach(this::scheduleNewJobsForReport);
    }

    public void scheduleNewJobsForReport(Report report){
        report.getSchedules().forEach(schedule -> scheduleNewJob(report, schedule));
    }

    public void removeScheduledJobForReport(Report report){
        report.getSchedules().stream().map(Schedule::getId).forEach(scheduleTaskService::removeTaskFromScheduler);
    }

    public void scheduleNewJob(Report report, Schedule schedule){
        JobReport job = new JobReport(report, schedule.getId());
        this.scheduleTaskService.addTaskToScheduler(job.getSchedule().getId(), setPipeline(job) , job.getSchedule().getCronExpression());
    }

    private Runnable setPipeline(JobReport job){
        return () -> {
            ReportPipeline pipeline = new ReportPipeline(job);
            pipeline.getPipeline().thenRunAsync(saveExecution(pipeline)).join();
        };
    }

    private Runnable saveExecution(ReportPipeline pipeline) {
        return () -> {
            ExecutionLog execution = pipeline.getExecutionInfo();
            reportService.addExecutionToReportById(pipeline.getReport().getId(), execution);
            LOG.info(String.format(" - schedule #%d: save execution log", pipeline.getReport().getSchedule().getId()));
        };
    }
}
