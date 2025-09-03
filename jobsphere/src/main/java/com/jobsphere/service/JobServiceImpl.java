package com.jobsphere.service;

import com.jobsphere.model.Job;
import com.jobsphere.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository repository;

    @Autowired
    public JobServiceImpl(JobRepository repository) {
        this.repository = repository;
    }

    @Override
    public Job create(Job job) {
        if (job.getPostedAt() == null) job.setPostedAt(Instant.now());
        return repository.save(job);
    }

    @Override
    public List<Job> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Job> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public Job update(String id, Job job) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(job.getTitle());
            existing.setCompany(job.getCompany());
            existing.setLocation(job.getLocation());
            existing.setDescription(job.getDescription());
            existing.setExperience(job.getExperience());       
            existing.setTechnologies(job.getTechnologies());   
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }

   
   
}
