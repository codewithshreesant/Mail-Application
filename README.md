# MERN Mail Web Application
![MERN Stack](https://img.shields.io/badge/Tech-MERN%20Stack-brightgreen.svg)
![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind%20CSS-blue.svg)

This is a full-stack email web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with Tailwind CSS for styling. It allows users to compose, send, receive, and manage their emails with features like Inbox, Sent, Drafts, Recent, and Important folders. It also includes an admin panel for managing the application.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
* [Configuration](#configuration)
    * [Environment Variables](#environment-variables)
    * [Nodemailer Setup](#nodemailer-setup)
* [Running the Application](#running-the-application)
    * [Running the Backend](#running-the-backend)
    * [Running the Frontend](#running-the-frontend)
* [Admin Panel](#admin-panel)
* [Folder Structure](#folder-structure)
* [Contributing](#contributing)
* [License](#license)
* [Acknowledgements](#acknowledgements)

## Features

* **User Authentication:** Secure registration and login for users.
* **Compose Email:** Rich text editor for composing new emails.
* **Inbox:** View received emails.
* **Sent:** Track sent emails.
* **Drafts:** Save and manage unfinished emails.
* **Recent:** Quickly access recently viewed or interacted with emails.
* **Important:** Mark and view important emails.
* **Email Management:** Basic actions like reading, deleting (soft delete), and marking as important.
* **Admin Panel:** (Details of admin features to be added here, e.g., user management, email monitoring, etc.)
* **Responsive Design:** Built with Tailwind CSS for a consistent experience across different devices.

## Technologies Used

**Backend:**

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/) (for MongoDB object modeling)
* [Nodemailer](https://nodemailer.com/) (for sending emails)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) (for password hashing)
* [jsonwebtoken](https://jwt.io/) (for authentication)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser) (for handling cookies)
* [cors](https://www.npmjs.com/package/cors) (for enabling Cross-Origin Resource Sharing)
* [dotenv](https://www.npmjs.com/package/dotenv) (for managing environment variables)


**Frontend:**

* [React.js](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/) (for styling)
* [React Router](https://reactrouter.com/) (for frontend routing)
* [Redux Toolkit](https://redux-toolkit.js.org/) (for state management - *if you used it*)
* [Axios](https://axios-http.com/) (for making HTTP requests - *if you used it directly*)
* [React Icons](https://react-icons.github.io/react-icons/) or [@fortawesome/react-fontawesome](https://fontawesome.com/docs/web/use-with/react/) (for icons)


## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/download/) (LTS version recommended)
* [npm](https://www.npmjs.com/get-npm/) (usually installed with Node.js) or [Yarn](https://yarnpkg.com/getting-started/installation)
* [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance)

## Installation

Follow these steps to get the application running on your local machine:

### Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_REPOSITORY_NAME>/backend
    ```

2.  **Install backend dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Using Yarn:

    ```bash
    yarn install
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install frontend dependencies:**

    Using npm:

    ```bash
    npm install
    ```

## Configuration

### Environment Variables

You need to create `.env` files in both the `backend` and `frontend` directories to store sensitive information and configuration.


