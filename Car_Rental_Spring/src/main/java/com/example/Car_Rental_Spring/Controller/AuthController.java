package com.example.Car_Rental_Spring.Controller;


import com.example.Car_Rental_Spring.DTO.AuthenticationRequest;
import com.example.Car_Rental_Spring.DTO.AuthenticationResponse;
import com.example.Car_Rental_Spring.DTO.SignupRequest;
import com.example.Car_Rental_Spring.DTO.UserDto;
import com.example.Car_Rental_Spring.Entity.User;
import com.example.Car_Rental_Spring.Repository.UserRepository;
import com.example.Car_Rental_Spring.Service.auth.authService;
import com.example.Car_Rental_Spring.Service.auth.jwt.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/ht")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    private final UserRepository userRepository;


    private final authService AuthService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        System.out.println("Received SignupRequest: " + signupRequest);
        if (AuthService.hasCustomerWithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("Student already exist with this email", HttpStatus.NOT_ACCEPTABLE);
        UserDto createCustomerDto = AuthService.createCustomer(signupRequest);
        if (createCustomerDto == null)
            return new ResponseEntity<>("Student not created, Come again later", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(createCustomerDto, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password.");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()) {
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
            authenticationResponse.setEmail(optionalUser.get().getEmail());
        }
        return authenticationResponse;
    }


    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllStudents() {
        List<UserDto> students = AuthService.getAllStudents();
        return ResponseEntity.ok(students);
    }


    @GetMapping("/patients/{id}")
    public ResponseEntity<UserDto> getPatientById(@PathVariable String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new
                NoSuchElementException("User not found"));
        UserDto userDto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getNIC(),
                user.getDateOfBirth(),
                user.getUserRole()
        );
        return ResponseEntity.ok(userDto);
    }


}




