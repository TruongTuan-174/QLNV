package com.mcredit.employee.service;

import com.mcredit.employee.dto.PositionRequest;
import com.mcredit.employee.entity.Position;
import com.mcredit.employee.exception.ResourceNotFoundException;
import com.mcredit.employee.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PositionService {

    private final PositionRepository positionRepository;

    public List<Position> getAll() {
        return positionRepository.findAll();
    }

    public Position getById(Long id) {
        return positionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay chuc vu co id = " + id));
    }

    @Transactional
    public Position create(PositionRequest request) {
        String name = request.getName().trim();

        if (positionRepository.existsByNameIgnoreCase(name)) {
            throw new IllegalArgumentException("Chuc vu da ton tai: " + name);
        }

        Position position = new Position();
        position.setName(name);
        return positionRepository.save(position);
    }
}
