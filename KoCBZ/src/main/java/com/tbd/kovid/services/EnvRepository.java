package com.tbd.kovid.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.tbd.kovid.model.Environment;

@Repository
@Transactional
public interface EnvRepository extends JpaRepository<Environment, Long> {
	
	Environment findByEnvironmentId(Long envId);
	
    List<Environment> listEnvironments(Pageable pageable);
	

}
