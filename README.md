# 🏢 Employee Management System (EMS)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Docker](https://img.shields.io/badge/Docker-v24.0+-blue?logo=docker)
![React](https://img.shields.io/badge/Frontend-React%20Vite-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js%20v22-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)

> **Enterprise-grade Full Stack Application** designed for modern HR administration. Built with scalability, maintainability, and clean architecture in mind.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [Prerequisites](#-prerequisites)
4. [Installation & Setup](#-installation--setup)
5. [Key Features](#-key-features)
6. [API Documentation](#-api-documentation)
7. [Project Structure](#-project-structure)
8. [Challenges & Solutions](#-challenges--solutions)
9. [Future Roadmap](#-future-roadmap)
10. [Screenshots](#-screenshots)

---

## 🔭 Project Overview

The **Employee Management System (EMS)** is a centralized platform designed to streamline workforce management. It enables HR administrators to manage employee records, visualize workforce distribution, and track hiring trends through an interactive dashboard.

The application strictly adheres to **Clean Code** principles, utilizing **MVC Architecture** for the backend and **Atomic Design/Feature-based Architecture** for the frontend. It is fully containerized using Docker to ensure consistency across development and production environments.

### 🛠 Tech Stack

| Domain | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) + TypeScript | High performance, type safety, and modern tooling. |
| **State Mgmt** | TanStack Query (v5) | Efficient server-state management, caching, and auto-refetching. |
| **Styling** | Tailwind CSS + Framer Motion | Rapid UI development with smooth, professional animations. |
| **Backend** | Node.js (Express) | Scalable, event-driven architecture with clear separation of concerns. |
| **Database** | PostgreSQL 15 | robust relational database with ACID compliance. |
| **ORM** | Prisma | Type-safe database queries and automated migrations. |
| **DevOps** | Docker & Docker Compose | "Write once, run anywhere" deployment strategy. |

---

## 🏗 System Architecture

    User[Browser Client] -- HTTP/JSON --> Frontend[React Container :5173]
    Frontend -- REST API --> Backend[Node API Container :5000]
    Backend -- TCP --> Database[PostgreSQL Container :5432]

## ⚙ Prerequisites

Before you begin, ensure you have the following installed:

* **Docker Desktop** (Engine v20.10+)
* **Git**

*Note: Node.js and PostgreSQL do **not** need to be installed locally as they run within isolated Docker containers.*

---

## 🚀 Installation & Setup

Follow these steps to deploy the application locally using a single command.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd employee-management-system

## ✨ Key Features

### 📊 Executive Dashboard
* **Interactive Charts:** Area charts visualizing average salary distribution per department.
* **Real-time Metrics:** Total active employees, departmental breakdown, and monthly growth.
* **Paginated Recent Hires:** Client-side pagination for browsing recent additions.

### 👥 Advanced Employee Management
* **Smart Search:** Multi-column search (Name, Email, Position, Department).
* **Sticky Table Headers:** Optimized UX for viewing large datasets.
* **Soft Delete System:**
    * **Toggle Status:** Deactivate employees (Soft Delete) with a warning dialog.
    * **Trash:** Permanently delete employees (Hard Delete) with a danger dialog.

### 🛡️ Robust Validation & UX
* **Real-time Validation:** Forms utilize Zod schema validation (e.g., Minimum Salary IDR 1M, valid Email).
* **Feedback System:** Dynamic Toast notifications (Success, Error, Info) and Loading Skeletons.
* **Responsive Design:** Fully optimized for Mobile and Desktop views.

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api/employees`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get list (Filter, Search, Paginate) | - |
| `GET` | `/:id` | Get single employee details | - |
| `POST` | `/` | Create new employee | `{ name, email, ... }` |
| `PUT` | `/:id` | Update employee details | `{ name, ... }` |
| `DELETE`| `/:id` | Permanently delete employee | - |
| `GET` | `/stats` | Get Dashboard analytics | - |

**Sample Curl Command (Search):**
```bash
curl "http://localhost:5000/api/employees?search=Manager&page=1&limit=5"

## 📂 Project Structure

```text
root/
├── backend/                  # REST API Service
│   ├── prisma/               # Database Schema
│   ├── src/
│   │   ├── config/           # DB Connection (Singleton)
│   │   ├── controllers/      # Business Logic
│   │   ├── middleware/       # Global Error Handling
│   │   ├── utils/            # Zod Schemas
│   │   ├── app.ts            # Express App Setup
│   │   └── server.ts         # Server Entry Point
│   └── Dockerfile
├── frontend/                 # React UI Service
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/    # Dashboard Widgets
│   │   │   ├── employees/    # Employee Features (Table, Filter)
│   │   │   └── ui/           # Reusable Atomic Components (Card, Dialog)
│   │   ├── hooks/            # Custom React Query Hooks
│   │   ├── pages/            # Page Controllers
│   │   └── lib/              # Schemas & Axios Config
│   └── Dockerfile
├── database/
│   └── init.sql              # Auto-seeding Script
├── docker-compose.yml        # Orchestration Config
└── README.md