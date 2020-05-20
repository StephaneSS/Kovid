package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.util.logging.Logger;

public class SendResults extends Task {

    private static final Logger LOG = Logger.getLogger(String.valueOf(SendResults.class));

    private JobReport report;

    public SendResults(JobReport report) {
        this.report = report;
    }

    @Override
    public void run() {
        LOG.info(String.format(" - schedule #%d: Send Results", report.getSchedule().getId()));
    }
}
