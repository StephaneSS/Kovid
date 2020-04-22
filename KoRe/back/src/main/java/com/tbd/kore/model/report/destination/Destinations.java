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

    @OneToMany(cascade = CascadeType.ALL)
    @Column(name = "destinations_smtp", nullable = false)
    private List<DestinationsSMTP> smtp = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @Column(name = "destinations_ftp", nullable = false)
    private List<DestinationsFTP> ftp = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @Column(name = "destinations_sftp", nullable = false)
    private List<DestinationsSFTP> sftp = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @Column(name = "destinations_folder", nullable = false)
    private List<DestinationsFolder> folder = new ArrayList<>();

}
