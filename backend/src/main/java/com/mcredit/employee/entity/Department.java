package com.mcredit.employee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ten day du, vi du: "Cong nghe thong tin"
    @Column(name = "name", nullable = false, unique = true, length = 150)
    private String name;

    // Ma viet tat dung de sinh ma nhan vien, vi du: "IT", "KT", "NS"
    @Column(name = "code", nullable = false, unique = true, length = 10)
    private String code;
}
