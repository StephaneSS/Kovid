package com.tbd.kovid.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tbd.kovid.model.ReportDestination;


@Repository
@Transactional
public interface ReportDestinationRepository extends JpaRepository<ReportDestination, Long> {
	
	 ReportDestination  findByReportId(Long reportId);
	
	
}
