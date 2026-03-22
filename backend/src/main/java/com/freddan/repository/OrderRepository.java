package com.freddan.repository;

import com.freddan.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderStatusOrderByOrderTimeDesc(String status);
    List<Order> findAllByOrderByOrderTimeDesc();
    List<Order> findByCustomerPhone(String phone);
}
