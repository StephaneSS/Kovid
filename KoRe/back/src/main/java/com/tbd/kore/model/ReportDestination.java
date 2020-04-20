package com.tbd.kore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportDestination")
public class ReportDestination {

    public enum DestType {SMTP, FTP, SFTP, FOLDER}

    @Id
    @Column(name = "Report_Id", nullable = false)
    private long reportId;

    @Column(name = "Dest_Id", nullable = false)
    private int destinationId;

    @Column(name = "Dest_Mail", nullable = false)
    private String destMail;

    @Column(name = "Active", nullable = false)
    private String active;

    @Enumerated(EnumType.ORDINAL)
    private DestType destType;

    private String destObject;
    private String destSubject;

    public ReportDestination(long reportId, int destinationId, String destMail, String active, DestType destType, String destObject, String destSubject) {
        this.reportId = reportId;
        this.destinationId = destinationId;
        this.destMail = destMail;
        this.active = active;
        this.destType = destType;
        this.destObject = destObject;
        this.destSubject = destSubject;
    }

    public long getReportId() {
        return reportId;
    }

    public int getDestinationId() {
        return destinationId;
    }

    public String getDestMail() {
        return destMail;
    }

    public String getActive() {
        return active;
    }

    public DestType getDestType() {
        return destType;
    }

    public String getDestObject() {
        return destObject;
    }

    public String getDestSubject() {
        return destSubject;
    }

    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public void setDestinationId(int destinationId) {
        this.destinationId = destinationId;
    }

    public void setDestMail(String destMail) {
        this.destMail = destMail;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public void setDestType(DestType destType) {
        this.destType = destType;
    }

    public void setDestObject(String destObject) {
        this.destObject = destObject;
    }

    public void setDestSubject(String destSubject) {
        this.destSubject = destSubject;
    }
}
