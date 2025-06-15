# 📱 Point A to B – React Native App

A React Native app to search routes from one city to another and sign in using Google.

---

## 🔧 Prerequisites

1. Node.js ≥ 16.x
2. React Native CLI  
3. Android Studio / Emulator OR Physical Android device  
4. Firebase project with Google Sign-In enabled

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/ChouhanAkash/distance.git
cd distance
# Install Dependency
npm install
# OR
yarn install

# Configure Google Signin

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', 
  offlineAccess: true,
});

### Run The App
npm start
# OR
yarn start


✅ Features
🔐 Google Login with Encrypted Storage

📍 Static Route Search (e.g. Delhi to Mumbai)

🗺️ Map view with markers and polylines

⚡ Fast Refresh & Hot Reload

📂 Folder Highlights
Login.js → Google Sign-In screen

Home.js → Map + Route Info screen

routes.js → Static city-to-city route info

navigation/ → React Navigation setup

❗ Common Errors
Google Sign-In error: Double-check WebClientID

Metro stuck: Run npx react-native start --reset-cache

SHA-1 missing: Add it to Firebase Android app settings



🙌 Author
Developed by Akash Chouhan
GitHub: @ChouhanAkash
