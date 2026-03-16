# AgroShop Manager 🌱

AgroShop Manager is a web-based inventory and billing management platform designed for small and medium retail shops such as agricultural seed stores.
The system enables shop owners to manage product inventory, generate bills, and track stock in real-time through a simple and responsive dashboard.

The application supports multi-shop architecture where each shop operates independently using a unique `shop_id`, ensuring secure and organized data handling.

##  Live Demo

Production Deployment:
https://vkk-group.vercel.app

## ✨ Features

• Multi-Shop Architecture using shop-specific data isolation
• Owner Dashboard for monitoring stock and shop operations
• Inventory Management (Add / Update / Track Products)
• Real-time Billing System for generating sales records
• Stock Tracking per shop using unique `shop_id`
• Responsive Web Interface for desktop and mobile usage
• Cloud-hosted backend with Supabase database
• Instant deployment and scaling using Vercel


## 🏗 System Architecture

User Browser
↓
React + Vite Frontend
↓
Supabase Backend (Database + APIs)
↓
Vercel Cloud Deployment

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript (ES6)

### Backend / Database

* Supabase (PostgreSQL)
* REST APIs

### Deployment

* Vercel

### Development Tools

* VS Code
* Git
* GitHub


## 📊 Database Design

### Shops Table

| shop_id | shop_name | owner_name | location |
| ------- | --------- | ---------- | -------- |

### Stock Table

id | shop_id | product_name | quantity | price

### Bills Table

bill_id | shop_id | product_name | quantity | total_price

Each operation is linked with `shop_id` to ensure correct shop-level data isolation.


##  Installation

Clone the repository

---
git clone https://github.com/yourusername/agroshop-manager.git
```

Navigate into project folder

```
cd agroshop-manager
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

---

## 🚀 Deployment

This project is deployed using **Vercel**.

To deploy manually:

```
vercel --prod
```
---

## 📌 Future Improvements

• Sales analytics dashboard
• Automated low-stock alerts
• PDF bill generation
• Role-based authentication
• Mobile PWA support

---

