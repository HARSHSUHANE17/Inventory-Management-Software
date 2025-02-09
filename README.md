# Inventory-Management-Software

A full-stack web application for managing suppliers and products, built with FastAPI (backend) and React (frontend). The system allows businesses to track suppliers, manage product inventory, and monitor sales metrics.

## Features
Supplier Management (CRUD operations)
Product Inventory Management
Automated Revenue Calculations
Real-time Data Updates
Responsive UI with Bootstrap

## Tech Stack
Frontend: React.js, React Bootstrap, React Router
Backend: FastAPI, Tortoise ORM
Database: SQLite
API: RESTful Architecture

## API Endpoints
# Suppliers
GET /supplier - Get all suppliers
GET /supplier/{id} - Get specific supplier
POST /supplier - Add new supplier
PUT /supplier/{id} - Update supplier
DELETE /supplier/{id} - Delete supplier

# Products
GET /product - Get all products
GET /product/{id} - Get specific product
POST /product/{supplier_id} - Add new product
PUT /product/{id} - Update product
DELETE /product/{id} - Delete product


## Project Structure

├── backend/
│   ├── app.py          # FastAPI application and routes
│   └── models.py       # Database models and Pydantic schemas
├── front_end/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── App.js      # Main React component
│   └── package.json
└── README.md


## Key Components
SupplierPage: Manages supplier CRUD operations
ProductsTable: Displays and manages products

## Database Models
Supplier Model: Stores supplier information
Product Model: Manages product inventory and sales data
