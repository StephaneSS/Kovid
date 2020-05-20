package com.tbd.kore.model.report;

import com.tbd.kore.model.report.destination.Destinations;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "schedule")

@Getter
@Setter
@RequiredArgsConstructor
public class Schedule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "cron_expression", nullable = false)
    private String cronExpression;

    /**
     * If the environment is null the schedule will be for all environments
     **/
    @OneToOne
    @JoinColumn(name = "environment_id")
    private Environment environment;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Destinations destinations;

    private String text;

    public Long getId() {
        return id;
    }

    public String getCronExpression() {
        return cronExpression;
    }

    public Environment getEnvironment() {
        return environment;
    }
}
