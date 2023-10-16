package com.learner.AssignmentSubmissionApp.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.WebProperties.Resources.Chain;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.learner.AssignmentSubmissionApp.repository.UserRepository;
import com.learner.AssignmentSubmissionApp.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		//Get Authorization header and validate
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if(!StringUtils.hasText(header) || (StringUtils.hasText(header) && !header.startsWith("Bearer "))) {
			filterChain.doFilter(request,response);
			return;
		}
		
		//Token : AUTHORIZATION -> Bearer token-string
		final String token = header.split(" ")[1].trim();
		
		//get user details and set it on the spring security context
		UserDetails userDetails = userRepo.findByUsername(jwtUtil.getUsernameFromToken(token)).orElse(null);
				
		
		if(!jwtUtil.validateToken(token, userDetails)) {
			filterChain.doFilter(request,response);
			return;
		}
		
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					userDetails,null,userDetails == null ?
							List.of():userDetails.getAuthorities()
				);
		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		
		//this is where the authentication magic happens and the user is now valid!
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request,response);
		
		
	}
	

}
