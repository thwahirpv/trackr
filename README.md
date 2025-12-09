# 🚀 Trackr

**Trackr** is a modern, responsive job application tracking dashboard designed to help job seekers organize their job haunt efficiently. With a sleek glassmorphism design and intuitive interface, it allows users to track applications, monitor interview rates, and set monthly goals.

![Trackr Dashboard](https://github.com/thwahirpv/Trackr/tree/main/public/dashboard.png)


## ✨ Features

*   **📊 Analytics Dashboard**: Visual overview of your progress, including Total Applied, Interview Rate, and Offers received.
*   **🎯 Goal Setting**: Set and update monthly application goals to stay motivated.
*   **📝 Job Management**: Add, edit, and delete job applications with details like Company, Position, Salary, and Status.
*   **🚦 Status Tracking**: Easily toggle statuses (Applied, Interview, Offer, Rejected) and track follow-ups (Called, Mailed).
*   **📱 Fully Responsive**: Seamless experience across Desktop and Mobile devices with a custom mobile navigation menu.
*   **🔐 Authentication**: Secure custom Login and Registration system with session management.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: JavaScript / React
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
*   **Utilities**: `use-debounce`, `clsx`, `tailwind-merge`

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/trackr.git
    cd trackr
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your MongoDB connection string and a secret key for sessions.
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/trackr
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit `http://localhost:3000` in your browser.

## 📂 Project Structure

*   `src/app`: Main application routes and pages.
*   `src/app/_components`: Reusable UI components.
*   `src/app/actions`: Server Actions for data mutation and auth.
*   `src/lib`: Utility functions (Database connection, Session management).
*   `src/model`: Mongoose schemas.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


