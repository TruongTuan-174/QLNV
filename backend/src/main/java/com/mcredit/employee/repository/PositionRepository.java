package com.mcredit.employee.repository;

import com.mcredit.employee.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
    boolean existsByNameIgnoreCase(String name);
}
