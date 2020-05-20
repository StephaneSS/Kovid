package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.io.*;
import java.util.logging.Logger;

public class PerformPostProcesses extends Task {

    private static final Logger LOG = Logger.getLogger(String.valueOf(PerformPostProcesses.class));

    private JobReport report;

    public PerformPostProcesses(JobReport report, File logFile) {
        super(logFile);
        this.report = report;
    }

    @Override
    public void run() {
        try (BufferedWriter output = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(logFile, true)))){
            writeOutput(output, "START POST PROCESSES STEP");
            writeOutput(output, "END POST PROCESSES STEP");
        } catch (IOException e) {
            LOG.severe("error while executing post processes steps");
        }
    }
}
