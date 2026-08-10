# 📦 SmartShelfX – Inventory Management System

<div align="center">

## 🚀 Smart Inventory Management for Modern Organizations

A full-stack Inventory Management System developed during my **Infosys Internship** using **React.js, Spring Boot, and MySQL**.

### 🌐 [Live Demo – SmartShelfX](https://smart-shelf-x-9grn-cqzbcfzf8-sapthapreethi-2006s-projects.vercel.app/)

</div>

---

## 📖 About the Project

**SmartShelfX** is a full-stack **Inventory Management System** designed to simplify and streamline inventory operations through a centralized web application.

The system enables organizations to efficiently manage **products, inventory, vendors, categories, SKUs, and stock records** while providing secure authentication and role-based access.

The project was developed during my **Infosys Internship**, where I gained practical experience in full-stack application development, REST API development, database integration, authentication, and deployment.

---

## 🎯 Project Objectives

* 📦 Simplify inventory and product management
* 📊 Track stock efficiently
* 🏷️ Maintain product and SKU records
* 🏢 Manage vendor information
* 🔄 Improve stock management accuracy
* 🔐 Secure application access
* 👥 Implement role-based authorization
* ⚡ Reduce manual inventory operations
* 📈 Provide a centralized inventory dashboard

---

## ✨ Key Features

### 📦 Product Management

* Add new products
* View product details
* Update product information
* Delete products
* Search products
* Manage product SKUs

### 📊 Inventory Management

* Track available stock
* Update stock quantities
* Maintain inventory records
* Monitor stock changes
* Improve inventory accuracy

### 🏢 Vendor Management

* Add vendors
* View vendor information
* Update vendor details
* Delete vendor records
* Manage vendor-related information

### 🏷️ Category & SKU Management

* Organize products using categories
* Maintain unique SKUs
* Manage product records efficiently

### 📈 Dashboard

* Centralized inventory overview
* Quick access to important modules
* Easy navigation between inventory operations

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Protected REST APIs
* Secure user access
* Input validation

### 🛠️ CRUD Operations

Complete CRUD functionality for major inventory entities:

* **Create**
* **Read**
* **Update**
* **Delete**

---

## 🛠️ Technology Stack

### 🎨 Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### ⚙️ Backend

* Java
* Spring Boot
* REST APIs
* Maven

### 🗄️ Database

* MySQL

### 🔐 Security

* JWT Authentication
* Role-Based Authorization
* Input Validation
* Protected REST APIs

### 🧰 Development Tools

* Git
* GitHub
* VS Code
* IntelliJ IDEA
* Postman
* Maven

---

## 🏗️ System Architecture

SmartShelfX follows a **three-tier architecture**.

```text
                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                         REST APIs
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Spring Boot      │
                    │       Backend        │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                         Database Access
                               │
                               ▼
                    ┌──────────────────────┐
                    │        MySQL         │
                    │       Database       │
                    └──────────────────────┘
```

### 🔄 Application Flow

```text
User
  ↓
React.js Frontend
  ↓
REST API Request
  ↓
Spring Boot Backend
  ↓
Authentication & Authorization
  ↓
Business Logic
  ↓
MySQL Database
  ↓
Response
  ↓
React.js UI
```

---

## 📦 Application Modules

### 👤 Authentication Module

Handles:

* User login
* JWT token generation
* Authentication
* Authorization
* Role-based access

### 📦 Product Module

Handles:

* Product creation
* Product retrieval
* Product updates
* Product deletion
* Product searching
* SKU management

### 📊 Inventory Module

Handles:

* Inventory records
* Stock quantity
* Stock updates
* Inventory tracking

### 🏢 Vendor Module

Handles:

* Vendor creation
* Vendor details
* Vendor updates
* Vendor management

### 🏷️ Category Module

Handles:

* Product categories
* Category management
* Product organization

### 🔄 Stock Management Module

Handles:

* Stock updates
* Quantity tracking
* Inventory consistency

---

## 🔑 Authentication & Security

SmartShelfX uses **JWT (JSON Web Token) based authentication** to secure backend APIs.

### 🔐 Authentication Flow

```text
User Login
     ↓
Credentials Validation
     ↓
JWT Token Generated
     ↓
Token Sent to Frontend
     ↓
Token Included in API Requests
     ↓
Backend Validates Token
     ↓
Role Checked
     ↓
Protected Resource Access
```

This ensures that only authenticated and authorized users can access protected inventory operations.

---

## 📡 REST API

The Spring Boot backend provides RESTful APIs for:

* Authentication
* Products
* Inventory
* Vendors
* Categories
* Stock Management

The React frontend communicates with the Spring Boot backend through HTTP requests.

---

## 🗄️ Database

**MySQL** is used as the primary relational database.

The database stores and manages:

* 👤 User information
* 📦 Product information
* 📊 Inventory records
* 🏢 Vendor information
* 🏷️ Categories
* 🔄 Stock records

---

## 📂 Project Structure

```text
SmartShelfX
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── database
│   └── database scripts
│
└── README.md
```

---

## 🌐 Live Application

### 🚀 Try SmartShelfX

**[🌐 Open Live Application](https://smart-shelf-x-9grn-cqzbcfzf8-sapthapreethi-2006s-projects.vercel.app/)**

The frontend is deployed on **Vercel**, while the Spring Boot backend is deployed separately.

> 💡 Open the live application to explore the inventory management features.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sapthapreethi-2006/SmartShelfX.git
```

```bash
cd SmartShelfX
```

---

### 2️⃣ Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE smartshelfx;
```

Update the database configuration in:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartshelfx
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

---

### 3️⃣ Run the Spring Boot Backend

Navigate to the backend:

```bash
cd backend
```

Run the application:

```bash
mvn spring-boot:run
```

For Windows:

```bash
mvnw.cmd spring-boot:run
```

---

### 4️⃣ Run the React Frontend

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

---

## 📸 Screenshots

### 🔐 Login Page

*Add your Login Page screenshot here.*

### 📊 Dashboard

*Add your Dashboard screenshot here.*

### 📦 Product Management

*Add your Product Management screenshot here.*

### 📊 Inventory Management

*Add your Inventory Dashboard screenshot here.*

### 🏢 Vendor Management

*Add your Vendor Management screenshot here.*

> 💡 **Adding real screenshots will make the repository more attractive to recruiters and help them understand the application before running it.**

---

## 💡 Key Learning Outcomes

Through this project, I gained practical experience in:

* Full-stack web application development
* React.js frontend development
* Spring Boot backend development
* RESTful API development
* MySQL database integration
* JWT authentication
* Role-based authorization
* CRUD operations
* Frontend-backend integration
* API testing using Postman
* Git & GitHub
* Maven project management
* Cloud deployment

---

## 🧩 Challenges & Solutions

### 🔐 API Security

**Challenge:** Protecting backend APIs from unauthorized access.

**Solution:** Implemented JWT authentication and role-based authorization.

### 🔄 Frontend-Backend Integration

**Challenge:** Connecting the React frontend with Spring Boot APIs.

**Solution:** Developed RESTful APIs and integrated them with the React frontend.

### 🗄️ Database Management

**Challenge:** Managing product, vendor, and inventory-related data efficiently.

**Solution:** Used MySQL as a relational database to organize and maintain application data.

### 📦 Inventory Accuracy

**Challenge:** Maintaining accurate stock information during stock updates.

**Solution:** Implemented centralized stock management and database-backed inventory records.

---

## 🚀 Future Enhancements

* 📷 Barcode Scanner Integration
* 📊 Advanced Inventory Analytics
* 🔔 Low Stock Notifications
* 📧 Automated Email Notifications
* 📄 Export Inventory Reports
* 📈 Advanced Reporting Dashboard
* 📱 Mobile Application
* 🤖 AI-powered Inventory Forecasting

---

## 🤝 Contributing

Contributions are welcome!

### Steps to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

### **Saptha Preethi**

**Full Stack Developer | Java Developer**

### 💻 Technical Skills

```text
Java • Spring Boot • React.js • JavaScript
MySQL • REST APIs • Git • GitHub
OOP • DSA • DBMS
```

### 🔗 GitHub

**[GitHub Profile](https://github.com/sapthapreethi-2006)**

### 🌐 Live Project

**[SmartShelfX – Live Demo](https://smart-shelf-x-9grn-cqzbcfzf8-sapthapreethi-2006s-projects.vercel.app/)**

---

<div align="center">

## ⭐ Like this project?

### Give the repository a ⭐ if you find it useful!

**Built with ❤️ using React.js + Spring Boot + MySQL**

</div>
