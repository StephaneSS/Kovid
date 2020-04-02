package com.tbd.kovid.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.tbd.kovid.model.ReportExecution;


@Repository
@Transactional
public interface ReportExecutionRepository extends JpaRepository<ReportExecution, Long> {
	
	 ReportExecution  findByReportId(Long reportId);
	

}
