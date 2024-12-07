package com.example.Car_Rental_Spring.Service.auth;

import com.example.Car_Rental_Spring.DTO.SignupRequest;
import com.example.Car_Rental_Spring.DTO.UserDto;
import com.example.Car_Rental_Spring.Entity.User;
import com.example.Car_Rental_Spring.Enums.UserRole;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface authService {

    static UserDetails loadUserByUsername(String username) {
        return null;
    }

    UserDto createCustomer(SignupRequest signupRequest);
    boolean hasCustomerWithEmail(String email);

    List<UserDto> getAllStudents();
}
