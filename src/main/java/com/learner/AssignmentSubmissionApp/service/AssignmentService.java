package com.learner.AssignmentSubmissionApp.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.learner.AssignmentSubmissionApp.Entity.Assignment;
import com.learner.AssignmentSubmissionApp.Entity.User;
import com.learner.AssignmentSubmissionApp.repository.AssignmentRepository;

@Service
public class AssignmentService {
	
	@Autowired
	AssignmentRepository assignmentRepo;

	public Assignment save(User user) {
		Assignment assignment = new Assignment();
		assignment.setStatus("New: yet to submit");
		assignment.setUser(user);
		return assignmentRepo.save(assignment);
		
		
	}
	
	public Set<Assignment> findByUser(User user){
		return assignmentRepo.findByUser(user);
	}

	public Optional<Assignment> findById(Long assignmentId) {
		return assignmentRepo.findById(assignmentId);
	}

	

	public Assignment save(Assignment assignment) {
		return assignmentRepo.save(assignment);
	}

	
	
	

}
