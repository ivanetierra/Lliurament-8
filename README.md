# Sprint 8 | Inprocode | Full Stack Project | Angular, Node.js, MySQL Integration


## 📄 Description

This project is a full-stack web application built with **Angular 18**, **Node.js**, and **MySQL**. It demonstrates common functionalities like mapping, calendar event management, and data visualization through charts. The app features a **REST API** for CRUD operations, connected to a MySQL database, and a responsive user interface built with Angular and Tailwind CSS.

### Key Features:
- **Home Page**: Displays introductory content.
- **Map**: Allows users to add and remove map locations, with the data stored in the MySQL database.
- **FullCalendar**: Users can add and delete events, which are saved in the database.
- **Charts**: Visual representation of product data, including stock quantities (bar chart) and price distribution (pie chart).

## 💻 Technologies Used

- **Frontend**:
  - Angular 18
  - TypeScript
  - Tailwind CSS for styling
  - FullCalendar for interactive calendar management
  - Chart.js for data visualization
  - Google Maps API

- **Backend**:
  - Node.js (with Express)
  - MySQL (Sequelize ORM)
  - CORS and dotenv for configuration management
  - Nodemon for backend auto-reloading

## 📋 Requirements 

To run this project, ensure you have the following installed:

- **Node.js** and **npm**
- **MySQL**

## 🛠️ Setup Instructions

Follow these steps to set up the project:

### 1. Clone the Repository:
```bash
git clone https://github.com/ivanetierra/Lliurament-8
```

### 2. Backend Setup:

1. **Install dependencies**:
-open new terminal
   ```bash
   cd server
   npm install
   ```

2. **Start the TypeScript compiler in watch mode:**
   ```bash
   tsc -w
   ```

3. **Start the backend with Nodemon**
   -open new terminal
   ```bash
   nodemon dist/index.js
   ```
