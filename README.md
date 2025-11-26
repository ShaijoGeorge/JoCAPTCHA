# 🛡️ JoCAPTCHA - Context-Aware CAPTCHA System

**JoCAPTCHA** is a modern, high-security, and user-friendly CAPTCHA system designed to distinguish humans from bots using behavioral analysis and multi-modal challenges. Unlike traditional CAPTCHAs that rely on annoying text decryption, JoCAPTCHA uses interactive micro-tasks that are easy for humans but difficult for automated scripts.

![Project Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-FastAPI%20|%20React%20|%20Redis%20|%20Tailwind-blue?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=flat-square&logo=redis&logoColor=white)

---

## ✨ Key Features

### 🧩 Multi-Modal Challenges
JoCAPTCHA supports three distinct types of challenges to prevent bot adaptation:
* **Odd-One-Out:** 🖼️ Semantic image analysis where users identify the outlier in a set.
* **Drag & Drop:** 🎯 Tests motor skills and hand-eye coordination by requiring users to drag an object to a target zone.
* **Rotate:** 🔄 Tests spatial awareness by asking users to rotate an object to its upright position.

### ⚙️ Admin Playground
A built-in configuration dashboard that allows administrators to:
* **Toggle Challenges:** ✅ Enable or disable specific challenge types in real-time.
* **Adjust Difficulty:** 🎚️ Fine-tune the "tolerance" of challenges (e.g., how precise a rotation or drag needs to be) using a slider.
* **Live Testing:** 🚀 Save configurations and immediately test them in the demo widget.

### 🛠️ Developer Console (Debug Panel)
A live observability panel for developers that displays:
* **Real-time API Logs:** 📊 View the JSON payloads sent between the frontend and backend.
* **System Status:** 🟢 Monitor the connection status of the FastAPI backend.
* **Verification Results:** ✔️ See the detailed success/failure logic and generated security tokens (JWT simulation).

### 🚀 High Performance
* **Redis-Powered:** ⚡ Uses Redis for sub-millisecond storage of challenge state, answers, and settings.
* **Stateless API:** 🔧 The FastAPI backend is fully stateless, making it easy to scale.

---

## 🏗️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend** | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) |
| **Database/Cache** | ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) |
| **State Management** | React Hooks & Context |
| **Icons** | Lucide React Icons |

---

## 📦 Installation & Setup

### Prerequisites
* **Python 3.8+** 🐍
* **Node.js 16+** 🟢
* **Redis** 🔴 (Must be running locally or via Docker)

### 1️⃣ Backend Setup (FastAPI)

Navigate to the backend directory and set up the Python environment.

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload
```

✅ The backend will run on `http://127.0.0.1:8000`

### 2️⃣ Frontend Setup (React)

Open a new terminal, navigate to the frontend directory, and start the client.

```bash
cd frontend/captcha-frontend

# Install dependencies
npm install

# Start the development server
npm start
```

✅ The frontend will open at `http://localhost:3000`

---

## 🎮 How to Use

1. **Open the App:** 🌐 Go to `http://localhost:3000`.

2. **Try the Demo:** 🎯 Click "Start Verification" on the Demo tab to see the CAPTCHA in action.

3. **Inspect Debug Data:** 🔍 Watch the Developer Console on the right side of the screen to see how your interactions are verified by the backend.

4. **Configure Settings:**
   - Go to the **Playground** tab. ⚙️
   - Change the **Difficulty Level** (0% - 100%). 🎚️
   - Enable or disable specific challenge types (e.g., uncheck "Odd One Out" to only see "Rotate" challenges). ✅
   - Click **Save Configuration**. 💾
   - Click **"Go to Demo to Test Changes"** to verify your new settings immediately. 🚀

---

## 📂 Project Structure

```
jocaptcha/
├── backend/
│   ├── app/
│   │   ├── assets/          # 🖼️ Images for challenges (animals, fruits, etc.)
│   │   ├── models/          # 📋 Pydantic models for API validation
│   │   ├── routes/          # 🛣️ API endpoints (challenge, admin, etc.)
│   │   ├── services/        # ⚙️ Core logic for generating/verifying challenges
│   │   ├── config.py        # 🔧 Configuration settings
│   │   ├── main.py          # 🚀 Application entry point
│   │   └── redis_client.py  # 🔴 Redis connection handler
│   └── requirements.txt
│
├── frontend/captcha-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── captcha/     # 🧩 CAPTCHA widget components (Shell, Challenges)
│   │   │   ├── layout/      # 📐 Layout components (Navbar, DebugPanel, Footer)
│   │   │   └── pages/       # 📄 Main pages (Demo, Docs, Playground)
│   │   ├── services/        # 🔌 API integration (fetch calls)
│   │   └── App.js           # 🎯 Main application router
│   └── tailwind.config.js
└── README.md
```

---

## 🌟 Why JoCAPTCHA?

✅ **User-Friendly:** No more squinting at distorted text  
✅ **Secure:** Multi-modal challenges that adapt to prevent bot exploitation  
✅ **Scalable:** Stateless architecture powered by Redis  
✅ **Developer-Friendly:** Built-in debug panel and configuration playground  
✅ **Open Source:** Free to use, modify, and contribute  

---

## 👤 Credits

Created with ❤️ by **Shaijo George** as a robust, open-source CAPTCHA alternative.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ShaijoGeorge/JoCAPTCHA/issues).

---

<div align="center">

**⭐ If you find JoCAPTCHA useful, please give it a star! ⭐**

Made with 🛡️ by a developer, for developers

</div>