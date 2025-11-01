# TapTalent.ai Full Stack Development Internship Assignment

**Submission by Anurag Singh**
**Date:** 01 November, 2025

This project is a fully functional "Weather Analytics Dashboard," built in response to the assignment provided by TapTalent.ai for the Full Stack Development internship position.

### ✨ **Live Demo URL** &rarr; **[https://weather-dashboard-six-mu.vercel.app/]**

---

## 📸 Project Screenshots



---

## 🚀 Features Implemented

This application meets all core requirements specified in the assignment PDF, along with several bonus features to demonstrate technical proficiency and a thorough approach.

### Core Requirements
* **Dynamic Dashboard:** A "frosted glass" UI displaying summary cards for all favorite locations.
* **Real-Time Weather:** Fetches live weather data from the OpenWeatherMap API.
* **City Search:** A fast, API-based search bar that provides autocompletion for cities worldwide.
* **Detailed Analytics View:** A dedicated page with in-depth analytics, including:
    * Current conditions (Feels Like, Pressure, Humidity, Visibility).
    * Hourly temperature forecast chart.
    * 5-day min/max temperature forecast chart.
* **Data Visualizations:** Clean, interactive, and responsive charts built with **Recharts**.
* **Unit Toggling:** Instantly switches all temperature and speed units between Metric (°C, m/s) and Imperial (°F, mph).
* **Persistent Favorites:** Favorites are saved in `localStorage` to persist between sessions.
* **Responsive Design:** A mobile-first design that looks and works correctly on all devices.

### 🏆 Bonus Features
* **Google Authentication:** Full integration with Google Sign-In (OAuth 2.0).
* **Advanced State Persistence:** The application uses Redux Middleware to intelligently manage `localStorage`. It maintains separate, persistent favorite lists for "guest" users versus authenticated users, loading the correct list upon login/logout.
* **Efficient API Caching (RTK Query):** All API calls are handled via RTK Query, providing automatic caching, request de-duplication, and real-time data re-fetching (auto-refreshing every 60s) to minimize API usage and ensure data is current.
* **Modern UI Skeletons:** Professional loading skeletons are shown while data is being fetched to improve the perceived performance and user experience.
* **Robust Error Handling:** The UI gracefully handles and displays API errors (e.g., failed data fetch) without crashing.

---

## 🛠️ Technology Stack

-   **Frontend:** React (with Hooks)
-   **State Management:** Redux Toolkit (featuring Slices, Middleware, and RTK Query)
-   **API & Caching:** RTK Query
-   **Routing:** React Router DOM
-   **Charting:** Recharts
-   **Authentication:** `@react-oauth/google`
-   **Data Fetching:** Axios
-   **Build Tool:** Vite
-   **Deployment:** Vercel

---

## ⚙️ Local Setup and Installation

To run this project locally, please follow these steps:

**1. Clone the repository:**
```bash
git clone https://github.com/anurag7276/weather-dashboard.git
cd weather-dashboard
```
**2. Install dependencies:**
```bash
npm install
```
**3. Set up Environment Variables:**
```bash
#You must create a .env file in the root of the project.
# This file is critical for providing the necessary API keys.

# .env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```
**4. Run the development server:**
```bash
npm run dev
#The application will be available at http://localhost:5173.
```
**🔑 Required API Keys**

This project requires two API keys to function:
**1.OpenWeatherMap API Key:**


Go to OpenWeatherMap.

Sign up for a free account.

Navigate to "My API Keys" and copy your key.

Note: The free plan's API endpoints (/weather and /forecast) are used.




**2.Google OAuth Client ID:**


Go to the Google Cloud Console.

Create a new project.

Set up the "OAuth consent screen".

Go to "Credentials", create a new "OAuth client ID" for a "Web application".

Add http://localhost:5173 to the "Authorized JavaScript origins" for local testing.

(The live deployment URL must also be added here).
```

