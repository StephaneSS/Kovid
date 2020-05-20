package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.util.logging.Logger;

public class PerformPostProcesses extends Task {

    private static final Logger LOG = Logger.getLogger(String.valueOf(PerformPostProcesses.class));

    private JobReport report;

    public PerformPostProcesses(JobReport report) {
        this.report = report;
    }

    @Override
    public void run() {
        LOG.info(String.format(" - schedule #%d: Perform Post Processes", report.getSchedule().getId()));
    }
}
