package com.freddan.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerPhone;

    private String customerAddress;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private String paymentMethod; // GPAY, PHONEPE, CARD

    @Column(nullable = false)
    private String paymentStatus; // PENDING, PAID, FAILED

    @Column(nullable = false)
    private String orderStatus; // PLACED, PREPARING, READY, DELIVERED

    @Column(nullable = false)
    private LocalDateTime orderTime;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> items;

    private String orderNotes;
}
