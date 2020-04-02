package com.tbd.kovid.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.tbd.kovid.model.ReportArguments;

@Repository
@Transactional
public interface ReportArgRepository extends JpaRepository<ReportArguments, Long> {
	
	ReportArguments findByReportId(Long reportId);
	


}
