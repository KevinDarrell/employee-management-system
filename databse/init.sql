CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    salary INTEGER NOT NULL,
    hire_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO employees (name, email, position, department, salary, hire_date, status) VALUES 
('Budi Santoso', 'budi@company.com', 'Software Engineer', 'IT', 15000000, '2023-01-15', 'active'),
('Siti Aminah', 'siti@company.com', 'HR Manager', 'HR', 18000000, '2022-05-20', 'active'),
('Andi Pratama', 'andi@company.com', 'Product Owner', 'Product', 20000000, '2021-11-10', 'active'),
('Dewi Lestari', 'dewi@company.com', 'QA Engineer', 'IT', 12000000, '2023-03-01', 'active'),
('Rudi Hermawan', 'rudi@company.com', 'Marketing Specialist', 'Marketing', 10000000, '2023-06-15', 'inactive')
ON CONFLICT (email) DO NOTHING;