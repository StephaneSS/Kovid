package com.tbd.kore.service;

import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

@Service
public class ScheduleTaskService {

    // Task Scheduler
    TaskScheduler scheduler;

    // A map for keeping scheduled tasks
    ConcurrentHashMap<Long, ScheduledFuture<?>> jobsMap = new ConcurrentHashMap<>();

    public ScheduleTaskService(TaskScheduler scheduler) {
        this.scheduler = scheduler;
    }


    // Schedule Task to be executed every night at 00 or 12 am
    public void addTaskToScheduler(Long id, Runnable task, String cronExp) {
        ScheduledFuture<?> scheduledTask = scheduler.schedule(task, new CronTrigger(cronExp, TimeZone.getTimeZone(TimeZone.getDefault().getID())));
        jobsMap.put(id, scheduledTask);
    }

    // Remove scheduled task
    public void removeTaskFromScheduler(Long id) {
        jobsMap.computeIfPresent(id, (idx, scheduledTask) -> {
            scheduledTask.cancel(false);
            return jobsMap.remove(idx);
        });
    }

    // A context refresh event listener
    @EventListener({ ContextRefreshedEvent.class })
    void contextRefreshedEvent() {
        // Get all tasks from DB and reschedule them in case of context restarted
    }
}
