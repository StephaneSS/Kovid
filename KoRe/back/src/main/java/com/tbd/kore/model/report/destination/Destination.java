package com.tbd.kore.model.report.destination;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "destination_file_transfer")

@Getter
@Setter
@RequiredArgsConstructor
public abstract class Destination implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "active", nullable = false)
    private Boolean active;

}
