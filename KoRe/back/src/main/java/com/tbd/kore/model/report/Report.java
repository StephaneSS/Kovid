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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Argument> arguments = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExecutionLog> executionLogs = new ArrayList<>();

    public List<ExecutionLog> getExecutionLogs() {
        return executionLogs;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setExecutionLogs(List<ExecutionLog> executionLogs) {
        this.executionLogs = executionLogs;
    }

}
