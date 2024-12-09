package com.example.Car_Rental_Spring.Repository;

import com.example.Car_Rental_Spring.Entity.User;
import com.example.Car_Rental_Spring.Enums.UserRole;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);

    List<User> findByUserRole(UserRole userRole);

}
