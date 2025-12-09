# 🏢 Employee Management System (EMS)

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

The application runs on a multi-container architecture orchestrated by Docker Compose.

```mermaid
graph LR
    User[Browser Client] -- HTTP/JSON --> Frontend[React Container :5173]
    Frontend -- REST API --> Backend[Node API Container :5000]
    Backend -- TCP --> Database[PostgreSQL Container :5432]
```

---

## ⚙ Prerequisites

To run this application as intended (containerized), ensure your system meets the following requirements:

### Required Software
* **Docker Desktop** (Engine v20.10+) - *Primary requirement for Part 4 evaluation.*
* **Git** (For cloning the repository).

### System Requirements
* **OS:** Windows 10/11 (WSL2), macOS, or Linux.
* **RAM:** Minimum 4GB (8GB recommended for running multiple containers).
* **Ports:** Ensure ports `5000` (Backend), `5173` (Frontend), and `5433` (Database Host) are available.

*Note: Node.js and PostgreSQL do **not** need to be installed locally as they run within isolated Docker containers.*

---

## 🚀 Installation & Setup

Follow these step-by-step instructions to get the application running.

### 1. Clone the repository
Open your terminal and run:
```bash
git clone <repository-url>
cd employee-management-system
```

---

### 2. Install dependencies (Optional)
Note: Docker will automatically install dependencies inside the containers. Run this locally only if you want code completion/intellisense in VS Code.

```bash
# Backend
cd backend && npm install
# Frontend
cd ../frontend && npm install
cd ..
```

---

### 3. Configure environment variables
The application requires environment variables to connect the services securely.

1.  Create a `.env` file in the **root directory**.
2.  Copy the content from `.env.example`.
```bash
cp .env.example .env
```

### 4. Run with Docker Compose
This command will build the images, create the network, start the database, and launch the application.

```bash
docker-compose up --build
```

### 5. Access the application
Once the containers are running, access the services via your browser:

* **Frontend (UI):** [http://localhost:5173](http://localhost:5173)
* **Backend (API Check):** [http://localhost:5000](http://localhost:5000)
