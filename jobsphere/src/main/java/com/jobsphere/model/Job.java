package com.jobsphere.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "jobs")
public class Job {

    @Id
    private String id;
    private String title;
    private String company;
    private String location;
    private String description;
    private int experience; 
    private List<String> technologies; 
    private Instant postedAt = Instant.now();
}
