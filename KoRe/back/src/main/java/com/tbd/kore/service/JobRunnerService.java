package com.tbd.kore.service;

import com.tbd.kore.model.JobReport;
import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.Schedule;
import com.tbd.kore.repository.ReportRepository;
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
    private ReportRepository reportRepository;

    @PostConstruct
    private void postConstruct() {
        LOG.info("Set scheduled tasks");
        reportRepository.findAll().forEach(this::scheduleNewJobsForReport);
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

            @Override
            public void run() {
                LOG.info(String.format("Start schedule #%d", this.report.getSchedule().getId()));
                LOG.info(String.format("End schedule #%d", report.getSchedule().getId()));
            }
        };
    }

}
