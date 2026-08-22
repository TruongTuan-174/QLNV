package com.mcredit.employee.service;

import com.mcredit.employee.dto.EmployeeRequest;
import com.mcredit.employee.entity.Department;
import com.mcredit.employee.entity.Employee;
import com.mcredit.employee.entity.Position;
import com.mcredit.employee.exception.ResourceNotFoundException;
import com.mcredit.employee.repository.DepartmentRepository;
import com.mcredit.employee.repository.EmployeeRepository;
import com.mcredit.employee.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private static final int CODE_DIGITS = 3; // IT001, IT002, ... IT999, IT1000

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay nhan vien co id = " + id));
    }

    public List<Employee> search(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return employeeRepository.findAll();
        }
        return employeeRepository.findByFullNameContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCase(keyword, keyword);
    }

    @Transactional
    public Employee create(EmployeeRequest request) {
        if (request.getEmail() != null && !request.getEmail().isBlank()
                && employeeRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email da ton tai: " + request.getEmail());
        }

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phong ban co id = " + request.getDepartmentId()));
        Position position = positionRepository.findById(request.getPositionId())
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay chuc vu co id = " + request.getPositionId()));

        Employee employee = new Employee();
        mapRequestToEntity(request, employee, department, position);
        employee.setEmployeeCode(generateNextEmployeeCode(department));

        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee update(Long id, EmployeeRequest request) {
        Employee employee = getById(id);

        // Neu doi email thi kiem tra trung, tru chinh no
        if (request.getEmail() != null && !request.getEmail().isBlank()
                && !request.getEmail().equalsIgnoreCase(employee.getEmail())
                && employeeRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email da ton tai: " + request.getEmail());
        }

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phong ban co id = " + request.getDepartmentId()));
        Position position = positionRepository.findById(request.getPositionId())
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay chuc vu co id = " + request.getPositionId()));

        // Neu doi sang phong ban khac, sinh lai ma NV theo phong ban moi
        boolean departmentChanged = employee.getDepartment() == null
                || !employee.getDepartment().getId().equals(department.getId());

        mapRequestToEntity(request, employee, department, position);

        if (departmentChanged) {
            employee.setEmployeeCode(generateNextEmployeeCode(department));
        }

        return employeeRepository.save(employee);
    }

    @Transactional
    public void delete(Long id) {
        Employee employee = getById(id);
        employeeRepository.delete(employee);
    }

    private void mapRequestToEntity(EmployeeRequest request, Employee employee, Department department, Position position) {
        employee.setFullName(request.getFullName());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setGender(request.getGender());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setAddress(request.getAddress());
        employee.setDepartment(department);
        employee.setPosition(position);
        employee.setSalary(request.getSalary());
    }

    // Sinh ma nhan vien tiep theo theo TUNG phong ban: <MaPhongBan><so thu tu>, vi du IT001 -> IT002 ...
    private String generateNextEmployeeCode(Department department) {
        String prefix = department.getCode().toUpperCase();
        String lastCode = employeeRepository.findLastEmployeeCodeByDepartment(department.getId());

        int nextNumber = 1;
        if (lastCode != null && lastCode.startsWith(prefix)) {
            try {
                nextNumber = Integer.parseInt(lastCode.substring(prefix.length())) + 1;
            } catch (NumberFormatException ignored) {
                // Neu parse loi, mac dinh bat dau lai tu 1
            }
        }

        return prefix + String.format("%0" + CODE_DIGITS + "d", nextNumber);
    }
}
