package com.tbd.kore.repository;

import com.tbd.kore.model.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepository extends JpaRepository<Server, Long> {

    @Override
    List<Server> findAll();

}
