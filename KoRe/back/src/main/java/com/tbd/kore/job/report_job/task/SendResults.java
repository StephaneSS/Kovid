package com.tbd.kore.job.report_job.task;

import com.tbd.kore.job.report_job.ReportJob;
import org.springframework.stereotype.Component;

@Component
public class SendResults implements Task {

    @Override
    public void execute(ReportJob job) {
        job.log("START Send Results Task");
        job.log("END Send Results Task");
    }
}
