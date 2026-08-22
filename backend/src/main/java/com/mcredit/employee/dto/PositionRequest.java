package com.mcredit.employee.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PositionRequest {

    @NotBlank(message = "Ten chuc vu khong duoc de trong")
    private String name;
}
