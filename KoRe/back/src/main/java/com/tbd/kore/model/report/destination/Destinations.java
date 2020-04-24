package com.tbd.kore.model.report.destination;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "destinations")

@Getter
@Setter
@RequiredArgsConstructor
public class Destinations implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name = "destination_email_id", nullable = false)
    private List<DestinationsEmail> email = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name = "destination_directory_id", nullable = false)
    private List<DestinationDirectory> directory = new ArrayList<>();

    public void setEmail(List<DestinationsEmail> destination) {
        this.email.clear();
        if (destination != null) {
            this.email.addAll(destination);
        }
    }

    public void setDirectory(List<DestinationDirectory> destination) {
        this.directory.clear();
        if (destination != null) {
            this.directory.addAll(destination);
        }
    }

}
