# QuickDeck: Flashcard Creation Application 
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![Tailwindcss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
## Description
This application is created to enable users to create and manage decks of flashcards. Flashcards can be used for learning new words, concepts, or any other information users wish to memorize. The project consists of a backend written in Python using the Django framework and Django REST Framework, and a frontend written in JavaScript using the React library. JWT (JSON Web Token) is used for user authentication, while PostgreSQL serves as the database. Tailwind CSS and FlowBite React is employed for styling.

## Live Demo
https://9fc8ae32-1dcf-4ec0-9455-0b1e61dd2881.e1-eu-north-azure.choreoapps.dev/

## Installation and Running Locally
1. Clone the repository: `git clone https://github.com/matcane/QuickDeck.git`
2. Create a Python environment `python3 -m venv env`
3. Activate the Python environment `source env/bin/activate`
4. Navigate to the backend directory: `cd backend`
5. Install the required Python libraries: `pip install -r requirements.txt`
6. Generate `.env` file and set up database: `python getEnv.py`
7. Run migration: `python manage.py migrate`
8. Run the backend server: `python manage.py runserver`
9. Navigate to the frontend directory: `cd frontend`
10. Install the required JavaScript libraries: `npm install`
11. Start the frontend development server: `npm start`
12. The application will be available at: `http://localhost:5173/`

## ToDo
- [ ] Generated decks by GPT

## Demo

...