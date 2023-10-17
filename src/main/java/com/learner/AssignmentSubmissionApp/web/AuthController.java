package com.learner.AssignmentSubmissionApp.web;



import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learner.AssignmentSubmissionApp.Entity.User;
import com.learner.AssignmentSubmissionApp.dto.AuthCredentialRequest;
import com.learner.AssignmentSubmissionApp.util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;



@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthCredentialRequest request){
		try {
			Authentication authenticate = authManager.
					authenticate(
							new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()
									)
							);
			User user = (User)authenticate.getPrincipal();
			
			return (ResponseEntity<?>) ResponseEntity.ok().header(
					HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(user))
					.body(user);
		}catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			
		}
	}
	
	@GetMapping("/validate")
	public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user){
	 try {
		Boolean isTokenValid =	jwtUtil.validateToken(token,user);
		return ResponseEntity.ok(isTokenValid);
	 }catch (ExpiredJwtException e) {
		return ResponseEntity.ok(false);
	}
	 
	}

}
