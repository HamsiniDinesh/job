package com.jobsphere.controller;

import com.jobsphere.model.Job;
import com.jobsphere.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    
    @GetMapping
    public List<Job> getAll() {
        return jobService.findAll();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Job> getById(@PathVariable String id) {
        return jobService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Job> create(@RequestBody Job job) {
        job.setPostedAt(Instant.now()); 
        Job created = jobService.create(job);
        return ResponseEntity.created(URI.create("/api/jobs/" + created.getId())).body(created);
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<Job> update(@PathVariable String id, @RequestBody Job job) {
        try {
            Job updated = jobService.update(id, job);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        jobService.delete(id);
        return ResponseEntity.noContent().build();
    }
   
}
