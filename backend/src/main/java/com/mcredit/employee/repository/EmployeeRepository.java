package com.mcredit.employee.repository;

import com.mcredit.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCode(String employeeCode);

    boolean existsByEmail(String email);

    // Lay ma nhan vien lon nhat hien co TRONG CUNG 1 phong ban, de sinh ma tiep theo (IT001, IT002, ...)
    @Query(value = "SELECT employee_code FROM employees WHERE department_id = :departmentId ORDER BY id DESC LIMIT 1",
            nativeQuery = true)
    String findLastEmployeeCodeByDepartment(@Param("departmentId") Long departmentId);

    // Tim kiem theo ten hoac ma nhan vien (dung cho thanh search)
    List<Employee> findByFullNameContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCase(
            String fullName, String employeeCode);
}
