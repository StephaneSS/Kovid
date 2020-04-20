package com.tbd.kore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportSched")
public class ReportSched {

    @Id
    @Column(name = "Report_Id", nullable = false)
    private long reportId;

    @Column(name = "Sched_Id", nullable = false)
    private int schedId;

    @Column(name = "Schedule", nullable = false)
    private String reportSched;

    public ReportSched(long reportId, int schedId, String reportSched) {
        this.reportId = reportId;
        this.schedId = schedId;
        this.reportSched = reportSched;
    }

    public long getReportId() {
        return reportId;
    }

    public int getSchedId() {
        return schedId;
    }

    public String getReportSched() {
        return reportSched;
    }

    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public void setSchedId(int schedId) {
        this.schedId = schedId;
    }

    public void setReportSched(String reportSched) {
        this.reportSched = reportSched;
    }
}
