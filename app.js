// Expense Tracker Application Logic
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'aws_cloud_expenses';

  const defaultExpenses = [
    { id: 1, title: 'AWS EC2 t2.micro Instance', amount: 840.50, category: 'Cloud Infrastructure', expense_date: '2026-10-01' },
    { id: 2, title: 'Amazon RDS MySQL Instance (Multi-AZ)', amount: 1450.00, category: 'Cloud Infrastructure', expense_date: '2026-10-03' },
    { id: 3, title: 'AWS Route 53 Hosted Zone', amount: 45.00, category: 'Cloud Infrastructure', expense_date: '2026-10-05' },
    { id: 4, title: 'Team Project Working Lunch', amount: 620.00, category: 'Food & Dining', expense_date: '2026-10-08' },
    { id: 5, title: 'GitHub Pro Subscription', amount: 330.00, category: 'Education & Tools', expense_date: '2026-10-09' }
  ];

  // DOM elements
  const form = document.getElementById('expense-form');
  const tbody = document.getElementById('expenses-tbody');
  const emptyState = document.getElementById('empty-state');
  const totalVal = document.getElementById('total-val');
  const countVal = document.getElementById('count-val');
  const topCatVal = document.getElementById('top-cat-val');
  const btnSeed = document.getElementById('btn-seed');
  const btnClearAll = document.getElementById('btn-clear-all');
  const dateInput = document.getElementById('date-input');

  // Set today as default date
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }

  // Retrieve stored expenses
  function getExpenses() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return [...defaultExpenses];
  }

  // Save expenses
  function saveExpenses(expenses) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  // Render Table & Metrics
  function render() {
    const expenses = getExpenses();

    // Calculate metrics
    const total = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    const count = expenses.length;

    totalVal.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    countVal.textContent = count;

    // Top Category
    if (count > 0) {
      const catCounts = {};
      expenses.forEach(e => {
        catCounts[e.category] = (catCounts[e.category] || 0) + parseFloat(e.amount || 0);
      });
      const topCat = Object.keys(catCounts).reduce((a, b) => catCounts[a] > catCounts[b] ? a : b);
      topCatVal.textContent = topCat;
    } else {
      topCatVal.textContent = '-';
    }

    // Render table
    tbody.innerHTML = '';
    if (count === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      expenses.forEach(expense => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="expense-id">#${expense.id}</td>
          <td><strong>${escapeHtml(expense.title)}</strong></td>
          <td class="expense-amount">₹${parseFloat(expense.amount).toFixed(2)}</td>
          <td><span class="category-tag">${escapeHtml(expense.category)}</span></td>
          <td>${escapeHtml(expense.expense_date)}</td>
          <td>
            <button class="btn-delete-item" data-id="${expense.id}" title="Delete expense record">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const amount = parseFloat(form.amount.value);
    const category = form.category.value;
    const expenseDate = form.expense_date.value;

    if (!title || isNaN(amount) || !expenseDate) return;

    const expenses = getExpenses();
    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;

    const newExpense = {
      id: newId,
      title: title,
      amount: amount,
      category: category,
      expense_date: expenseDate
    };

    expenses.unshift(newExpense);
    saveExpenses(expenses);
    render();

    form.reset();
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  });

  // Delete Item Event Delegation
  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-delete-item');
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    let expenses = getExpenses();
    expenses = expenses.filter(item => item.id !== id);
    saveExpenses(expenses);
    render();
  });

  // Seed Demo Data
  btnSeed.addEventListener('click', () => {
    saveExpenses([...defaultExpenses]);
    render();
  });

  // Clear All
  btnClearAll.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all recorded expenses?')) {
      saveExpenses([]);
      render();
    }
  });

  // Initial render
  render();
});
