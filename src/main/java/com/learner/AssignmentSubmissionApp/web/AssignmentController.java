package com.learner.AssignmentSubmissionApp.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learner.AssignmentSubmissionApp.Entity.Assignment;
import com.learner.AssignmentSubmissionApp.Entity.User;
import com.learner.AssignmentSubmissionApp.service.AssignmentService;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
	
	@Autowired
	private AssignmentService assignmentService;
	
	@PostMapping("")
	public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){
		Assignment newAssignment = assignmentService.save(user);
		return ResponseEntity.ok(newAssignment);
		
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
		Set<Assignment> AssignmentsByUser = assignmentService.findByUser(user);
		return ResponseEntity.ok(AssignmentsByUser);
	}
	
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId,@AuthenticationPrincipal User user){
		Optional<Assignment> assignmentById = assignmentService.findById(assignmentId);
		return ResponseEntity.ok(assignmentById.orElse(new Assignment()));
		
	}
	
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
			@RequestBody Assignment assignment,
			@AuthenticationPrincipal User user){
		Assignment updatedAssignment = assignmentService.save(assignment);
		return ResponseEntity.ok(updatedAssignment);
	}
}
		
	


