package com.inventorymanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret:your_jwt_secret_key_here_make_it_very_long_and_secure}")
    private String jwtSecret;

    @Value("${jwt.expiration:3600000}")
    private long jwtExpirationMs;

    public String generateToken(String userId) {
        SecretKey key = getSigningKey();
        return Jwts.builder()
                .claim("user", new UserIdClaim(userId))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generatePasswordResetToken(String userId) {
        SecretKey key = getSigningKey();
        return Jwts.builder()
                .claim("id", userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 600000)) // 10 minutes
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            getSigningKey();
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        
        Object userObj = claims.get("user");
        if (userObj instanceof java.util.Map) {
            @SuppressWarnings("unchecked")
            java.util.Map<String, String> userMap = (java.util.Map<String, String>) userObj;
            return userMap.get("id");
        }
        return null;
    }

    public String getUserIdFromPasswordResetToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get("id", String.class);
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Inner class to match the JWT structure
    public static class UserIdClaim {
        public String id;

        public UserIdClaim(String id) {
            this.id = id;
        }

        public String getId() {
            return id;
        }
    }
}
