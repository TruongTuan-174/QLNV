package com.mcredit.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeRequest {

    @NotBlank(message = "Ho ten khong duoc de trong")
    private String fullName;

    private LocalDate dateOfBirth;

    private String gender;

    @Email(message = "Email khong hop le")
    private String email;

    private String phone;

    private String address;

    @NotNull(message = "Phai chon phong ban")
    private Long departmentId;

    @NotNull(message = "Phai chon chuc vu")
    private Long positionId;

    private Double salary;
}
