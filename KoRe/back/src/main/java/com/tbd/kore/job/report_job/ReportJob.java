package com.tbd.kore.job.report_job;

import com.jcraft.jsch.Session;
import com.tbd.kore.model.Job;
import com.tbd.kore.model.report.ExecutionLog;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class ReportJob {

    private final Job report;
    private final Logger execLog;
    private final FileHandler logFileHandler;
    private final ExecutionLog executionLog;
    private Session sshSession;

    public static void logFormat(String format){
        System.setProperty("java.util.logging.SimpleFormatter.format", format);
    }

    public ReportJob(Job report, FileHandler logFileHandler, Boolean displayLogInConsole) {
        this.report = report;
        this.executionLog = new ExecutionLog();

        this.logFileHandler = logFileHandler;
        this.logFileHandler.setFormatter(new SimpleFormatter());

        this.execLog = Logger.getLogger(this.logFileHandler.toString());
        this.execLog.setUseParentHandlers(displayLogInConsole);
    }

    public void log(String data) {
        execLog.addHandler(logFileHandler);
        execLog.info(data);
        execLog.removeHandler(logFileHandler);
    }

    public void log(Level level, String data, Throwable throwable) {
        execLog.addHandler(logFileHandler);
        execLog.log(level, data, throwable);
        execLog.removeHandler(logFileHandler);
    }


    public void setSshSession(Session sshSession) {
        this.sshSession = sshSession;
    }

    public Session getSshSession() {
        return sshSession;
    }

    public Job getReport() {
        return report;
    }

    public ExecutionLog getExecutionLog() { return executionLog; }

}
