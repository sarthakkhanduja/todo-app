# Welcome to GetToWork!
_**A glorified to-do application**_

This project is currently [LIVE](https://gettowork.vercel.app)

Your destination for interactive task management with analysis capabilities.


<br>

The features of the project are - 

- The application can host multiple users.
- Each user can create multiple projects _(Think of these as categories of the tasks you would want to maintain)_
- Every Project can have multiple to-do's or tasks.
- Every project also has a dedicated dashboard for you to track multiple metrics of your project's progress.
- Every Project and To-do has the CRUD capabilities.
<br>

## Table of Contents
1. [Invitation to Contribute](#invitation-to-contribute)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Tech Stack](#tech-stack)
5. [Future Work](#future-work)

<br>

# [Invitation to Contribute](#invitation-to-contribute)
This repository is open-sourced to allow developers to practice their skills and get a know-how of how open-source contributions work.
> I hereby invite developers to pick up a future work prospect from the section below and controbute to the project.
> This would not only hone your open-source contributions and skills, but also allow this app to grow

<br>


<br>

# [Installation](#installation)

Clone the repository onto your system:
```
git clone todo-app
```
<br>

### Backend

Navigate to the `backend` directory from the root directory where you have to `todo-app` installed:
```bash
cd todo-app/backend
```

Install the required dependencies:
```
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB connection URI:
```
MONGOURI=<your-mongoDB-connection-URI>
```
<br>

### Frontend

Navigate to the `frontend` directory from the root directory where you have to `todo-app` installed:
```bash
cd todo-app/frontend
```

Install the required dependencies:
```
npm install
```


# [Usage](#usage)

Use two separate terminals to start the backend and the frontend servers - 

<br>

### Frontend

Navigate to the `frontend` directory from the root directory where you have to `todo-app` installed, and start the development server using the following command:
```bash
cd todo-app/frontend
npm run dev
```

### Backend

Navigate to the `backend` directory from the root directory where you have to `todo-app` installed, and start the server using the following command:
```bash
cd todo-app/backend
npx nodemon index.js
```
<br>

# [Tech Stack](#tech-stack)
This project uses a very beginner friendly blend of technologies - 
1. Node.js
2. React.js (Javascript)
3. MongoDB
4. Express.js
5. Tailwind CSS

<br>

# [Future Work](#future-work)

## Bugs
- >**Empty To-do's**  <br>  
   Currently, the user is allowed to create an empty to-do. There should be a validation function (already in the code) that should be triggered whenever an empty to-do is being made. (Empty descriptions are acceptable).
   <br>
- >**Responsive Design Issue**  <br>  
   In a mobile screen view (smaller than 'sm' breakpoint), the "Project Home" view looks pretty congested because the three columns are not resized properly. I'm unable to increase the width of the parent container of those columns.  <br>  
  >Steps to replicate - Run the project > Login (Sign up if you haven't) > Create a Project > Click on the project made in the sidebar > Switch to mobile screen view.
   <br>
  

## Features
- >**Hashing of passwords** <br>  
   Currently, the passwords are stored as is, within the database. It's imperative to store the passwords in a hashed format to ensure data privacy.
   This would require a hash function while a user is signing up, and signing a token only if the hashed value of entered password is the same as that in the database, while the user is trying to sign in.
   <br>

- >**Editting To-do's**  <br>  
   On double-clicking a to-do's title or description, the user should be able to edit it.
   <br>
  
- >**Visualization Info Icon OnHover**  <br>  
   For all the visualizations, it would be beneficial if the user can see what the visualization is trying to track. So, a modal being displayed on hovering over the Info icon on each visualization, which would consist of information about that particular visualization would be helpful.
   <br>
  
