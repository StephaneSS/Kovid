package com.tbd.kore.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportExecution")
public class ReportExecution {


    @Id
    @Column(name = "Report_Id", nullable = false)
    private long reportId;
    @Column(name = "Exec_Id", nullable = false)
    private int execId;
    @Column(name = "Env_Id", nullable = false)
    private int envId;
    @Column(name = "Start_Date", nullable = false)
    private Timestamp startDate;
    @Column(name = "End_Date", nullable = false)
    private Timestamp endDate;
    @Column(name = "Status", nullable = false)
    private String status;


    public ReportExecution(long reportId, int execId, Timestamp startDate, Timestamp endDate, String status, int envId) {
        this.reportId = reportId;
        this.execId = execId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.envId = envId;

    }

    public long getReportId() {
        return reportId;
    }

    public int getExecId() {
        return execId;
    }

    public int getEnvId() {
        return envId;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public void setExecId(int execId) {
        this.execId = execId;
    }

    public void setEnvId(int envId) {
        this.envId = envId;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
