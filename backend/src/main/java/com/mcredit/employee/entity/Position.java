package com.mcredit.employee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "positions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ten chuc vu, vi du: "Nhan vien", "Truong phong", "Giam doc"
    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;
}
