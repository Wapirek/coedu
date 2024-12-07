package dev.norka.codedu.controller;

import dev.norka.codedu.entity.User;
import dev.norka.codedu.repository.UserRepository;
import dev.norka.codedu.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login and generate JWT token
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT Token
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok().body("Bearer " + token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }
    }

    // Logout (for JWT, clearing context is sufficient for client-side logout)
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully.");
    }

    // Utility to get logged-in user data
    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    public String getLoggedInUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

}
