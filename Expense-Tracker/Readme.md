# 💸 Expense Tracker (with Charts)

An **Expense Tracker** web application built with **Django (backend)** and **React (frontend)**.  
It allows users to **add, filter, and visualize expenses** with interactive charts.  
Authentication is implemented with **protected routes**, ensuring only logged-in users can access their data.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Secure login & signup system (Django auth / JWT).
  - Protected routes for authorized access only.

- 📊 **Expense Management**
  - Add, update, and delete expenses.
  - Each expense includes:
    - Title  
    - Amount  
    - Category  
    - Date  

- 🔎 **Filtering**
  - Filter by **date range** (start & end date).
  - Filter by **category** (e.g., Food, Transport, Bills, etc.).

- 📈 **Data Visualization**
  - Integrated with **Chart.js** via `react-chartjs-2`.
  - Dynamic charts to track spending trends:
    - Pie chart → Expense breakdown by category.
    - Line/Bar chart → Expenses over time.

---

## 🛠️ Tech Stack

**Frontend**:
- React  
- Tailwind CSS (UI styling)  
- `react-chartjs-2` (Chart.js wrapper)  

**Backend**:
- Django REST Framework (API)  
- SQLite / PostgreSQL (database)  

**Other**:
- JWT Authentication  
- Axios for API calls  

---
## Django Installation ##
- pip install -r requirements.txt

## React Installation ##
- npm install / npm i