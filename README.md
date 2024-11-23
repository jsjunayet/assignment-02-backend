
# Assignment-02

A robust Node.js and TypeScript-based application designed to streamline backend development with a focus on clean code practices, database integration, and development efficiency.

## 🚀 **Live URL**  
[https://assignment-02-backend.vercel.app/](#)  
*(Replace this with the actual deployment URL once the app is live)*

---

## 📜 **Project Overview**  
This project showcases backend development using modern tools like TypeScript, Express, and MongoDB. It emphasizes maintainable, scalable, and production-ready code.  

### **Features**  
- 🚀 **REST API**: Well-structured API endpoints.  
- 📂 **TypeScript Integration**: Type-safe backend for better code quality.  
- 🛠️ **Environment Configuration**: Configured using `dotenv`.  
- 🔍 **Linting and Formatting**: Integrated ESLint and Prettier for consistent code style.  
- 🌐 **Database**: MongoDB and Mongoose for robust data handling.  
- 🔄 **Development Tools**: Hot-reloading with `ts-node-dev` for smooth development.

---

## 🧰 **Technologies Used**  
- **Language**: TypeScript  
- **Framework**: Express.js  
- **Database**: MongoDB, Mongoose  
- **Development Tools**:  
  - `ESLint` and `Prettier` for linting and formatting.  
  - `ts-node-dev` and `nodemon` for auto-reloading in development.  

---

## 📦 **Getting Started**  

Follow these steps to set up the project locally:

### **Prerequisites**  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/)  

### **Installation**  

1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd assignment-02
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Set up the environment variables:  
   Create a `.env` file in the project root with the following content:  
   ```env
   PORT=5000
   MONGO_URI=<your-mongo-connection-string>
   ```

4. Build the project (TypeScript to JavaScript):  
   ```bash
   npm run build
   ```

5. Start the server in production mode:  
   ```bash
   npm run start:prod
   ```

6. For development with hot-reloading:  
   ```bash
   npm run start:dev
   ```

---

## 🛠️ **Available Scripts**  

### **Development**  
- `npm run start:dev`: Starts the server in development mode with hot-reloading.  

### **Production**  
- `npm run start:prod`: Runs the server in production mode after building.  

### **Build**  
- `npm run build`: Compiles TypeScript files to JavaScript.  

### **Linting**  
- `npm run lint`: Lint all TypeScript files using ESLint.  
- `npm run lint:fix`: Automatically fix linting errors.  

### **Formatting**  
- `npm run formet`: Formats all code using Prettier.  
- `npm run formet:fix`: Fixes code formatting issues.  
  
