package com.example.Car_Rental_Spring.DTO;


import com.example.Car_Rental_Spring.Enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private String email;
    private UserRole userRole;

    private String userId;


}
