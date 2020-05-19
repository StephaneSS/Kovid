package com.tbd.kore.service;

import com.tbd.kore.model.JobReport;
import com.tbd.kore.model.report.ExecutionLog;
import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.Schedule;
import com.tbd.kore.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.concurrent.CompletableFuture;
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
        this.scheduleTaskService.addTaskToScheduler(job.getSchedule().getId(), generateRunnableJob(job) , job.getSchedule().getCronExpression());
    }

    private Runnable generateRunnableJob(JobReport rep) {
        return new Runnable() {

            final JobReport report = rep;
            Timestamp startDate;
            Timestamp endDate;

            @Override
            public void run() {
                CompletableFuture
                        .runAsync(() -> LOG.info(String.format("Start schedule #%d", this.report.getSchedule().getId())))
                        .thenRun(setStartDate())
                        .thenRun(generateReport(report))
                        .thenRun(performPostProcesses(report))
                        .thenRun(sendResults(report))
                        .thenRun(setEndDate())
                        .thenRun(addExecutionToReport())
                        .thenRun(() -> LOG.info(String.format("End schedule #%d", report.getSchedule().getId())));
            }

            private Runnable setStartDate(){
                return () -> this.startDate = new Timestamp(Calendar.getInstance().getTime().getTime());
            }

            private Runnable setEndDate(){
                return () ->this.endDate = new Timestamp(Calendar.getInstance().getTime().getTime());
            }

            private Runnable addExecutionToReport() {
                return () -> {
                    ExecutionLog execution = new ExecutionLog();
                    execution.setStartDate(this.startDate);
                    execution.setEndDate(this.endDate);
                    execution.setEnvironment(this.report.getSchedule().getEnvironment());
                    execution.setStatus("OK");
                    reportService.addExecutionToReportById(this.report.getId(), execution);
                    LOG.info(String.format(" - schedule #%d: save execution", report.getSchedule().getId()));
                };
            }

            private Runnable generateReport(JobReport report) {
                return () -> LOG.info(String.format(" - schedule #%d: generate report", report.getSchedule().getId()));
            }

            private Runnable performPostProcesses(JobReport report) {
                return () -> LOG.info(String.format(" - schedule #%d: Perform Post Processes", report.getSchedule().getId()));
            }

            private Runnable sendResults(JobReport report) {
                return () -> LOG.info(String.format(" - schedule #%d: Send Results", report.getSchedule().getId()));
            }

        };
    }

}
