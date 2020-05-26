package com.tbd.kore.job.report_job.task;

import com.tbd.kore.job.report_job.ReportJob;
import org.springframework.stereotype.Component;

@Component
public class PerformPostProcesses implements Task {

    @Override
    public void execute(ReportJob job) {
        job.log("START Post Processes Task");
        job.log("END Post Processes Task");
    }
}
