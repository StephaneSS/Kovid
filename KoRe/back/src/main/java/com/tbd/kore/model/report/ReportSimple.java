package com.tbd.kore.model.report;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@RequiredArgsConstructor
public class ReportSimple implements Serializable {

    private Long id;

    private String name;

    private String description;

    private List<Long> schedules;

    private List<Long> arguments;

    private List<Long> postProcesses;

    private List<ExecutionLog> executionLogs;

    public ReportSimple(Report report) {
        this.id =  report.getId();
        this.name =  report.getName();
        this.description =  report.getDescription();
        this.schedules =  report.getSchedules().stream().map(Schedule::getId).collect(Collectors.toList());
        this.arguments =  report.getArguments().stream().map(Argument::getId).collect(Collectors.toList());
        this.postProcesses =  report.getPostProcesses().stream().map(PostProcess::getId).collect(Collectors.toList());
        this.executionLogs =  report.getExecutionLogs();
    }

}
