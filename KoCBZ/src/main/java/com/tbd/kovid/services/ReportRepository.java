package com.tbd.kovid.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tbd.kovid.model.Report;

@Repository
@Transactional
public interface ReportRepository extends JpaRepository<Report, Long> {
	
    Report findByReportId(Long reportId);
	
    List<Report> listReports(Pageable pageable);
	

}
