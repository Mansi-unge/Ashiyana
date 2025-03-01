# Ashiyana - Real Estate Platform 🏡

## Overview
Ashiyana is a **MERN full-stack real estate platform** that enables users to browse, book, and manage property visits seamlessly. It provides a feature-rich experience for both property seekers and real estate professionals, including wishlist management, interactive maps, user reviews, and role-based access control.

## Features 🚀
- **Property Listings** 📌 - View and explore properties with details and images.
- **Book Property Visits** 📅 - Schedule a visit to your favorite properties.
- **Wishlist Integration** ❤️ - Save properties to your wishlist for later.
- **Secure Authentication** 🔐 - Auth0-based authentication with Role-Based Access Control (RBAC).
- **Email & SMS Notifications** 📩 - Get notified about property updates and bookings.
- **Leaflet Map Integration** 📍 - Interactive property location visualization.

## Tech Stack 🛠️
- **Frontend:** React.js, Tailwind CSS, Leaflet Map
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Maps & API Integrations:** Google Places API, Leaflet

## Installation & Setup ⚙️
### Prerequisites
Ensure you have the following installed:
- **Node.js**
- **MongoDB Atlas (or local MongoDB instance)**

### Clone the Repository
```sh
git clone https://github.com/Mansi-unge/Ashiyana.git
```

### Install Dependencies
#### Backend
```sh
cd server
npm install
```
#### Frontend
```sh
cd client
npm install
```

### Configure Environment Variables
Create a `.env` file in both `server/` and `client/` directories and configure the following:
#### Backend (`backend/.env`)
```
MONGO_URI=your_mongodb_connection_string
```

### Start the Application
#### Run Backend
```sh
cd backend
npm start
```
#### Run Frontend
```sh
cd frontend
npm start
```

## API Endpoints 📡
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/properties` | GET | Fetch all properties |
| `/api/properties/:id` | GET | Get property by ID |
| `/api/bookings` | POST | Book a visit |
| `/api/wishlist` | GET | Get wishlist items |
| `/api/reviews` | POST | Add property review |

## Contributing 🤝
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes
4. Push to the branch
5. Create a pull request


## Contact 📧
For queries or collaborations, reach out at **mansiunge@gmail.com** or connect on [LinkedIn](https://www.linkedin.com/in/mansi-unge-8825ba312).

---
💙 Built with passion for seamless real estate experiences!
