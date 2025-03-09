# 🚀 SecureConnect - Authentication System (Next.js + Node.js + MongoDB Atlas)

Welcome to **SecureConnect**, a **secure and user-friendly authentication system!** 🚀  
In a world where **security is key**, our mission is to create a rock-solid **signup and login system** with proper **validation, error handling, and user-friendly feedback.**  

---

### 🔒 With **SecureConnect**, users will:
✅ **Sign up securely** with a **unique username** and **strong password**.  
✅ **Log in smoothly** and be greeted with a **personalized message**.  
✅ **Experience a polished user interface** with **validation rules & error management**.  

This project **tests your ability** to:
- Enforce **validation rules**
- Manage **errors effectively**
- Create a **seamless user experience**

💡 **Ready to Xcelerate your way to the top? Let’s go!** 🚀  

---
## 📌 Features

✅ **User Authentication** (Sign Up & Sign In)  
✅ **JWT Token-based Authentication**  
✅ **MongoDB Atlas as Cloud Database**  
✅ **Express.js for Backend API**  
✅ **Tailwind CSS for Styling**  
✅ **REST API with Secure Endpoints**  
✅ **Validation & Error Handling**  

---

## 🛠 Tech Stack

### **Frontend**
- **Next.js** (React-based framework)
- **Tailwind CSS** (for styling)
- **Axios** (for API calls)

### **Backend**
- **Node.js + Express.js**
- **MongoDB Atlas** (Cloud Database)
- **Bcrypt.js** (for password hashing)
- **JSON Web Tokens (JWT)** (for authentication)

---

## 📥 Installation & Setup

### Step 1️⃣ Clone the Repository
```sh
git clone https://github.com/praveesha/SpiritX_TetraBytes_01.git
cd SpiritX_TetraBytes_01
```

### Step 2️⃣: Setup and Install Dependencies
#### 2.1 Backend Setup:
```
cd server
npm install
npm run dev
```
- The backend will be running on **http://localhost:5001**
#### 2.2 Frontend  Setup:
```
cd client
npm install
npm run dev
```
- The frontend will be available at **http://localhost:3000**

### Step 3️⃣: Configure Environment Variables
#### 3.1 add .env
```
PORT=5001
MONGO_URI="MONGODB_URI=mongodb+srv://kolombagemn22:wVRHyfwewINZ3KIV@cluster0.7pvem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="=YouAreTheBest123"

```
### Step 4️⃣: Database Setup (MongoDB Atlas)
- Go to MongoDB Atlas.
- Create a new cluster and a new database.
- Obtain the MongoDB connection string.
- Replace MONGO_URI in .env with your connection string.
