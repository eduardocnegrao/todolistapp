package com.integritastech.todolist;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.integritastech.todolist.domain.Task;
import com.integritastech.todolist.domain.repository.TaskRepository;

@SpringBootApplication
@EnableJpaRepositories
public class Application implements CommandLineRunner {

    @Autowired
    TaskRepository repository;
	
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

	@Override
	public void run(String... arg0) throws Exception {
		
		 Task parent = repository.save(new Task("Project Planning"));
		 repository.save(new Task("Study Spring Boot", parent));
		 repository.save(new Task("Study Spring MVC", parent));
		 repository.save(new Task("Create Project Code Snippet", parent));
		 repository.save(new Task("Test Project Code Snippet", parent));
		 
		 parent = repository.save(new Task("Project Development"));
		 repository.save(parent);
	}
}