package com.tbd.kore.job.report_job.task;

import com.tbd.kore.job.report_job.ReportJob;
import com.tbd.kore.service.RemoteTaskService;
import org.springframework.stereotype.Component;

@Component
public class GenerateReport implements Task {

    @Override
    public void execute(ReportJob job) throws Exception {
        job.log("START Report Generation Task");
        int exit = RemoteTaskService.executeCommand(job.getSshSession(), "./test/a.sh 3", job::log);
        if(exit != 0){
            throw new Exception("The report generation did not finish properly");
        }
        job.log("END Report Generation Task");
    }

}
