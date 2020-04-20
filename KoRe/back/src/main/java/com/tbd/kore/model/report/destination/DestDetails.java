package com.tbd.kore.model.report.destination;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Deprecated
@Entity
@Table(name = "destinationsDetails")
public class DestDetails {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "report_id", nullable = false)
    private long reportId;

    @Column(name = "host", nullable = false)
    private String host;

    @Column(name = "Path", nullable = false)
    private String path;

    public DestDetails(int id, long reportId, String host, String path) {
        this.id = id;
        this.reportId = reportId;
        this.host = host;
        this.path = path;
    }
}
