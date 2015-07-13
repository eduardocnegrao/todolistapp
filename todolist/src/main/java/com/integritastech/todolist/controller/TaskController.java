package com.integritastech.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.integritastech.todolist.domain.Task;
import com.integritastech.todolist.domain.repository.TaskRepository;

@RestController
public class TaskController {

	@Autowired
    TaskRepository repository;
	
	@RequestMapping("/task-list")
	List<Task> getPrimaryTaskList() {
		
		List<Task> tasks = repository.findAllParents();
		return tasks;
	}
	
	@RequestMapping("/task-details")
	List<Task> getDetails(@RequestParam(value="idTask") Long idTask) {
		
		List<Task> tasks = repository.findByParent(idTask);
		return tasks;
	}
	
	@RequestMapping("/save-new-task")
	void save(@RequestBody Task task) {
		
		repository.save(task);
	}
	
	@RequestMapping("/update-task")
	void update(@RequestBody Task task) {
		
		repository.save(task);
	}
	
	@RequestMapping("/delete-task")
	void delete(@RequestBody Task task) {
		
		List<Task> children = getDetails(task.getId());
		
		if (children != null && !children.isEmpty()) {
			
			repository.delete(children);
		}
		
		repository.delete(task);
	}
}
