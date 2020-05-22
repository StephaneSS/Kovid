package com.tbd.kore.job.task;

import java.io.*;
import java.util.concurrent.CompletableFuture;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public abstract class Task implements Runnable {

    // TODO: use value
    private static boolean logExecutionToConsole = false;
    protected Logger execLog;
    protected final FileHandler fh;

    public Task(FileHandler logFile) {
        this.fh = logFile;
        this.execLog = Logger.getLogger(this.fh.toString());
        this.execLog.setUseParentHandlers(logExecutionToConsole);
        this.fh.setFormatter(new SimpleFormatter());
    }

    public CompletableFuture<Process> execCmd(String... args) throws IOException, InterruptedException {

        Process process = Runtime.getRuntime().exec(args);

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        writeOutput(reader);
        reader.close();

        if(process.waitFor() == 0){
            return process.onExit();
        } else {
            return CompletableFuture.failedFuture(new Exception("Bad exit value (not 0)"));
        }
    }

    public void writeOutput(BufferedReader reader) throws IOException {
        String line;
        while ((line = reader.readLine()) != null) {
            writeOutput(line);
        }
    }
    public void writeOutput(String text) {
        execLog.addHandler(fh);
        execLog.info(text);
        execLog.removeHandler(fh);
    }

}
