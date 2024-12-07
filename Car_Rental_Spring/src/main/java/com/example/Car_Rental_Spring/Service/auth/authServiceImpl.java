package com.example.Car_Rental_Spring.Service.auth;


import com.example.Car_Rental_Spring.DTO.SignupRequest;
import com.example.Car_Rental_Spring.DTO.UserDto;
import com.example.Car_Rental_Spring.Entity.User;
import com.example.Car_Rental_Spring.Enums.UserRole;
import com.example.Car_Rental_Spring.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class authServiceImpl implements authService {

    private final UserRepository userRepository;

    @PostConstruct
    public void createDefaultAccounts() {
        createAdminAccount();
        createPharmacistAccount();
        createReceptionistAccount();
    }

    private void createAdminAccount() {
        User adminAccount = userRepository.findByUserRole(UserRole.ROLE_Admin).stream().findFirst().orElse(null);
        if (adminAccount == null) {
            User newAdminAccount = new User();
            newAdminAccount.setName("Admin");
            newAdminAccount.setEmail("akash@admin.com");
            newAdminAccount.setPassword(new BCryptPasswordEncoder().encode("akash"));
            newAdminAccount.setUserRole(UserRole.ROLE_Admin);
            userRepository.save(newAdminAccount);
            System.out.println("Admin account created successfully");
        } else {
            adminAccount.setEmail("akash@admin.com");
            adminAccount.setPassword(new BCryptPasswordEncoder().encode("akash"));
            userRepository.save(adminAccount);
            System.out.println("Admin account updated successfully");
        }
    }

    private void createPharmacistAccount() {
        User pharmacistAccount = userRepository.findByUserRole(UserRole.ROLE_Pharmacist).stream().findFirst().orElse(null);
        if (pharmacistAccount == null) {
            User newPharmacistAccount = new User();
            newPharmacistAccount.setName("Pharmacist");
            newPharmacistAccount.setEmail("pharmacist@example.com");
            newPharmacistAccount.setPassword(new BCryptPasswordEncoder().encode("pharmacist"));
            newPharmacistAccount.setUserRole(UserRole.ROLE_Pharmacist);
            userRepository.save(newPharmacistAccount);
            System.out.println("Pharmacist account created successfully");
        } else {
            pharmacistAccount.setEmail("pharmacist@example.com");
            pharmacistAccount.setPassword(new BCryptPasswordEncoder().encode("pharmacist"));
            userRepository.save(pharmacistAccount);
            System.out.println("Pharmacist account updated successfully");
        }
    }

    private void createReceptionistAccount() {
        User receptionistAccount = userRepository.findByUserRole(UserRole.ROLE_Receptionist).stream().findFirst().orElse(null);
        if (receptionistAccount == null) {
            User newReceptionistAccount = new User();
            newReceptionistAccount.setName("Receptionist");
            newReceptionistAccount.setEmail("receptionist@example.com");
            newReceptionistAccount.setPassword(new BCryptPasswordEncoder().encode("receptionist"));
            newReceptionistAccount.setUserRole(UserRole.ROLE_Receptionist);
            userRepository.save(newReceptionistAccount);
            System.out.println("Receptionist account created successfully");
        } else {
            receptionistAccount.setEmail("receptionist@example.com");
            receptionistAccount.setPassword(new BCryptPasswordEncoder().encode("receptionist"));
            userRepository.save(receptionistAccount);
            System.out.println("Receptionist account updated successfully");
        }
    }


    @Override
    public UserDto createCustomer(SignupRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setNIC(signupRequest.getNIC());
        user.setDateOfBirth(signupRequest.getDateOfBirth());
        user.setUserRole(UserRole.ROLE_Student);

        User createUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(createUser.getId());
        userDto.setName(createUser.getName());
        userDto.setEmail(createUser.getEmail());
        userDto.setNIC(createUser.getNIC());
        userDto.setDateOfBirth(createUser.getDateOfBirth());
        userDto.setUserrole(createUser.getUserRole());

        return userDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    public List<UserDto> getAllStudents() {
        List<User> users = userRepository.findByUserRole(UserRole.ROLE_Student);
        return users.stream().map(user -> new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getNIC(),
                user.getDateOfBirth(),
                user.getUserRole()
        )).collect(Collectors.toList());
    }
}