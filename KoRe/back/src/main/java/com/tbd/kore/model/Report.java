package com.tbd.kore.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReportSched> schedules = new ArrayList<>();
/*
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReportArguments> arguments = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReportDestination> destinations = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReportExecution> executions = new ArrayList<>();
*/
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

    public List<ReportSched> getSchedules() {
        return schedules;
    }
/*
    public List<ReportArguments> getArguments() {
        return arguments;
    }

    public List<ReportExecution> getExecutions() {
        return executions;
    }

    public List<ReportDestination> getDestinations() {
        return destinations;
    }
*/
    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public void setReportShortName(String reportShortName) {
        this.reportShortName = reportShortName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public void setSchedules(List<ReportSched> schedules) {
        this.schedules = schedules;
    }
/*
    public void setDestinations(List<ReportDestination> destinations) {
        this.destinations = destinations;
    }

    public void setExecutions(List<ReportExecution> executions) {
        this.executions = executions;
    }

    public void setArguments(List<ReportArguments> arguments) {
        this.arguments = arguments;
    }
*/
    @Override
    public String toString() {
        return "Report [id=" + reportId + ", Report_ShortName=" + reportShortName + ", Report_Name=" + reportName
                + "]";
    }
}
