package com.example.Car_Rental_Spring.DTO;


import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;

}
