package com.tbd.kore.repository;

import java.util.List;
import java.util.Optional;

import com.tbd.kore.model.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Override
    List<Report> findAll();

    @Override
    Optional<Report> findById(Long id);

    @Override
    boolean existsById(Long aLong);

    @Override
    void deleteById(Long id);

    @Override
    Report save(Report s);

}
