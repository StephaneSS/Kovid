package com.tbd.kore.model.report.destination;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "destination_smtp")

@Getter
@Setter
@RequiredArgsConstructor
public class DestinationsSMTP implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "active", nullable = false)
    private Boolean active;

    @Column(name = "email_address", nullable = false)
    private String emailAddress;

    @Column(name = "subject", nullable = false)
    private String subject;

}
