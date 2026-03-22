package com.freddan.controller;

import com.freddan.model.MenuItem;
import com.freddan.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private MenuService menuService;

    // PUBLIC - Get all available items
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAvailableMenu() {
        return ResponseEntity.ok(menuService.getAvailableItems());
    }

    // PUBLIC - Get by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(menuService.getItemsByCategory(category));
    }

    // OWNER - Get all items including unavailable
    @GetMapping("/all")
    public ResponseEntity<List<MenuItem>> getAllMenu() {
        return ResponseEntity.ok(menuService.getAllItems());
    }

    // OWNER - Add new item
    @PostMapping
    public ResponseEntity<MenuItem> addItem(@RequestBody MenuItem item) {
        return ResponseEntity.ok(menuService.createItem(item));
    }

    // OWNER - Update item
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateItem(@PathVariable Long id, @RequestBody MenuItem item) {
        return ResponseEntity.ok(menuService.updateItem(id, item));
    }

    // OWNER - Update price only
    @PatchMapping("/{id}/price")
    public ResponseEntity<MenuItem> updatePrice(@PathVariable Long id, @RequestBody Map<String, Double> body) {
        return ResponseEntity.ok(menuService.updatePrice(id, body.get("price")));
    }

    // OWNER - Toggle availability
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<MenuItem> toggleAvailability(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.toggleAvailability(id));
    }

    // OWNER - Delete item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        menuService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
