package com.freddan.service;

import com.freddan.model.Order;
import com.freddan.model.OrderItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    @Value("${twilio.account.sid:}")
    private String twilioAccountSid;

    @Value("${twilio.auth.token:}")
    private String twilioAuthToken;

    @Value("${twilio.whatsapp.from:whatsapp:+14155238886}")
    private String twilioWhatsappFrom;

    @Value("${fast2sms.api.key:}")
    private String fast2smsApiKey;

    @Value("${shop.phone:8608227548}")
    private String shopPhone;

    public void sendOrderNotification(Order order) {
        String message = buildOrderMessage(order);
        sendWhatsApp(message);
        sendSMS(message);
    }

    private String buildOrderMessage(Order order) {
        StringBuilder sb = new StringBuilder();
        sb.append("🍗 NEW ORDER #").append(order.getId()).append("\n");
        sb.append("━━━━━━━━━━━━━━━━━━\n");
        sb.append("👤 ").append(order.getCustomerName()).append("\n");
        sb.append("📞 ").append(order.getCustomerPhone()).append("\n");
        if (order.getCustomerAddress() != null && !order.getCustomerAddress().isEmpty()) {
            sb.append("📍 ").append(order.getCustomerAddress()).append("\n");
        }
        sb.append("━━━━━━━━━━━━━━━━━━\n");
        sb.append("🧾 ITEMS:\n");
        for (OrderItem item : order.getItems()) {
            sb.append("  • ").append(item.getMenuItemName())
              .append(" x").append(item.getQuantity())
              .append(" = ₹").append(item.getSubtotal()).append("\n");
        }
        sb.append("━━━━━━━━━━━━━━━━━━\n");
        sb.append("💰 TOTAL: ₹").append(order.getTotalAmount()).append("\n");
        sb.append("💳 Payment: ").append(order.getPaymentMethod()).append("\n");
        if (order.getOrderNotes() != null && !order.getOrderNotes().isEmpty()) {
            sb.append("📝 Notes: ").append(order.getOrderNotes()).append("\n");
        }
        sb.append("━━━━━━━━━━━━━━━━━━");
        return sb.toString();
    }

    private void sendWhatsApp(String message) {
        if (twilioAccountSid.isEmpty() || twilioAuthToken.isEmpty()) {
            logger.info("[TWILIO PLACEHOLDER] WhatsApp message would be sent:\n{}", message);
            return;
        }
        try {
            HttpClient client = HttpClient.newHttpClient();
            String credentials = Base64.getEncoder().encodeToString(
                (twilioAccountSid + ":" + twilioAuthToken).getBytes(StandardCharsets.UTF_8)
            );
            String body = "From=" + URLEncoder.encode(twilioWhatsappFrom, StandardCharsets.UTF_8)
                + "&To=" + URLEncoder.encode("whatsapp:+91" + shopPhone, StandardCharsets.UTF_8)
                + "&Body=" + URLEncoder.encode(message, StandardCharsets.UTF_8);

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.twilio.com/2010-04-01/Accounts/" + twilioAccountSid + "/Messages.json"))
                .header("Authorization", "Basic " + credentials)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            logger.info("WhatsApp sent. Status: {}", response.statusCode());
        } catch (Exception e) {
            logger.error("WhatsApp notification failed: {}", e.getMessage());
        }
    }

    private void sendSMS(String message) {
        if (fast2smsApiKey.isEmpty()) {
            logger.info("[FAST2SMS PLACEHOLDER] SMS would be sent:\n{}", message);
            return;
        }
        try {
            HttpClient client = HttpClient.newHttpClient();
            String smsBody = "route=q&numbers=" + shopPhone
                + "&message=" + URLEncoder.encode(message, StandardCharsets.UTF_8)
                + "&flash=0";

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.fast2sms.com/dev/bulkV2"))
                .header("authorization", fast2smsApiKey)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(smsBody))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            logger.info("SMS sent. Status: {}", response.statusCode());
        } catch (Exception e) {
            logger.error("SMS notification failed: {}", e.getMessage());
        }
    }
}
