package com.tbd.kore.model.report.destination;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "destination_email")

@Getter
@Setter
@RequiredArgsConstructor
public class DestinationsEmail extends Destination implements Serializable {

    @Column(name = "send_to", nullable = false)
    private String sendTo;

    @Column(name = "subject", nullable = false)
    private String subject;

}
