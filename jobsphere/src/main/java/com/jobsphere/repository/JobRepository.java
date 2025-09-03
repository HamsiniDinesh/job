package com.jobsphere.repository;

import com.jobsphere.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {

    
    List<Job> findByCompanyIgnoreCase(String company);

   
    List<Job> findByExperienceContainingIgnoreCase(String experience);

   
    List<Job> findByTechnologiesContainingIgnoreCase(String technology);
   

}
