package com.tbd.kore.model.report.destination;

import com.tbd.kore.model.ServerConnexion;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "destination_directory")

@Getter
@Setter
@RequiredArgsConstructor
public class DestinationDirectory extends Destination implements Serializable {

    @ManyToOne
    @JoinColumn(name = "server_id", nullable = false)
    private ServerConnexion serverConnexion;

    @Column(name = "path", nullable = false)
    private String path;

}
