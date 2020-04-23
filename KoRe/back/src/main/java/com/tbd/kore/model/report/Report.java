package com.tbd.kore.model.report;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "report")

@Getter
@Setter
@RequiredArgsConstructor
public class Report implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinTable(name = "report_arguments")
    private List<Argument> arguments = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostProcess> postProcesses = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExecutionLog> executionLogs = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public List<Argument> getArguments() {
        return arguments;
    }

    public List<PostProcess> getPostProcesses() {
        return postProcesses;
    }

    public List<ExecutionLog> getExecutionLogs() {
        return executionLogs;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSchedules(List<Schedule> schedules) {
        this.schedules.clear();
        if (schedules != null) {
            this.schedules.addAll(schedules);
        }
    }

    public void setArguments(List<Argument> arguments) {
        this.arguments.clear();
        if (arguments != null) {
            this.arguments.addAll(arguments);
        }
    }

    public void setExecutionLogs(List<ExecutionLog> executionLogs) {
        this.executionLogs.clear();
        if (executionLogs != null) {
            this.executionLogs.addAll(executionLogs);
        }
    }

    public void setPostProcesses(List<PostProcess> postProcesses) {
        this.postProcesses.clear();
        if (postProcesses != null) {
            this.postProcesses.addAll(postProcesses);
        }
    }

}
