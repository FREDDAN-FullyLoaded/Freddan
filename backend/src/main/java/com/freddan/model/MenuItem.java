package com.freddan.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double price;

    private String description;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean available = true;

    private Boolean isVeg = false;

    private String badge; // e.g. "Signature", "Bestseller", "New"
}
