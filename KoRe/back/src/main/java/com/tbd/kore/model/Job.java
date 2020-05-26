package com.tbd.kore.model;

import com.tbd.kore.model.report.Argument;
import com.tbd.kore.model.report.PostProcess;
import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.Schedule;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Job {

    private final Long id;

    private final String name;

    private final String description;

    private final Schedule schedule;

    private final List<Argument> arguments;

    private final List<PostProcess> postProcesses;

    public Job(Report report, Long scheduleId) {
        this.id = report.getId();
        this.name = report.getName();
        this.description = report.getDescription();
        this.schedule = report.getSchedules().stream().filter( scheduled -> scheduled.getId().equals(scheduleId)).findFirst().orElseThrow(ExceptionInInitializerError::new);
        this.arguments = report.getArguments();
        this.postProcesses = report.getPostProcesses();
    }

    public Long getId() {
        return id;
    }

    public Schedule getSchedule() {
        return schedule;
    }
}
