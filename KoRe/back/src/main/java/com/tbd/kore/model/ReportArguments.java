package com.tbd.kore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ReportArguments")
public class ReportArguments {

    public enum ArgumentType {
        STRING, NUMBER, DYNAMIC_DATE
    }

    @Column(name = "Report_Id", nullable = false)
    private long reportId;

    @Id
    @Column(name = "Argument_Id", nullable = false)
    private int argumentId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "Argument_Type", nullable = false)
    private ArgumentType argumentType;

    @Column(name = "Argument_Key", nullable = false)
    private String argumentKey;

    @Column(name = "Argument_Value", nullable = false)
    private String argumentValue;

    public ReportArguments(long reportId, int argumentId, String argumentKey, String argumentValue, ArgumentType argumentType) {

        this.reportId = reportId;
        this.argumentId = argumentId;
        this.argumentKey = argumentKey;
        this.argumentValue = argumentValue;
        this.argumentType = argumentType;
    }

    public long getReportId() {
        return reportId;
    }

    public int getArgumentId() {
        return argumentId;
    }

    public ArgumentType getArgumentType() {
        return argumentType;
    }

    public String getArgumentKey() {
        return argumentKey;
    }

    public String getArgumentValue() {
        return argumentValue;
    }

    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public void setArgumentId(int argumentId) {
        this.argumentId = argumentId;
    }

    public void setArgumentType(ArgumentType argumentType) {
        this.argumentType = argumentType;
    }

    public void setArgumentKey(String argumentKey) {
        this.argumentKey = argumentKey;
    }

    public void setArgumentValue(String argumentValue) {
        this.argumentValue = argumentValue;
    }
}
