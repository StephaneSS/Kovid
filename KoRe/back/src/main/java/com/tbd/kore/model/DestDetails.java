package com.tbd.kore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "DestDetails")
public class DestDetails {

    @Column(name = "Report_Id", nullable = false)
    private long reportId;

    @Id
    @Column(name = "Dest_Id", nullable = false)
    private int destinationId;

    @Column(name = "Dest_Host", nullable = false)
    private String destHost;

    @Column(name = "Dest_Path", nullable = false)
    private String destPath;

    public DestDetails(long reportId, int destinationId, String destHost, String destPath) {
        this.reportId = reportId;
        this.destinationId = destinationId;
        this.destHost = destHost;
        this.destPath = destPath;
    }

    public long getReportId() {
        return reportId;
    }

    public int getDestinationId() {
        return destinationId;
    }

    public String getDestHost() {
        return destHost;
    }

    public String getDestPath() {
        return destPath;
    }

    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public void setDestinationId(int destinationId) {
        this.destinationId = destinationId;
    }

    public void setDestHost(String destHost) {
        this.destHost = destHost;
    }

    public void setDestPath(String destPath) {
        this.destPath = destPath;
    }
}
