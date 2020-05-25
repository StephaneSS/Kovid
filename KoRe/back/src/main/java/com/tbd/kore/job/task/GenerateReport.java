package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.io.*;
import java.util.logging.FileHandler;
import java.util.logging.Logger;

public class GenerateReport extends Task{

    private static final Logger LOG = Logger.getLogger(String.valueOf(GenerateReport.class));

    private JobReport report;

    public GenerateReport(JobReport report, FileHandler logFile) {
        super(logFile);
        this.report = report;
    }

    boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");

    @Override
    public void run() {
        writeOutput("START REPORT GENERATION STEP");
        try {
            execCmd( "./test.sh");
        } catch (IOException e) {
            LOG.info("error while generating report");
        } catch (InterruptedException e) {
            LOG.info("process interrupted");
        }
        writeOutput("END REPORT GENERATION STEP");
    }


}
