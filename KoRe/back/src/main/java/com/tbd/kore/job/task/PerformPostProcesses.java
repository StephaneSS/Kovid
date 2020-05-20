package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.util.logging.FileHandler;
import java.util.logging.Logger;

public class PerformPostProcesses extends Task {

    private static final Logger LOG = Logger.getLogger(String.valueOf(PerformPostProcesses.class));

    private JobReport report;

    public PerformPostProcesses(JobReport report, FileHandler logFile) {
        super(logFile);
        this.report = report;
    }

    @Override
    public void run() {
        writeOutput("START POST PROCESSES STEP");
        writeOutput("END POST PROCESSES STEP");
    }
}
