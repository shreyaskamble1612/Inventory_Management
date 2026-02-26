package com.inventorymanagement.services;

import com.inventorymanagement.models.User;
import com.inventorymanagement.repositories.UserRepository;
import com.inventorymanagement.security.JwtTokenProvider;
import com.inventorymanagement.utils.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private EmailSender emailSender;

    @Value("${app.client.url:http://localhost:5173}")
    private String clientUrl;

    public User registerUser(String name, String email, String phoneNo, String password) throws Exception {
        // Check if user already exists
        if (userRepository.existsByEmail(email)) {
            throw new Exception("User already exists");
        }

        // Validate input
        if (name == null || name.length() < 5 || name.length() > 30) {
            throw new IllegalArgumentException("Name must be between 5 and 30 characters");
        }
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(password);

        // Create user
        User user = new User(name, email, phoneNo, hashedPassword);
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid Password");
        }

        return user;
    }

    public User getUserById(String userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("User not found");
        }
        return user.get();
    }

    public User updateUser(String userId, String name, String email, String phoneNo) throws Exception {
        User user = getUserById(userId);

        if (name != null && !name.isEmpty()) {
            user.setName(name);
        }
        if (email != null && !email.isEmpty()) {
            user.setEmail(email);
        }
        if (phoneNo != null && !phoneNo.isEmpty()) {
            user.setPhoneNo(phoneNo);
        }

        return userRepository.save(user);
    }

    public void deleteUser(String userId) throws Exception {
        if (!userRepository.existsById(userId)) {
            throw new Exception("User not found");
        }
        userRepository.deleteById(userId);
    }

    public void initiatePasswordReset(String email) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }

        User user = userOptional.get();
        String resetToken = tokenProvider.generatePasswordResetToken(user.getId());
        
        user.setResetToken(resetToken);
        user.setResetTokenExpire(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        String resetLink = clientUrl + "/resete-password/" + resetToken;
        String htmlContent = "<p>Click <a href=\"" + resetLink + "\">here</a> to reset your password. The link is valid for 10 minutes</p>";
        
        try {
            emailSender.sendHtmlEmail(user.getEmail(), "Password Reset", htmlContent);
        } catch (MessagingException e) {
            throw new Exception("Failed to send reset email: " + e.getMessage());
        }
    }

    public void resetPassword(String token, String newPassword) throws Exception {
        String userId = tokenProvider.getUserIdFromPasswordResetToken(token);
        
        if (userId == null) {
            throw new Exception("Invalid or expired token");
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }

        User user = userOptional.get();
        
        if (user.getResetToken() == null || !user.getResetToken().equals(token) || 
            user.getResetTokenExpire() == null || user.getResetTokenExpire().isBefore(LocalDateTime.now())) {
            throw new Exception("Invalid or expired token");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpire(null);
        userRepository.save(user);
    }
}
