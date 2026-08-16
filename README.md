# 🎬 MoodFlix AI

An AI-powered movie recommendation system that recommends movies based on the user's current mood and feelings.

## 🌟 About the Project

MoodFlix AI helps users discover movies that match how they feel.

The user selects a mood and can describe their feelings in their own words. The AI analyzes the input and recommends five Hollywood movies. MoodFlix then uses the OMDb API to fetch real movie information such as posters, ratings, genres, release years, and plots.

## ✨ Features

- 😊 Mood-based movie recommendations
- 🤖 AI-powered recommendations
- 💭 User can describe their feelings
- 🎬 Recommends 5 movies at a time
- 🖼️ Movie posters
- ⭐ IMDb ratings
- 📅 Release year
- 🎭 Movie genres
- 📝 Movie plots
- 📱 Responsive interface
- 🔐 API keys protected using environment variables

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- CORS
- OpenRouter API

### Movie Data
- OMDb API

## 🔄 How It Works

```text
User selects a mood
        ↓
User describes their feelings
        ↓
Frontend sends the information to backend
        ↓
AI analyzes the mood and description
        ↓
AI recommends 5 movies
        ↓
Movie titles are sent to OMDb API
        ↓
OMDb returns movie information
        ↓
MoodFlix displays movie cards

📁 Project Structure
MoodFlix-AI/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── public/
│
├── src/
│   ├── assets/
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
🚀 Installation
1. Clone the repository
git clone https://github.com/Poojaa-S3000/MoodFlix-AI.git
2. Enter the project
cd MoodFlix-AI
3. Install frontend dependencies
npm install
4. Install backend dependencies
cd backend
npm install
🔑 Environment Variables

Create a .env file in the main project folder:

VITE_OMDB_API_KEY=your_omdb_api_key

Create another .env file inside the backend folder:

OPENROUTER_API_KEY=your_openrouter_api_key

Never upload your API keys to GitHub.

The .gitignore file is already configured to keep these files private.

▶️ Running the Project
Start the backend

Open a terminal:

cd backend
npm start

The backend will run on:

http://localhost:5000
Start the frontend

Open another terminal in the main project folder:

npm run dev

The frontend will normally run on:

http://localhost:5173

Open the displayed URL in your browser.

🎯 Example

A user might select:

😊 Happy

and enter:

I want something fun and exciting to watch with my friends.

MoodFlix AI analyzes the input and returns five suitable movie recommendations.

🔮 Future Enhancements

Possible future improvements include:

User accounts and personalized recommendations
Movie search
Watchlist functionality
More detailed mood analysis
Streaming platform availability
Recommendation history
Genre-based filtering
Indian and regional movie recommendations
👩‍💻 Author

Poojaa S

B.Tech Computer Science Engineering
Specialization: Data Science & Artificial Intelligence

📄 License

This project is created for educational and academic purposes.



### Step 2 — Save the file


Then go back to your terminal.


You're already in:


```text
C:\Users\POOJAAKRITIK\OneDrive\moodflixai\moodflix-ai>

Run:

git add README.md

Then:

git commit -m "Add project documentation"

Then:

git push
