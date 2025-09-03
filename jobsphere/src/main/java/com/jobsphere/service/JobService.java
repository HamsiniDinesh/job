package com.jobsphere.service;

import com.jobsphere.model.Job;

import java.util.List;
import java.util.Optional;

public interface JobService {
    Job create(Job job);
    List<Job> findAll();
    Optional<Job> findById(String id);
    Job update(String id, Job job);
    void delete(String id);

}
