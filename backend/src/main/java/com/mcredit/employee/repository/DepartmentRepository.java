package com.mcredit.employee.repository;

import com.mcredit.employee.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    boolean existsByCodeIgnoreCase(String code);
    boolean existsByNameIgnoreCase(String name);
    Optional<Department> findByCodeIgnoreCase(String code);
}
