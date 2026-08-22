package com.mcredit.employee.service;

import com.mcredit.employee.dto.DepartmentRequest;
import com.mcredit.employee.entity.Department;
import com.mcredit.employee.exception.ResourceNotFoundException;
import com.mcredit.employee.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<Department> getAll() {
        return departmentRepository.findAll();
    }

    public Department getById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phong ban co id = " + id));
    }

    @Transactional
    public Department create(DepartmentRequest request) {
        String code = request.getCode().trim().toUpperCase();

        if (departmentRepository.existsByCodeIgnoreCase(code)) {
            throw new IllegalArgumentException("Ma phong ban da ton tai: " + code);
        }
        if (departmentRepository.existsByNameIgnoreCase(request.getName().trim())) {
            throw new IllegalArgumentException("Ten phong ban da ton tai: " + request.getName());
        }

        Department department = new Department();
        department.setName(request.getName().trim());
        department.setCode(code);
        return departmentRepository.save(department);
    }
}
