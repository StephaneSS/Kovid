package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.io.*;
import java.util.logging.Logger;

public class SendResults extends Task {

    private static final Logger LOG = Logger.getLogger(String.valueOf(SendResults.class));

    private JobReport report;

    public SendResults(JobReport report, File logFile) {
        super(logFile);
        this.report = report;
    }

    @Override
    public void run() {
        try (BufferedWriter output = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(logFile, true)))){
            writeOutput(output, "START SEND RESULT STEP");
            writeOutput(output, "END SEND RESULT STEP");
        } catch (IOException e) {
            LOG.severe("error while executing send result step");
        }
    }
}
