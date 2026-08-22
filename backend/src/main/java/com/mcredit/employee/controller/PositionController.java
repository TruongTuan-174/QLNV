package com.mcredit.employee.controller;

import com.mcredit.employee.dto.PositionRequest;
import com.mcredit.employee.entity.Position;
import com.mcredit.employee.service.PositionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/positions")
@RequiredArgsConstructor
public class PositionController {

    private final PositionService positionService;

    @GetMapping
    public ResponseEntity<List<Position>> getAll() {
        return ResponseEntity.ok(positionService.getAll());
    }

    @PostMapping
    public ResponseEntity<Position> create(@Valid @RequestBody PositionRequest request) {
        Position created = positionService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
