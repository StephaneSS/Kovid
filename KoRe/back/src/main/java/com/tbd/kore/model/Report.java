package com.tbd.kore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Report")
public class Report {

    @Id
    @Column(name = "Report_Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reportId;

    @Column(name = "Report_ShortName", nullable = false)
    private String reportShortName;

    @Column(name = "Report_Name", nullable = false)
    private String reportName;

    public Report(String reportShortName, String reportName) {
        this.reportShortName = reportShortName;
        this.reportName = reportName;
    }

    public long getReportId() {
        return reportId;
    }

    public String getReportShortName() {
        return reportShortName;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public void setReportShortName(String reportShortName) {
        this.reportShortName = reportShortName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    @Override
    public String toString() {
        return "Report [id=" + reportId + ", Report_ShortName=" + reportShortName + ", Report_Name=" + reportName
                + "]";
    }
}
