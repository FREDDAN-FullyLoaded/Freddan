package com.freddan.service;

import com.freddan.model.MenuItem;
import com.freddan.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllItems() {
        return menuItemRepository.findAll();
    }

    public List<MenuItem> getAvailableItems() {
        return menuItemRepository.findByAvailable(true);
    }

    public List<MenuItem> getItemsByCategory(String category) {
        return menuItemRepository.findByCategoryAndAvailable(category, true);
    }

    public Optional<MenuItem> getItemById(Long id) {
        return menuItemRepository.findById(id);
    }

    public MenuItem createItem(MenuItem item) {
        return menuItemRepository.save(item);
    }

    public MenuItem updateItem(Long id, MenuItem updatedItem) {
        return menuItemRepository.findById(id).map(item -> {
            item.setName(updatedItem.getName());
            item.setCategory(updatedItem.getCategory());
            item.setPrice(updatedItem.getPrice());
            item.setDescription(updatedItem.getDescription());
            item.setImageUrl(updatedItem.getImageUrl());
            item.setAvailable(updatedItem.getAvailable());
            item.setIsVeg(updatedItem.getIsVeg());
            item.setBadge(updatedItem.getBadge());
            return menuItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("MenuItem not found with id: " + id));
    }

    public MenuItem updatePrice(Long id, Double newPrice) {
        return menuItemRepository.findById(id).map(item -> {
            item.setPrice(newPrice);
            return menuItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("MenuItem not found with id: " + id));
    }

    public void deleteItem(Long id) {
        menuItemRepository.deleteById(id);
    }

    public MenuItem toggleAvailability(Long id) {
        return menuItemRepository.findById(id).map(item -> {
            item.setAvailable(!item.getAvailable());
            return menuItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("MenuItem not found with id: " + id));
    }
}
