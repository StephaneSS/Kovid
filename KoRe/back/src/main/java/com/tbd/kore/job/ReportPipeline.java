package com.tbd.kore.job;

import com.tbd.kore.job.task.GenerateReport;
import com.tbd.kore.job.task.PerformPostProcesses;
import com.tbd.kore.job.task.SendResults;
import com.tbd.kore.model.JobReport;
import com.tbd.kore.model.report.ExecutionLog;

import java.io.*;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.concurrent.CompletableFuture;
import java.util.logging.FileHandler;
import java.util.logging.Logger;

public class ReportPipeline{

    private static final Logger LOG = Logger.getLogger(String.valueOf(ReportPipeline.class));

    // TODO: use @Value
    private final static String LOG_DIRECTORY = "./execLogs";

    final JobReport report;
    private Timestamp startDate;
    private Timestamp endDate;
    private FileHandler logFile;

    public ReportPipeline(JobReport report) {
        this.report = report;
        setStartDate().run();
        try {
            File logDirectory = new File(LOG_DIRECTORY);
            File file = new File(String.format("%s/kore.scheduled_task.%s.%s.%s.log", logDirectory.getAbsolutePath(), report.getId(),report.getSchedule().getId(), startDate));
            if(!logDirectory.exists()){
                logDirectory.mkdirs();
            }
            this.logFile = new FileHandler(file.getAbsolutePath(),true);
        } catch (IOException e) {
            LOG.warning("Cannot instantiate log file");
        }
    }

    public CompletableFuture<Void> getPipeline() {
        return CompletableFuture
                .runAsync(() -> LOG.info(String.format("Start schedule #%d", this.report.getSchedule().getId())))
                .thenRun(setStartDate())
                .thenRun(new GenerateReport(report, logFile))
                .thenRun(new PerformPostProcesses(report, logFile))
                .thenRun(new SendResults(report, logFile))
                .thenRun(setEndDate())
                .thenRun(() -> LOG.info(String.format("End schedule #%d", report.getSchedule().getId())));

    }

    public ExecutionLog getExecutionInfo() {
            ExecutionLog execution = new ExecutionLog();
            execution.setStartDate(this.startDate);
            execution.setEndDate(this.endDate);
            execution.setEnvironment(this.report.getSchedule().getEnvironment());
            execution.setStatus("OK");
            return execution;
    }

    private Runnable setStartDate(){
        return () -> this.startDate = new Timestamp(Calendar.getInstance().getTime().getTime());
    }

    private Runnable setEndDate(){
        return () ->this.endDate = new Timestamp(Calendar.getInstance().getTime().getTime());
    }

    public JobReport getReport() {
        return report;
    }
}
