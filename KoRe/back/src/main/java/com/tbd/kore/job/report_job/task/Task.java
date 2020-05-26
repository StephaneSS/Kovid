package com.tbd.kore.job.report_job.task;

import com.tbd.kore.job.report_job.ReportJob;
import org.springframework.stereotype.Component;

@Component
public interface Task {

    void execute(ReportJob job) throws Exception;

}