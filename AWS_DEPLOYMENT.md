# AWS Deployment Guide

## 1. Create RDS
- Create an Amazon RDS MySQL database.
- Create database name: `expense_tracker`.
- Note the RDS endpoint, username and password.
- Configure the RDS security group so MySQL port 3306 is accessible from the EC2 security group (prefer security-group-to-security-group access rather than opening 3306 to the internet).

## 2. Create EC2
- Launch an EC2 Linux instance.
- Configure the security group to allow SSH (22) from your IP and HTTP (80) if using a reverse proxy.
- Connect using SSH.

## 3. Install application dependencies
```bash
sudo dnf update -y
sudo dnf install -y python3-pip git mysql
git clone YOUR_GITHUB_REPOSITORY_URL
cd expense-tracker-cloud
pip3 install -r app/requirements.txt
```

## 4. Configure environment variables
```bash
export DB_HOST="YOUR_RDS_ENDPOINT"
export DB_USER="YOUR_RDS_USER"
export DB_PASSWORD="YOUR_RDS_PASSWORD"
export DB_NAME="expense_tracker"
export DB_PORT="3306"
```

## 5. Create the table
Run `database/schema.sql` against your RDS MySQL database.

## 6. Start the application
```bash
python3 app/app.py
```

For a production deployment, use a WSGI server such as Gunicorn behind Nginx rather than Flask's development server.
