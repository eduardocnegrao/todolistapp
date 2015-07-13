package com.integritastech.todolist.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.integritastech.todolist.domain.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {

	@Query("select t from Task t where t.parent = null")
	List<Task> findAllParents();
	
	@Query("select t from Task t where t.parent.id = ?#{[0]}")
	List<Task> findByParent(Long parentId);
}
