# PDF Management and Collaboration System 

This is the  repository of the frontend of "PDF Management & Collaboration System". Backend was developed in a separate repository [here](https://github.com/mirirtiqa/SpotDraftTaskBackend)

Public link of Application - [spot-draft-task-frontend.vercel.app](spot-draft-task-frontend.vercel.app)
---

##  Features

-  Login/Signup with JWT-based auth
-  Upload PDFs
-  View PDFs with secure access
-  Share PDFs using unique link or invite users using email
-  Comment on PDFs (for both public and authenticated users)
-  Dashboard that lists PDFs with search and date filter
-  Google Cloud Storage to store files.
-  MongoDb to store user information (name, hashed password, user's uploaded pdf details, comments on pdf's)
-  Reset Password using link if user forgets password.
-  Uses ContextAPI and LocalStorage to store user's name, email and token
-  Responsive Website

---

##  Tech Stack

- Next.js  
- Material UI
- Context API
- Google Cloud Storage (via backend API)
- Mongodb
- Express
- Nodejs
- Nodemailer for sending emails

---

##  Installation

### 1. Clone the repo

```bash
git clone https://github.com/mirirtiqa/SpotDraftTaskFrontend.git
cd pdf-app
```

### 2. Install dependencies

```bash
npm install
```

---

##  Configuration

Update API endpoint if needed (by default connects to deployed backend at (https://spotdrafttaskbackend.onrender.com)

```js
// utils/apis.js 
const baseUrl = 'https://spotdrafttaskbackend.onrender.com';
```

---

##  Project Structure (Highlights)

```
src/
├── app/
│   ├── login/             → user login form
│   ├── signup/            → user registration form
│   ├── dashboard/         → user dashboard with uploaded PDF list
│   ├── pdf/[id]/          → dynamic route for viewing + commenting on a specific PDF
│   ├── shared/[token]/    → dynamic route for viewing shared PDFs and commenting on them 
├── components/
│   ├── Navbar.jsx          → Navbar component
│   ├── PDFUploader.jsx     → uploads files(only PDFs)
│   ├── PDFViewer.jsx       → left panel (iframe) on page pdf/[id] and page shared/[token]
│   ├── PDFComments.jsx     → right panel (comment system) on page pdf/[id] and page shared/[token]
|   ├── ShareButton.jsx     → Open a Dialog Box which has unique share pdf link that can be copied. The Dialog box also has option to send the same link using email.  
├── context/
│   └── AuthContext.js     → global login/signupfunctions and has global state for user and the pdf's of the user
├── theme.js               → MUI theme
```

---

##  Running the App

```bash
npm run dev
```


##  Note:

- If you dont' want to use the deployed Backend for this Application on render then make sure the [backend repo](https://github.com/mirirtiqa/SpotDraftTaskBackend) is running and configured and you have updated the baseUrl in utils/apis.js.


---



Built with 💙 by Irtiqa
