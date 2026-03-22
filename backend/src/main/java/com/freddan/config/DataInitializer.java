package com.freddan.config;

import com.freddan.model.MenuItem;
import com.freddan.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public void run(String... args) {
        if (menuItemRepository.count() > 0) return;

        // MOMOS
        save("Chilli Garlic Chicken Momos", "MOMOS", 119.0, "8 pcs, spicy chilli garlic flavour", false, "Signature Bites");
        save("Butter Chicken Momos", "MOMOS", 129.0, "8 pcs, rich butter chicken filling", false, "Signature Bites");
        save("Dynamic Chicken Momos", "MOMOS", 129.0, "8 pcs, dynamic spice blend", false, "Signature Bites");
        save("Chilli Garlic Veg Momos", "MOMOS", 109.0, "8 pcs, spicy veg filling", true, "Signature Bites");
        save("Butter Veg Momos", "MOMOS", 119.0, "8 pcs, buttery veg filling", true, null);
        save("Dynamic Veg Momos", "MOMOS", 119.0, "8 pcs, dynamic veg spice blend", true, null);

        // WINGS
        save("Chilli Garlic Chicken Wings", "WINGS", 229.0, "Crispy wings with chilli garlic sauce", false, "Signature Bites");
        save("Buffalo Chicken Wings", "WINGS", 229.0, "Classic buffalo sauce wings", false, null);
        save("Dynamic Chicken Wings", "WINGS", 229.0, "Signature dynamic spice wings", false, null);
        save("Nashville Chicken Wings", "WINGS", 219.0, "Nashville hot style wings", false, null);
        save("BBQ Chicken Wings", "WINGS", 229.0, "Smoky BBQ glazed wings", false, null);

        // LOADED FRIES
        save("Crispy Chicken Loaded Fries", "LOADED FRIES", 229.0, "Fries loaded with crispy chicken", false, null);
        save("Unlimited Crispy Chicken Loaded Fries", "LOADED FRIES", 329.0, "Unlimited loaded fries experience", false, "Bestseller");
        save("Prawn Loaded Fries", "LOADED FRIES", 399.0, "Fries loaded with juicy prawns", false, null);
        save("Paneer Loaded Fries", "LOADED FRIES", 189.0, "Fries loaded with spiced paneer", true, null);

        // FULLY LOADED
        save("Crispy Chicken Fully Loaded", "FULLY LOADED", 299.0, "Freddan's signature fully loaded crispy chicken", false, "Freddan Signature");
        save("Crispy Prawn Fully Loaded", "FULLY LOADED", 499.0, "Fully loaded with crispy prawns", false, "Freddan Signature");
        save("Paneer Fully Loaded", "FULLY LOADED", 249.0, "Fully loaded with spiced paneer", true, "Freddan Signature");

        // BURGER
        save("Butter Chicken Burger", "BURGER", 219.0, "Soft bun with butter chicken patty", false, null);
        save("Classic Zinger Chicken Burger", "BURGER", 229.0, "Classic crispy zinger burger", false, "Bestseller");
        save("Nashville Chicken Burger", "BURGER", 239.0, "Nashville hot chicken burger", false, null);
        save("Chilli Garlic Prawn Burger", "BURGER", 259.0, "Juicy prawn with chilli garlic", false, null);
        save("Paneer & Veg Burger", "BURGER", 199.0, "Grilled paneer and veg burger", true, null);

        // FRIES BURRITO
        save("Mexican Chicken & Fries Burrito", "FRIES BURRITO", 229.0, "Mexican chicken with fries in burrito", false, null);
        save("Tawa Chicken Fries Burrito", "FRIES BURRITO", 229.0, "Tawa chicken fries burrito", false, null);
        save("Prawn Fries Burrito", "FRIES BURRITO", 299.0, "Prawn and fries burrito", false, null);
        save("Paneer and Fries Burrito", "FRIES BURRITO", 209.0, "Paneer and fries in burrito", true, null);

        // ROLLS & WRAPS
        save("Tawa Chicken Wrap", "ROLLS & WRAPS", 199.0, "Tawa-cooked chicken wrap", false, null);
        save("Texas Fried Chicken Wrap", "ROLLS & WRAPS", 199.0, "Crispy Texas-style chicken wrap", false, null);
        save("Mexican Fajitha Chicken Wrap", "ROLLS & WRAPS", 209.0, "Mexican fajita spiced chicken wrap", false, null);
        save("Chilli Garlic Prawn Wraps", "ROLLS & WRAPS", 259.0, "Prawn with chilli garlic in wrap", false, null);
        save("Paneer & Veg Wraps", "ROLLS & WRAPS", 179.0, "Grilled paneer and veg wrap", true, null);

        // SIZZLIN' QUESADILLAS
        save("Fried Chicken Quesadillas", "SIZZLIN' QUESADILLAS", 199.0, "Crispy fried chicken quesadilla", false, null);
        save("Tawa Chicken Quesadillas", "SIZZLIN' QUESADILLAS", 209.0, "Tawa chicken quesadilla", false, null);
        save("Prawn Quesadillas", "SIZZLIN' QUESADILLAS", 259.0, "Juicy prawn quesadilla", false, null);
        save("Paneer & Veg Quesadillas", "SIZZLIN' QUESADILLAS", 189.0, "Paneer veg quesadilla", true, null);

        // MAGGIE BOWL MADNESS
        save("Tawa Chicken Maggie", "MAGGIE BOWL MADNESS", 129.0, "Maggie with tawa chicken", false, null);
        save("Egg Maggie Bowl", "MAGGIE BOWL MADNESS", 109.0, "Classic egg maggie bowl", false, null);
    }

    private void save(String name, String category, Double price, String description, Boolean isVeg, String badge) {
        MenuItem item = new MenuItem();
        item.setName(name);
        item.setCategory(category);
        item.setPrice(price);
        item.setDescription(description);
        item.setIsVeg(isVeg);
        item.setBadge(badge);
        item.setAvailable(true);
        menuItemRepository.save(item);
    }
}
