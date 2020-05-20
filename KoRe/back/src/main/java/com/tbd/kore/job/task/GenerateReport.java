package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.util.logging.Logger;

public class GenerateReport extends Task{

    private static final Logger LOG = Logger.getLogger(String.valueOf(GenerateReport.class));

    private JobReport report;

    public GenerateReport(JobReport report) {
        this.report = report;
    }

    @Override
    public void run() {
        LOG.info(String.format(" - schedule #%d: generate report", report.getSchedule().getId()));
    }
}
