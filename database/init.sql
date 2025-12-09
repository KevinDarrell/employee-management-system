SET timezone = 'Asia/Jakarta';

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "salary" INTEGER NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL, 
    "status" VARCHAR(50) DEFAULT 'active',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "employees" ("name", "email", "position", "department", "salary", "hire_date", "status", "createdAt", "updatedAt") VALUES 
('Budi Santoso', 'budi@company.com', 'Senior Backend Engineer', 'IT', 18000000, '2023-01-15 00:00:00', 'active', NOW(), NOW()),
('Siti Aminah', 'siti@company.com', 'HR Manager', 'HR', 25000000, '2022-05-20 00:00:00', 'active', NOW(), NOW()),
('Andi Pratama', 'andi@company.com', 'Product Owner', 'Product', 30000000, '2021-11-10 00:00:00', 'active', NOW(), NOW()),
('Dewi Lestari', 'dewi@company.com', 'QA Engineer', 'IT', 12000000, '2023-03-01 00:00:00', 'active', NOW(), NOW()),
('Rudi Hermawan', 'rudi@company.com', 'Marketing Lead', 'Marketing', 15000000, '2023-06-15 00:00:00', 'inactive', NOW(), NOW()),
('Eka Saputra', 'eka@company.com', 'DevOps Engineer', 'IT', 22000000, '2024-01-10 00:00:00', 'active', NOW(), NOW()),
('Maya Putri', 'maya@company.com', 'UI/UX Designer', 'Product', 14000000, '2023-08-22 00:00:00', 'active', NOW(), NOW());