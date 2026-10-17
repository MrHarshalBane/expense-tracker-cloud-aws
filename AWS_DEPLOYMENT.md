# AWS Cloud Deployment Guide: Host on EC2 & Store on Amazon RDS

This guide outlines how to host the **Expense Tracker Web Application** using **Cloud Computing** infrastructure provided by **Amazon Web Services (AWS)**:
- **Cloud Host:** **AWS EC2** (Amazon Elastic Compute Cloud)
- **Cloud Store:** **Amazon RDS** (Amazon Relational Database Service MySQL)

---

## 1. Cloud Database (Store): Amazon RDS Setup
- Navigate to the **AWS RDS Console** and select **Create Database**.
- Select **MySQL 8.0** engine.
- Template: Free Tier (or Dev/Test).
- DB Instance Identifier: `expense-tracker-db`.
- Set Master Username: (e.g. `admin`) and secure Master Password.
- Initial Database Name: `expense_tracker`.
- Public Access: Turn off (private within VPC).
- **Security Group Configuration:** Allow inbound traffic on MySQL port `3306` **only** from the Security Group ID assigned to your AWS EC2 instance.
- Note down the **RDS Endpoint** once the status changes to *Available*.

---

## 2. Cloud Compute (Host): AWS EC2 Setup
- Navigate to the **AWS EC2 Console** and launch an **Amazon Linux 2023** or **Ubuntu 22.04 LTS** instance (`t2.micro` free tier eligible).
- **Security Group Configuration:**
  - Inbound **SSH (Port 22)**: Restricted to your IP.
  - Inbound **HTTP (Port 80)**: Accessible to the public (`0.0.0.0/0`) for web clients.
- Download your Key Pair `.pem` and connect:
  ```bash
  ssh -i your-key.pem ec2-user@your-ec2-public-ip
  ```

---

## 3. Install Dependencies & Clone Web Application
```bash
sudo dnf update -y
sudo dnf install -y python3-pip git mysql
git clone https://github.com/mrharshalbane/expense-tracker-cloud-aws.git
cd expense-tracker-cloud-aws
pip3 install -r requirements.txt
```

---

## 4. Initialize Database Schema on Amazon RDS
Connect to your RDS instance from EC2:
```bash
mysql -h YOUR_RDS_ENDPOINT -u YOUR_RDS_USER -p expense_tracker < schema.sql
```

---

## 5. Configure Cloud Environment Variables
```bash
export DB_HOST="YOUR_RDS_ENDPOINT"
export DB_USER="YOUR_RDS_USER"
export DB_PASSWORD="YOUR_RDS_PASSWORD"
export DB_NAME="expense_tracker"
export DB_PORT="3306"
```

---

## 6. Run the Web Application
For development:
```bash
python3 app.py
```

For production deployment on EC2, run behind **Gunicorn** and **Nginx**:
```bash
pip3 install gunicorn
gunicorn -w 3 -b 0.0.0.0:5000 app:app
```
Configure Nginx as a reverse proxy from Port 80 to Port 5000.

