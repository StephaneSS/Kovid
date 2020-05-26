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
import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.concurrent.ExecutionException;
import java.util.logging.FileHandler;
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

    @Autowired
    private ReportJobServiceImpl jobService;

    @Value("${kore.job.log.to-console:true}")
    private Boolean displayLogOnConsole;

    @Value("${kore.job.log.format:[%1$tF %1$tT] [%4$-7s] %5$s %n}")
    private String logFormat;

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
            try {
                FileHandler logFile = new FileHandler("test" + jobReport.getSchedule().getId() + "." + jobReport.getId() + "." + Timestamp.from(Instant.now()) + ".log");

                ReportJob job = new ReportJob(jobReport, logFile, this.displayLogOnConsole);
                jobService.execute(job).get();

                reportService.addExecutionToReportById(job.getReport().getId(), job.getExecutionLog());
                logFile.close();
            } catch (IOException e) {
                LOG.info("******************************");
            } catch (InterruptedException e) {
                LOG.info("------------------------------");
            } catch (ExecutionException e) {
                LOG.info("++++++++++++++++++++++++++++++");
            }
        };
    }
}
