# 🩺 Smart Health Prediction System 🧠

An intelligent web application designed to predict the risk of multiple diseases using machine learning. This project provides a seamless user experience for inputting medical data, receiving instant AI-powered predictions, and managing a history of health reports.

## ✨ Key Features

  * **Multi-Disease Prediction:** Utilizes distinct machine learning models to assess the risk for a variety of conditions, including:
      * ❤️ Heart Disease
      * 🩸 Diabetes
      * 🩺 Cancer
      * ...and many more\!
  * **AI-Powered Analysis:** The core of the application is a Python-based ML service that performs the complex calculations for accurate predictions.
  * **Report Management:** Users can view, filter, and manage their entire history of prediction reports, which are securely stored in a database.
  * **Modern Frontend:** A clean, responsive, and user-friendly interface built with **React** and **TypeScript**.
  * **Scalable Backend:** A powerful two-part backend system featuring a **Node.js API** for handling web traffic and a **Python service** for machine learning.

## 🛠️ Tech Stack

  * **Frontend:** React, TypeScript, Vite, Tailwind CSS
  * **Backend (API 'Waiter'):** Node.js, Express.js
  * **Backend (ML 'Brain'):** Python, Flask, Scikit-learn, Pandas
  * **Database:** MongoDB

## ⚙️ How It Works

The application uses a unique two-part backend architecture for efficiency and scalability:

1.  **The 'Waiter' (Node.js API):** The frontend sends all user data and requests to this server. It manages the database and communicates with the 'Brain'.
2.  **The 'Brain' (Python ML Service):** This specialized server receives data from the 'Waiter', loads the appropriate ML model, makes a prediction, and sends the simple result back.

This separation of concerns allows the application to handle web traffic and complex AI calculations efficiently.

## 🚀 Getting Started

To run this project locally, you will need to start all three parts of the application in separate terminals.

1.  **Start the Python 'Brain' 🧠:**
    ```bash
    cd backend/ml-service
    # Activate virtual environment
    python brain_server.py
    ```
2.  **Start the Node.js 'Waiter' 🗣️:**
    ```bash
    cd backend/api-server
    node waiter_server.js
    ```
3.  **Start the React Frontend 🖥️:**
    ```bash
    cd frontend
    npm run dev
    ```
