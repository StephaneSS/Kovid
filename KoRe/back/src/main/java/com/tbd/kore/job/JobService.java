package com.tbd.kore.job;

import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public interface JobService<T> {

    CompletableFuture<T> execute(T job);

}
