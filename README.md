# Customer Registration API

A REST API for customer registration and management built with Node.js, Express.js, and SQLite3.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Validation Rules](#validation-rules)
- [Example Requests](#example-requests)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Author](#author)

## 🎯 Overview

This is a customer registration REST API developed as coursework for the University of Moratuwa (OUM). The API allows you to register, update, retrieve, and delete customer information with proper validation for email addresses and credit card numbers.

## ✨ Features

- **Customer Registration** - Register new customers with validation
- **Customer Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Email Validation** - Validates email format using regex
- **Credit Card Validation** - Ensures credit card numbers are exactly 12 digits
- **SQLite Database** - Lightweight database with automatic table creation
- **CORS Support** - Cross-origin resource sharing enabled
- **Error Handling** - Comprehensive error responses
- **Sample Data** - Automatically creates sample customer on first run

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🚀 Installation

1. **Clone or download the project**
   ```bash
   cd /path/to/your/project/cousework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Verify installation**
   - Server will start on port 8080
   - Visit `http://localhost:8080/` to see the welcome message
   - Database file `customer.db` will be created automatically

## 🔧 Usage

The server runs on `http://localhost:8080` by default. You can interact with the API using:

- **Postman** (recommended) - Import the collection from `postmat-collection/OUM.postman_collection.json`
- **curl** commands
- **Any HTTP client**

## 📚 API Endpoints

### Base URL: `http://localhost:8080`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/:id` | Get customer by ID |
| POST | `/api/customer/register` | Register new customer |
| PUT | `/api/customers/` | Update existing customer |
| DELETE | `/api/customers/delete/:id` | Delete customer by ID |

## 🗃️ Database Schema

### Customer Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| customerId | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique customer identifier |
| name | TEXT | NOT NULL | Customer full name |
| address | TEXT | | Customer address |
| email | TEXT | NOT NULL | Customer email (validated) |
| dateOfBirth | TEXT | | Customer date of birth (YYYY-MM-DD) |
| gender | TEXT | | Customer gender |
| age | INTEGER | | Customer age |
| cardHolderName | TEXT | | Credit card holder name |
| cardNumber | TEXT | | Credit card number (12 digits, validated) |
| expiryDate | TEXT | | Card expiry date (MM/YY) |
| cvv | TEXT | | Card CVV |
| timestamp | TEXT | | Registration timestamp |

## ✅ Validation Rules

### Email Validation
- Must be a valid email format
- Uses comprehensive regex pattern
- Required field

### Credit Card Validation
- Must be exactly 12 digits
- No spaces or special characters allowed
- Example: `123456789012`

## 📝 Example Requests

### 1. Register New Customer
**POST** `/api/customer/register`

```json
{
  "name": "Kasun Perera",
  "address": "123/A, Galle Road, Colombo 03",
  "email": "kasun.perera@gmail.com",
  "dateOfBirth": "1995-03-15",
  "gender": "Male",
  "age": 30,
  "cardHolderName": "Kasun Perera",
  "cardNumber": "123456789012",
  "expiryDate": "12/28",
  "cvv": "456",
  "timestamp": "2025-09-02T10:30:00.000Z"
}
```

**Response:**
```json
{
  "message": "success",
  "data": { ... },
  "customerId": 1
}
```

### 2. Get All Customers
**GET** `/api/customers`

**Response:**
```json
{
  "message": "success",
  "data": [
    {
      "customerId": 1,
      "name": "John Doe",
      "email": "john@example.com",
      ...
    }
  ]
}
```

### 3. Update Customer
**PUT** `/api/customers/`

```json
{
  "customerId": 1,
  "name": "Kasun Perera Silva",
  "address": "456/B, Kandy Road, Colombo 07",
  "email": "kasun.silva@gmail.com",
  "dateOfBirth": "1995-03-15",
  "gender": "Male",
  "age": 30,
  "cardHolderName": "Kasun Perera Silva",
  "cardNumber": "987654321098",
  "expiryDate": "06/29",
  "cvv": "789",
  "timestamp": "2025-09-02T11:45:00.000Z"
}
```

### 4. Delete Customer
**DELETE** `/api/customers/delete/1`

**Response:**
```json
{
  "message": "deleted",
  "rows": 1
}
```

## 🧪 Testing with Postman

1. **Import Collection**
   - Open Postman
   - Import `postmat-collection/OUM.postman_collection.json`

2. **Set Environment**
   - Base URL: `http://localhost:8080`

3. **Test Endpoints**
   - Start with the root endpoint to verify server is running
   - Test customer registration with sample data
   - Verify data retrieval and updates

## 📁 Project Structure

```
cousework/
├── customer.db                     # SQLite database (auto-generated)
├── database.js                     # Database connection and setup
├── server.js                       # Main server file with API routes
├── package.json                    # Project dependencies and scripts
├── example-request.json            # Sample POST request data
├── example-update-request.json     # Sample PUT request data
└── postmat-collection/
    └── OUM.postman_collection.json # Postman collection for testing
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **body-parser** - Request parsing middleware
- **CORS** - Cross-origin resource sharing
- **Postman** - API testing

## 🔧 Configuration

### Port Configuration
- Default port: 8080
- Change in `server.js`: `let HTTP_PORT = 8080`

### Database Configuration
- Database file: `customer.db`
- Change in `database.js`: `const DBSOURCE = "customer.db"`

## 🐛 Troubleshooting

### Common Issues

1. **sqlite3 Module Not Found**
   ```bash
   npm rebuild sqlite3
   # or
   npm uninstall sqlite3 && npm install sqlite3@5.1.6
   ```

2. **Port Already in Use**
   - Change the port in `server.js`
   - Or kill the process using the port

3. **Validation Errors**
   - Check email format
   - Ensure credit card number has exactly 12 digits

## 📄 License

This project is created for educational purposes as part of University of Moratuwa coursework.

## 👨‍💻 Author

**University of Moratuwa - OUM Coursework**

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Test the API
curl http://localhost:8080/

# Register a customer
curl -X POST http://localhost:8080/api/customer/register \
  -H "Content-Type: application/json" \
  -d @example-request.json
```

For detailed testing, use the included Postman collection! 🎉
