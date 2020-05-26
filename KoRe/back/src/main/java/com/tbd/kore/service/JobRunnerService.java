package com.tbd.kore.service;

import com.tbd.kore.model.Job;
import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.Schedule;
import com.tbd.kore.job.report_job.ReportJob;
import com.tbd.kore.job.report_job.ReportJobServiceImpl;
import com.tbd.kore.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.logging.*;

@Service
public class JobRunnerService {
    private static final Logger LOG = Logger.getLogger(String.valueOf(JobRunnerService.class));

    @Autowired
    private ScheduleTaskService scheduleTaskService;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ReportServiceImpl reportService;

    @Autowired
    private ReportJobServiceImpl jobService;

    @Value("${kore.job.log.to-console:true}")
    private Boolean displayLogOnConsole;

    @Value("${kore.job.log.format:[%1$tF %1$tT] [%4$-7s] %5$s %n}")
    private String logFormat;

    @Value("${kore.job.log.path:./log/}")
    private String logPath;

    @PostConstruct
    private void postConstruct() {
        LOG.info("Set scheduled tasks");
        reportService.getAll().forEach(this::scheduleNewJobsForReport);
        ReportJob.logFormat(logFormat);
    }

    public void scheduleNewJobsForReport(Report report){
        report.getSchedules().forEach(schedule -> scheduleNewJob(report, schedule));
    }

    public void removeScheduledJobForReport(Report report){
        report.getSchedules().stream().map(Schedule::getId).forEach(scheduleTaskService::removeTaskFromScheduler);
    }

    public void scheduleNewJob(Report report, Schedule schedule){
        Job job = new Job(report, schedule.getId());
        this.scheduleTaskService.addTaskToScheduler(job.getSchedule().getId(), setPipeline(job) , job.getSchedule().getCronExpression());
    }

    private Runnable setPipeline(Job jobReport){
        return () -> {

            String logFilePath = setupLogFile(jobReport);

            try (FileOutputStream logFile = new FileOutputStream(logFilePath, true) ){
                StreamHandler logHandler = new StreamHandler(logFile, new SimpleFormatter());

                ReportJob job = new ReportJob(jobReport, logHandler, this.displayLogOnConsole);
                reportService.addExecutionToReportById(
                        jobReport.getId(),
                        jobService.execute(job).join().getExecutionLog()
                );

                logHandler.close();
            } catch (Exception e) {
                LOG.log(Level.SEVERE,e.getMessage(),e);
            }
        };
    }

    private String setupLogFile(Job jobReport) {
        File logDir = new File(logPath);
        logDir.mkdirs();

        return logDir.getAbsolutePath()+File.separator+String.format("job-%s-%s-%s.log",
                jobReport.getId(),
                jobReport.getSchedule().getId(),
                Timestamp.from(Instant.now())
        );
    }
}
