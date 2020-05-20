package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.util.logging.FileHandler;
import java.util.logging.Logger;

public class SendResults extends Task {

    private static final Logger LOG = Logger.getLogger(String.valueOf(SendResults.class));

    private JobReport report;

    public SendResults(JobReport report, FileHandler logFile) {
        super(logFile);
        this.report = report;
    }

    @Override
    public void run() {
        writeOutput("START SEND RESULT STEP");
        writeOutput("END SEND RESULT STEP");
    }
}
