package com.tbd.kore.service;

import com.tbd.kore.model.report.Schedule;
import com.tbd.kore.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.logging.Logger;

@Component
public class JobRunnerService {
    private static final Logger LOG = Logger.getLogger(String.valueOf(JobRunnerService.class));

    @Autowired
    private ScheduleTaskService scheduleTaskService;


    @Autowired
    private ScheduleRepository scheduleRepository;

    @PostConstruct
    public void postConstruct() {
        LOG.info("postConstruct START ########################################");
        List<Schedule> schedules = scheduleRepository.findAll();
        schedules.forEach(this::addRunnerFromSchedule);
        LOG.info("postConstruct END ########################################");
    }

    public void addRunnerFromSchedule(Schedule schedule){
        this.scheduleTaskService.addTaskToScheduler(schedule.getId(), generateRunnableJob(schedule) , schedule.getCronExpression());
    }

    private Runnable generateRunnableJob(Schedule sched) {
        return new Runnable() {

            final Schedule schedule = sched;

            @Override
            public void run() {
                LOG.info(String.format("Start schedule #%d", this.schedule.getId()));
                LOG.info(String.format("End schedule #%d", this.schedule.getId()));
            }
        };
    }

}
