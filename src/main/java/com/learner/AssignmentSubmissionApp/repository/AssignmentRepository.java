package com.learner.AssignmentSubmissionApp.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learner.AssignmentSubmissionApp.Entity.Assignment;
import com.learner.AssignmentSubmissionApp.Entity.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
	Set<Assignment> findByUser(User user);
}
