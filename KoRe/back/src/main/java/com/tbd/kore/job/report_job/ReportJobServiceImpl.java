package com.tbd.kore.job.report_job;

import com.jcraft.jsch.JSchException;
import com.tbd.kore.job.JobService;
import com.tbd.kore.job.report_job.task.PerformPostProcesses;
import com.tbd.kore.job.report_job.task.GenerateReport;
import com.tbd.kore.job.report_job.task.SendResults;
import com.tbd.kore.service.RemoteTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.logging.Level;

@Service
public class ReportJobServiceImpl implements JobService<ReportJob> {

    @Autowired
    private GenerateReport reportGeneration;

    @Autowired
    private PerformPostProcesses postProcesses;

    @Autowired
    private SendResults sendResults;

    @Override
    public CompletableFuture<ReportJob> execute(ReportJob job) {
        return CompletableFuture
            // Pre steps
                .runAsync(() -> job.getExecutionLog().setStartDate(Timestamp.from(Instant.now())))
                .thenRun(() -> job.getExecutionLog().setEnvironment(job.getReport().getSchedule().getEnvironment()))
                .thenRun(() -> job.log("START job" + job.getReport().getSchedule().getId()))
                .thenRun(() -> {
                    try { job.setSshSession(RemoteTaskService.openSession("", "localhost", 22, Optional.empty()));}
                    catch (JSchException e) { throw new CompletionException(e); }
                })
            // main steps
                .thenRun(() -> {
                    try { reportGeneration.execute(job); }
                    catch (Exception e) { throw new CompletionException(e); }
                })
                .thenRun(() -> {
                    try { postProcesses.execute(job); }
                    catch (Exception e) { throw new CompletionException(e); }
                })
                .thenRun(() -> {
                    try { sendResults.execute(job); }
                    catch (Exception e) { throw new CompletionException(e); }
                })
            // Post steps
                .whenComplete((result, exception) -> RemoteTaskService.closeSession(job.getSshSession()))
                .whenComplete((result, exception) -> job.getExecutionLog().setEndDate(Timestamp.from(Instant.now())))
                .whenComplete((result, exception) -> job.getExecutionLog().setStatus("OK"))
                .exceptionally( exception -> {
                    job.log(Level.SEVERE,"Error while executing report #"+job.getReport().getId()+": "+exception.getMessage(),exception);
                    job.log("Abort execution");
                    job.getExecutionLog().setStatus("KO");
                    return null;
                })
                .whenComplete((result, exception) -> job.log("END job" + job.getReport().getSchedule().getId()))
                .thenApply( val -> job);
    }
}
