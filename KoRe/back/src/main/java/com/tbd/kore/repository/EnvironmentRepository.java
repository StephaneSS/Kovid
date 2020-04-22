package com.tbd.kore.repository;

import com.tbd.kore.model.report.Environment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnvironmentRepository extends JpaRepository<Environment, Long> {

    @Override
    List<Environment> findAll();


}
