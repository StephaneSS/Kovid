package com.tbd.kore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tbd.kore.model.ReportSched;

@Repository
public interface ScheduleRepository extends JpaRepository<ReportSched, Long> {

    List<ReportSched>  findByReportId(Long reportId);

    //boolean existsSchedId(Long reportId,Long schedId);

    //ReportSched findBySchedId(Long reportId,Long schedId);


}
