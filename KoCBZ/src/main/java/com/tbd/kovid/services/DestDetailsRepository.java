package com.tbd.kovid.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.tbd.kovid.model.DestDetails;

@Repository
@Transactional
public interface DestDetailsRepository extends JpaRepository<DestDetails, Long> {
	
	DestDetails findByReportId(Long reportId);
	
    List<DestDetails> listDestDetails(Pageable pageable);
	

}
