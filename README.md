https://mrharshalbane.github.io/expense-tracker-cloud-aws/

# Expense Tracker Web Application using Cloud Computing Services (Host/Store)

[![Live Web Application](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://mrharshalbane.github.io/expense-tracker-cloud-aws/)
[![Cloud Provider](https://img.shields.io/badge/Cloud%20Provider-AWS-232f3e?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![Compute (Host)](https://img.shields.io/badge/Cloud%20Host-AWS%20EC2-ff9900?style=for-the-badge&logo=amazon-ec2)](https://aws.amazon.com/ec2/)
[![Database (Store)](https://img.shields.io/badge/Cloud%20Store-Amazon%20RDS-3b48cc?style=for-the-badge&logo=amazon-rds)](https://aws.amazon.com/rds/)

A modern **Expense Tracker Web Application** designed and implemented using **Cloud Computing** services for hosting and persistent data storage.

- **Cloud Hosting (Host):** Hosted on an **AWS EC2** (Amazon Elastic Compute Cloud) Linux instance serving the Python Flask application via WSGI/Gunicorn.
- **Cloud Database (Store):** Persistently stored in **Amazon RDS** (Amazon Relational Database Service) running MySQL for relational schema management, automated backup snapshots, and high availability.

---

## 🔑 Key Concepts & Keywords
- **AWS** (Amazon Web Services)
- **EC2** (Elastic Compute Cloud - Hosting tier)
- **RDS** (Relational Database Service - Storage tier)
- **Cloud Computing** (IaaS compute and managed DB services)
- **Web Application** (Full-stack expense tracking system)

---

## 🌐 Live Web Application & Demo
Experience the interactive live demo on GitHub Pages:  
👉 **[https://mrharshalbane.github.io/expense-tracker-cloud-aws/](https://mrharshalbane.github.io/expense-tracker-cloud-aws/)**

---

## 🛠️ Architecture & Technologies
- **Frontend / Web Application UI:** HTML5, CSS3, JavaScript (Vanilla ES6+), Font Awesome
- **Backend Web Server (Host):** Python 3 Flask, Gunicorn
- **Compute Infrastructure (Host):** AWS EC2 (t2.micro / Linux)
- **Database Storage (Store):** Amazon RDS (MySQL 8.0)
- **Network & Security:** AWS VPC, Security Groups, IAM

---

## 🚀 Features
- **Add Expenses:** Record new transaction title, cost, category, and date.
- **Persistent Cloud Storage:** Records dispatched and saved to Amazon RDS MySQL tables.
- **Real-Time Analytics:** Real-time expense sum total, transaction count, and top expense category identification.
- **Delete & Manage:** Instant record removal with synced state calculations.
- **Cloud Architecture Visualization:** Interactive live topology showing data flow between Browser → IGW → AWS EC2 → Amazon RDS.

---

## 🏗️ Project Structure
```text
expense-tracker-cloud-aws/
├── app.py               # Flask Web Application backend server
├── requirements.txt     # Python dependencies (Flask, PyMySQL, etc.)
├── index.html           # Web application client interface
├── style.css            # Stylesheet and responsive layout
├── app.js               # Client controller and state manager
├── schema.sql           # MySQL database schema for Amazon RDS
├── AWS_DEPLOYMENT.md    # Complete AWS EC2 (Host) & RDS (Store) setup guide
└── README.md            # Project documentation & overview
```

---

## 💻 Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrharshalbane/expense-tracker-cloud-aws.git
   cd expense-tracker-cloud-aws
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables (Optional for RDS):**
   ```bash
   export DB_HOST="your-rds-endpoint.amazonaws.com"
   export DB_USER="admin"
   export DB_PASSWORD="your-password"
   export DB_NAME="expense_tracker"
   ```

5. **Start the Web Application:**
   ```bash
   python app.py
   ```
   Open `http://127.0.0.1:5000` in your web browser.

---

## ☁️ AWS Cloud Architecture Topology
```text
[ Client Browser ]
        │  (HTTP / HTTPS)
        ▼
[ AWS VPC & Internet Gateway ]
        │
        ▼
[ AWS EC2 Instance ] ──► (Hosts Flask Web Application Server)
        │
        ▼  (MySQL Port 3306 - Security Group Isolated)
[ Amazon RDS Database ] ──► (Stores Relational Expense Records)
```

- **Cloud Hosting:** **AWS EC2** provides scalable compute resources on demand.
- **Cloud Storage:** **Amazon RDS** delivers automated provisioning, failover, and managed relational database storage.

