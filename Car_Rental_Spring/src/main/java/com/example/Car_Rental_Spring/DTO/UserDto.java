package com.example.Car_Rental_Spring.DTO;


import com.example.Car_Rental_Spring.Enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;

    private String name;

    private String email;

    private String NIC;

    private Date DateOfBirth;

    private UserRole userrole;

}
