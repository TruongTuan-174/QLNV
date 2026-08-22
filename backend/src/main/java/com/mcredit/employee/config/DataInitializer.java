package com.mcredit.employee.config;

import com.mcredit.employee.entity.Department;
import com.mcredit.employee.entity.Position;
import com.mcredit.employee.repository.DepartmentRepository;
import com.mcredit.employee.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

    @Override
    public void run(String... args) {
        if (departmentRepository.count() == 0) {
            departmentRepository.save(new Department(null, "Công nghệ thông tin", "IT"));
            departmentRepository.save(new Department(null, "Kế toán", "KT"));
            departmentRepository.save(new Department(null, "Nhân sự", "NS"));
            departmentRepository.save(new Department(null, "Kinh doanh", "KD"));
        }

        if (positionRepository.count() == 0) {
            positionRepository.save(new Position(null, "Nhân viên"));
            positionRepository.save(new Position(null, "Trưởng phòng"));
            positionRepository.save(new Position(null, "Phó phòng"));
            positionRepository.save(new Position(null, "Giám đốc"));
        }
    }
}
