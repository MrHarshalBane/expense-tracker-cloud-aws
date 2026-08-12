import os
from flask import Flask, render_template, request, redirect, url_for
import pymysql

app = Flask(__name__)

def get_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "password"),
        database=os.getenv("DB_NAME", "expense_tracker"),
        port=int(os.getenv("DB_PORT", "3306")),
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )

@app.route("/")
def index():
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT id, title, amount, category, expense_date FROM expenses ORDER BY expense_date DESC, id DESC")
        expenses = cur.fetchall()
        cur.execute("SELECT COALESCE(SUM(amount), 0) AS total FROM expenses")
        total = cur.fetchone()["total"]
    conn.close()
    return render_template("index.html", expenses=expenses, total=total)

@app.route("/add", methods=["POST"])
def add_expense():
    title = request.form["title"].strip()
    amount = request.form["amount"]
    category = request.form["category"].strip()
    expense_date = request.form["expense_date"]

    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO expenses (title, amount, category, expense_date) VALUES (%s, %s, %s, %s)",
            (title, amount, category, expense_date)
        )
    conn.close()
    return redirect(url_for("index"))

@app.route("/delete/<int:expense_id>", methods=["POST"])
def delete_expense(expense_id):
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("DELETE FROM expenses WHERE id = %s", (expense_id,))
    conn.close()
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
