# Expense Tracker Web Application using Cloud Computing Services

A simple expense tracker web application designed for deployment on **AWS EC2** with expense data stored in **Amazon RDS (MySQL)**.

## Technologies
- Python Flask
- HTML/CSS
- MySQL / Amazon RDS
- AWS EC2
- AWS security groups

## Features
- Add expenses
- View all expenses
- Delete expenses
- Calculate total expenses
- Store data in MySQL/RDS
- Ready for deployment on an EC2 instance

## Project Structure
```text
expense-tracker-cloud/
├── app/
│   ├── app.py
│   ├── requirements.txt
│   ├── templates/
│   │   └── index.html
│   └── static/
│       └── style.css
├── database/
│   └── schema.sql
├── docs/
│   └── AWS_DEPLOYMENT.md
└── README.md
```

## Run Locally
1. Install Python 3.
2. Create a virtual environment:
   `python -m venv venv`
3. Activate it.
4. Install dependencies:
   `pip install -r app/requirements.txt`
5. Set database environment variables if using MySQL.
6. Run:
   `python app/app.py`
7. Open `http://127.0.0.1:5000`

## AWS Architecture
User → EC2 (Flask Web App) → RDS (MySQL Database)

For a college project, EC2 demonstrates cloud hosting while RDS demonstrates managed cloud database storage.
