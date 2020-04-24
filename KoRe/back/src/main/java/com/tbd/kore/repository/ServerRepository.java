package com.tbd.kore.repository;

import com.tbd.kore.model.ServerConnexion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepository extends JpaRepository<ServerConnexion, Long> {

    @Override
    List<ServerConnexion> findAll();

}
