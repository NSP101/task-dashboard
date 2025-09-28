# Task Management Dashboard

A responsive Task Management Dashboard built with React.js featuring drag-and-drop
functionality, task creation, editing, deletion, filtering, and local storage persistence.

--- 

## Demo Video

Watch the working demo: 
(view on Google drive)

 https://drive.google.com/file/d/1YxBVIb8gkS8dKqRWTVh_mnRh1gmP_gDg/view?usp=sharing


---

##  Screenshots

![Dashboard Screenshot 1](assets/working image.PNG)  
![Dashboard Screenshot 2](assets/working image 2.PNG)  

---

##  Features

- Create, edit, and delete tasks with categories and priorities  
- Drag-and-drop tasks between statuses (`Todo`, `In Progress`, `Done`)  
- Filter tasks by status, category, and priority  
- Search tasks by title  
- Local storage for data persistence (no backend required)  
- Keyboard shortcut `Ctrl + N` to quickly add a new task  
- Responsive and intuitive UI with toast notifications  

---

## Tech Stack

- React.js  
- JavaScript  
- CSS  
- LocalStorage  
- react-beautiful-dnd  
- react-toastify  

---

## Setup Instructions

1. Clone the repository:

   git clone https://github.com/NSP101/task-dashboard.git

   cd task-dashboard

2. Install dependencies:

   npm install


3. Start the development server:

   npm start

-----

 #### Approach

Used react-beautiful-dnd for drag-and-drop functionality.

Managed state with React hooks and persisted tasks using a custom useLocalStorage hook.

Implemented filtering, searching, and task sorting without any backend.

Provided visual feedback using react-toastify for a better user experience.

Focused on clean and responsive UI for both desktop and mobile screens.


#### Folder Structure

task-dashboard/
├── src/
│   ├── components/
│   │   ├── TaskCard.jsx
│   │   └── TaskList.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   └── App.jsx
├── assets/
│   ├── working image.PNG
│   ├── working image 2.PNG
│   └── working video(demo).webm
├── package.json
└── README.md

