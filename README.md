# 🍗 FREDDAN – Fully Loaded

> Chennai's finest crispy chicken restaurant — full-stack web app with customer ordering & owner management.

![Java](https://img.shields.io/badge/Java-17-orange) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green) ![React](https://img.shields.io/badge/React-18-blue) ![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black) ![Backend on Render](https://img.shields.io/badge/Backend-Render-purple)

---

## 🌐 Live URLs (after deployment)
- **Customer Website:** `https://freddan.vercel.app`
- **Owner Panel:** `https://freddan.vercel.app/owner/login`
- **Backend API:** `https://freddan-backend.onrender.com/api`

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17 + Spring Boot 3.2 |
| Database | H2 File (upgradeable to MySQL) |
| Frontend | React 18 + Vite + Tailwind CSS |
| Deployment (FE) | Vercel |
| Deployment (BE) | Render |
| Notifications | Twilio (WhatsApp) + Fast2SMS |
| Payment | Razorpay (placeholder — ready to activate) |

---

## 📁 Project Structure

```
Freddan/
├── backend/                    # Spring Boot Java backend
│   ├── src/main/java/com/freddan/
│   │   ├── FreddanApplication.java
│   │   ├── config/
│   │   │   └── DataInitializer.java    # Seeds full menu on first run
│   │   ├── controller/
│   │   │   ├── MenuController.java
│   │   │   └── OrderController.java
│   │   ├── model/
│   │   │   ├── MenuItem.java
│   │   │   ├── Order.java
│   │   │   └── OrderItem.java
│   │   ├── repository/
│   │   │   ├── MenuItemRepository.java
│   │   │   └── OrderRepository.java
│   │   └── service/
│   │       ├── MenuService.java
│   │       ├── OrderService.java
│   │       └── NotificationService.java
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CustomerHome.jsx       # Main menu page
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── OwnerLogin.jsx
│   │   │   ├── OwnerDashboard.jsx
│   │   │   ├── OwnerMenu.jsx
│   │   │   └── OwnerOrders.jsx
│   │   ├── components/
│   │   │   ├── shared/Navbar.jsx
│   │   │   ├── customer/MenuCard.jsx
│   │   │   └── owner/OwnerLayout.jsx
│   │   ├── context/CartContext.jsx
│   │   └── utils/api.js
│   ├── vercel.json
│   └── package.json
│
├── render.yaml                 # Render deployment config
├── .gitignore
└── README.md
```

---

## 🚀 STEP-BY-STEP SETUP GUIDE

### Prerequisites
- Java 17+ installed
- Node.js 18+ installed
- Maven installed
- Git installed

---

### STEP 1 — Clone & enter the project

```bash
git clone https://github.com/FREDDAN-FullyLoaded/Freddan.git
cd Freddan
```

---

### STEP 2 — Run the Backend locally

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend starts at: `http://localhost:8080`

Test it:
```
GET http://localhost:8080/api/menu
```

H2 Database console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./freddan-db`
- Username: `sa`
- Password: `freddan123`

---

### STEP 3 — Run the Frontend locally

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

---

### STEP 4 — Push to GitHub

```bash
# From project root
git add .
git commit -m "feat: initial Freddan full-stack app"
git push origin main
```

---

### STEP 5 — Deploy Backend on Render (Free)

1. Go to https://render.com → Sign up / Log in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub → Select `FREDDAN-FullyLoaded/Freddan`
4. Fill in:
   - **Name:** `freddan-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Java`
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/freddan-backend-1.0.0.jar`
5. Add **Environment Variables** (click "Advanced"):
   ```
   SHOP_PHONE = 8608227548
   TWILIO_ACCOUNT_SID = (add later)
   TWILIO_AUTH_TOKEN = (add later)
   FAST2SMS_API_KEY = (add later)
   ```
6. Click **"Create Web Service"**
7. Wait ~5 mins for first deploy. Copy the URL e.g. `https://freddan-backend.onrender.com`

---

### STEP 6 — Deploy Frontend on Vercel (Free)

1. Go to https://vercel.com → Sign up / Log in
2. Click **"Add New Project"**
3. Import `FREDDAN-FullyLoaded/Freddan` from GitHub
4. Fill in:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add **Environment Variable:**
   ```
   VITE_API_URL = https://freddan-backend.onrender.com/api
   ```
6. Click **"Deploy"**
7. Your site is live at `https://freddan.vercel.app` (or custom domain)

---

### STEP 7 — Set Up WhatsApp Notifications (Twilio)

1. Sign up at https://www.twilio.com
2. Go to **Messaging → Try it out → Send a WhatsApp message**
3. Follow the sandbox setup (send "join <word>" from 8608227548 to Twilio number)
4. Get your:
   - Account SID
   - Auth Token
5. Add to Render environment variables:
   ```
   TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN = your_auth_token
   ```

---

### STEP 8 — Set Up SMS Notifications (Fast2SMS)

1. Sign up at https://www.fast2sms.com
2. Go to **Dev API → API Keys**
3. Copy your API key
4. Add to Render:
   ```
   FAST2SMS_API_KEY = your_fast2sms_key
   ```

---

### STEP 9 — Activate Real Payments (Razorpay)

1. Sign up at https://razorpay.com (needs GST / business registration)
2. Get **Key ID** and **Key Secret** from Dashboard → Settings → API Keys
3. In `frontend/src/pages/CheckoutPage.jsx`, replace the placeholder section with:
   ```javascript
   const options = {
     key: "rzp_live_XXXXXXXXXX",
     amount: grandTotal * 100, // in paise
     currency: "INR",
     name: "Freddan Fully Loaded",
     description: `Order #${orderId}`,
     handler: function(response) {
       // Mark payment as PAID via API
       updatePaymentStatus(orderId, 'PAID')
     }
   }
   const rzp = new window.Razorpay(options)
   rzp.open()
   ```
4. Add Razorpay script to `frontend/index.html`:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```

---

## 🔐 Owner Login Credentials

```
Username: freddan
Password: freddan@2024
```

> ⚠️ Change these in `frontend/src/pages/OwnerLogin.jsx` before going live!

---

## 📱 Owner Panel Features

| Feature | Location |
|---------|----------|
| Dashboard with today's stats | `/owner` |
| Add new menu items | `/owner/menu` → Add Item |
| Edit item details | `/owner/menu` → Edit (pencil icon) |
| Update price (inline) | `/owner/menu` → Click price |
| Show/hide items | `/owner/menu` → Toggle button |
| View all orders | `/owner/orders` |
| Update order status | `/owner/orders` → Expand → Change status |
| Mark payment as paid | `/owner/orders` → Expand → Payment status |

---

## 🍽️ Menu Categories (Pre-loaded)

- 🔥 Fully Loaded (Freddan Signature)
- 🍔 Burger
- 🍗 Wings
- 🍟 Loaded Fries
- 🥟 Momos
- 🌯 Fries Burrito
- 🫔 Rolls & Wraps
- 🫕 Sizzlin' Quesadillas
- 🍜 Maggie Bowl Madness

---

## 🔧 API Endpoints

### Menu (Public)
```
GET    /api/menu                    → Get all available items
GET    /api/menu/category/{cat}     → Get by category
```

### Menu (Owner)
```
GET    /api/menu/all                → Get all items (incl. hidden)
POST   /api/menu                    → Add new item
PUT    /api/menu/{id}               → Update item
PATCH  /api/menu/{id}/price         → Update price only
PATCH  /api/menu/{id}/toggle        → Toggle availability
DELETE /api/menu/{id}               → Delete item
```

### Orders
```
POST   /api/orders                  → Place order (triggers notification)
GET    /api/orders                  → Get all orders (owner)
GET    /api/orders/{id}             → Get single order
GET    /api/orders/status/{status}  → Filter by status
PATCH  /api/orders/{id}/status      → Update order status
PATCH  /api/orders/{id}/payment     → Update payment status
```

---

## 🗺️ Location

**Freddan Fully Loaded**
Old No 74, New No 20, Brindavan St,
near Duraiswamy Subway, Ramakrishnapuram,
West Mambalam, Chennai – 600033

📞 [+91 86082 27548](tel:8608227548)
📍 [Google Maps](https://maps.google.com/?q=Freddan+Fully+Loaded+West+Mambalam+Chennai)

---

## 🛠️ Future Upgrades

- [ ] Switch H2 → MySQL / PostgreSQL (for production persistence)
- [ ] Add JWT authentication for owner panel
- [ ] Add real Razorpay integration
- [ ] Add table QR code ordering
- [ ] Add loyalty points system
- [ ] Add Google Analytics

---

*Built with 🔥 for Freddan Fully Loaded, Chennai*
