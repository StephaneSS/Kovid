package com.tbd.kovid.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.tbd.kovid.model.ReportSched;

@Repository
@Transactional
public interface ReportSchedRepository extends JpaRepository<ReportSched, Long> {
	
	 List<ReportSched>  findByReportId(Long reportId);
	
	 boolean existsSchedId(Long reportId,Long schedId);
	 
	 ReportSched findBySchedId(Long reportId,Long schedId);
	

}
