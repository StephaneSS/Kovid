package com.tbd.kore.service;

import com.tbd.kore.model.report.Report;
import com.tbd.kore.model.report.ReportSimple;

import java.util.List;
import java.util.Optional;

public interface ReportService {

    List<ReportSimple> getAllSimple();

    Optional<Report> getById(Long id);

    Report add(Report report);

    Optional<Report> updateById(Long id, Report report);

    Optional<Report> deleteById(Long id);
}
