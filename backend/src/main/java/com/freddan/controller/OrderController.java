package com.freddan.controller;

import com.freddan.model.Order;
import com.freddan.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // PUBLIC - Place new order
    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    // OWNER - Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // OWNER - Get orders by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(status));
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // OWNER - Update order status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, body.get("status")));
    }

    // OWNER - Update payment status
    @PatchMapping("/{id}/payment")
    public ResponseEntity<Order> updatePayment(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(orderService.updatePaymentStatus(id, body.get("paymentStatus")));
    }
}
