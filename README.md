# Technical Exam

> A simple CRUD application demonstrating Laravel as API backend and a React app using Vite as frontend.

---

## Table of Contents

* [About](#about)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Contributing](#contributing)
* [Contact](#contact)

---

## About

This repository is a technical exam/assignment for the position of Fullstack Developer.

The project implements a simple CRUD operation with the following minimum requirements:

* Display and create users.
* Assign multiple roles to users.
* Technologies: Laravel 8, React + Vite + Tailwind + TypeScript, Docker.

---

## Features

* Create user
* Retrieve all users
* Filter users by role

---

## Installation

```bash
# Clone the repository
git clone https://github.com/FreL082998/S30-Laravel-ReactJS-Test.git

# Navigate into the project folder
cd S30-Laravel-ReactJS-Test

# Copy environment files
cp .env.example .env
# Update root .env file with your device's IPv4 address
cp api/.env.example api/.env
cp web/.env.example web/.env

# Update web .env file point VITE_API_BASE to your device's IPv4 address
VITE_API_BASE=http://192.168.8.188

# Build and run containers
docker-compose up --build -d

# Run migrations and seeders
docker-compose exec -it api php artisan migrate
docker-compose exec -it api php artisan db:seed

# Start frontend
cd web
npm install
npm run dev

# Open in browser
http://localhost:3000
```

---

## Usage

* Open the web app at `http://localhost:3000`.
* Create new users via the frontend form.
* View all users in the list.
* Filter users by role using the provided filter functionality.

---

## Configuration

* **API**: Configure the `.env` file in the `api` folder to set database credentials and other Laravel settings.
* **Frontend**: Update the `.env` file in the `web` folder to point to the correct API URL if needed.
* **Docker**: Ensure Docker is running on your system and ports `8000` (Laravel) and `3000` (React) are available.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Make your changes and commit: `git commit -m "Add feature"`.
4. Push to your branch: `git push origin feature/YourFeature`.
5. Create a Pull Request.

---

## Contact

* **Author**: FreL082998
* **GitHub**: [https://github.com/FreL082998](https://github.com/FreL082998)
* **Email**: [frl082998@gmail.com](mailto:frl082998@gmail.com)
