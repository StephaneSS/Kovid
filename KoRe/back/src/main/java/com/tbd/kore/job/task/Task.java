package com.tbd.kore.job.task;

import java.io.*;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Logger;

public abstract class Task implements Runnable {

    public final File logFile;

    public Task(File logFile) {
        this.logFile = logFile;
    }

    public static CompletableFuture<Integer> execCmd(BufferedWriter output, String... args) throws IOException {
        Process process = Runtime.getRuntime().exec(args);
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        writeOutput(output, reader);
        reader.close();
        if(process.exitValue() == 0){
            return CompletableFuture.completedFuture(process.exitValue());
        } else {
            return CompletableFuture.failedFuture(new Exception("Bad exit value (not 0)"));
        }
    }

    public static void writeOutput(BufferedWriter writer, BufferedReader reader) throws IOException {
        String readLine;
        while ((readLine = reader.readLine()) != null) {
            String line = String.format("%s - %s%n", new Timestamp(Calendar.getInstance().getTime().getTime()), readLine);
            writer.write(line);
        }
    }
    public static void writeOutput(BufferedWriter writer, String text) throws IOException {
            String line = String.format("%s - %s%n", new Timestamp(Calendar.getInstance().getTime().getTime()), text);
            writer.write(line);
    }

}
