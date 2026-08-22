package com.mcredit.employee.controller;

import com.mcredit.employee.dto.DepartmentRequest;
import com.mcredit.employee.entity.Department;
import com.mcredit.employee.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<Department>> getAll() {
        return ResponseEntity.ok(departmentService.getAll());
    }

    @PostMapping
    public ResponseEntity<Department> create(@Valid @RequestBody DepartmentRequest request) {
        Department created = departmentService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
