package com.tbd.kore.job.report_job;

import com.jcraft.jsch.Session;
import com.tbd.kore.model.Job;
import com.tbd.kore.model.report.ExecutionLog;

import java.util.logging.*;

public class ReportJob {

    private final Job report;
    private final Logger execLog;
    private final StreamHandler logHandler;
    private final ExecutionLog executionLog;
    private Session sshSession;

    public static void logFormat(String format){
        System.setProperty("java.util.logging.SimpleFormatter.format", format);
    }

    public ReportJob(Job report, StreamHandler logHandler, Boolean displayLogInConsole) {
        this.report = report;
        this.executionLog = new ExecutionLog();

        this.logHandler = logHandler;
        this.logHandler.setFormatter(new SimpleFormatter());

        this.execLog = Logger.getLogger(this.logHandler.toString());
        this.execLog.setUseParentHandlers(displayLogInConsole);
    }

    public void log(String data) {
        execLog.addHandler(logHandler);
        execLog.info(data);
        execLog.removeHandler(logHandler);
    }

    public void log(Level level, String data, Throwable throwable) {
        execLog.addHandler(logHandler);
        execLog.log(level, data, throwable);
        execLog.removeHandler(logHandler);
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
