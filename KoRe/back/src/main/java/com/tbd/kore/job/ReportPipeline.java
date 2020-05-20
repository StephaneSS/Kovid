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
import java.util.logging.Logger;

public class ReportPipeline{

    private static final Logger LOG = Logger.getLogger(String.valueOf(ReportPipeline.class));

    final JobReport report;
    private Timestamp startDate;
    private Timestamp endDate;
    private File logFile;

    public ReportPipeline(JobReport report) {
        this.report = report;
        setStartDate().run();
        this.logFile = new File(String.format("kore.scheduled_task.%s.%s.%s.log", report.getId(),report.getSchedule().getId(), startDate));
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
