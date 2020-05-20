package com.tbd.kore.job.task;

import com.tbd.kore.model.JobReport;

import java.io.*;
import java.util.logging.Logger;

public class GenerateReport extends Task{

    private static final Logger LOG = Logger.getLogger(String.valueOf(GenerateReport.class));

    private JobReport report;

    public GenerateReport(JobReport report, File logFile) {
        super(logFile);
        this.report = report;
    }

    boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");

    @Override
    public void run() {
        try (BufferedWriter output = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(logFile, true)))){
            writeOutput(output, "START REPORT GENERATION STEP");
            execCmd(output, "date","+%H:%M:%Sk").join();
            writeOutput(output, "END REPORT GENERATION STEP");
        } catch (IOException e) {
            LOG.severe("error while generating report");
        }
    }

}
