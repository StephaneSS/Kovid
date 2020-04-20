package com.tbd.kore.repository;

import java.util.Optional;

import com.tbd.kore.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    Optional<Report> findById(Long reportId);
}
