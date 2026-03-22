package com.freddan.service;

import com.freddan.model.Order;
import com.freddan.model.OrderItem;
import com.freddan.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private NotificationService notificationService;

    public Order placeOrder(Order order) {
        order.setOrderTime(LocalDateTime.now());
        order.setOrderStatus("PLACED");
        order.setPaymentStatus("PENDING");

        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }

        Order savedOrder = orderRepository.save(order);
        notificationService.sendOrderNotification(savedOrder);
        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderTimeDesc();
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByOrderStatusOrderByOrderTimeDesc(status);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order updateOrderStatus(Long id, String status) {
        return orderRepository.findById(id).map(order -> {
            order.setOrderStatus(status);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public Order updatePaymentStatus(Long id, String paymentStatus) {
        return orderRepository.findById(id).map(order -> {
            order.setPaymentStatus(paymentStatus);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
}
