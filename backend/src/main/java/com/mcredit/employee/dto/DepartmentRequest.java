package com.mcredit.employee.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DepartmentRequest {

    @NotBlank(message = "Ten phong ban khong duoc de trong")
    private String name;

    @NotBlank(message = "Ma phong ban khong duoc de trong")
    private String code;
}
