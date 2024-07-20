# User auth

This project is a user management web application. The application is built using React, with user data stored using Firebase. The application allows users to register and authenticate, and provides an admin panel for managing users.

## [Live Demo]()

Please click on the link above to see the deployed app.

## Features

- User Registration and Authentication: Users can register and log in to the application. Authentication is required to access the admin panel.
- Admin Panel: Accessible only by authenticated users, the admin panel displays a table of all users with the following details:
  - Name
  - Email
  - Last Login Time
  - Registration Time
  - Status (Active/Blocked)
- User Management: The admin panel includes checkboxes for multiple selection and a toolbar with actions to:
  - Block users
  - Unblock users
  - Delete user
- Self-Management: Users can block or delete their own accounts.
- Restricted Access: Blocked users cannot log in.
- Passwords: Users can use any password longer than or equal to 6 characters.
- CSS Framework: The application uses a Material UI.

## Installing

1. Clone the repository
2. Install dependencies. Run the next command in the root folder of this app.

```
npm install
```

3. Set up your firebase config in a .env file with the keys in the .env.example

4. Run the app. In the same path where you installed the dependencies run the next command to run the app in dev mode.

```
npm run dev
```

## [Video]()

Click on the link above to see a video on how the app works.
