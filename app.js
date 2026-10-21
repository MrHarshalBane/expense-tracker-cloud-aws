// Expense Tracker Application Logic
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'aws_cloud_expenses';

  const defaultExpenses = [
    { id: 1, title: 'AWS EC2 t2.micro Instance', amount: 840.50, category: 'Cloud Infrastructure', region: 'ap-south-1 (Mumbai)', expense_date: '2026-10-01' },
    { id: 2, title: 'Amazon RDS MySQL Instance (Multi-AZ)', amount: 1450.00, category: 'Cloud Infrastructure', region: 'ap-south-1 (Mumbai)', expense_date: '2026-10-03' },
    { id: 3, title: 'AWS Route 53 Hosted Zone', amount: 45.00, category: 'Cloud Infrastructure', region: 'us-east-1 (N. Virginia)', expense_date: '2026-10-05' },
    { id: 4, title: 'Team Project Working Lunch', amount: 620.00, category: 'Food & Dining', region: 'ap-south-1 (Mumbai)', expense_date: '2026-10-08' },
    { id: 5, title: 'GitHub Pro Subscription', amount: 330.00, category: 'Education & Tools', region: 'us-west-2 (Oregon)', expense_date: '2026-10-09' },
    { id: 6, title: 'CloudFront CDN Distribution', amount: 512.40, category: 'Cloud Infrastructure', region: 'eu-west-1 (Ireland)', expense_date: '2026-10-12' },
    { id: 7, title: 'S3 Standard Storage & Transfer', amount: 210.00, category: 'Cloud Infrastructure', region: 'ap-southeast-1 (Singapore)', expense_date: '2026-10-14' }
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
  const regionFilter = document.getElementById('region-filter');
  const activeRegionLabel = document.getElementById('active-region-label');
  const activeRegionSubtext = document.getElementById('active-region-subtext');

  let selectedRegion = 'ALL';

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
        const parsed = JSON.parse(stored);
        // Ensure legacy entries without region get a fallback region
        return parsed.map(item => ({
          ...item,
          region: item.region || 'ap-south-1 (Mumbai)'
        }));
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
    const allExpenses = getExpenses();

    // Filter by selected region if not 'ALL'
    const filteredExpenses = selectedRegion === 'ALL'
      ? allExpenses
      : allExpenses.filter(item => item.region === selectedRegion);

    // Update active region mention banners
    const regionDisplayName = selectedRegion === 'ALL' ? 'All Regions (Global)' : selectedRegion;
    if (activeRegionLabel) {
      activeRegionLabel.textContent = regionDisplayName;
    }
    if (activeRegionSubtext) {
      activeRegionSubtext.innerHTML = `Showing calculations for: <strong>${escapeHtml(regionDisplayName)}</strong>`;
    }

    // Calculate metrics based on the filtered region
    const total = filteredExpenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    const count = filteredExpenses.length;

    totalVal.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    countVal.textContent = count;

    // Top Category in this region
    if (count > 0) {
      const catCounts = {};
      filteredExpenses.forEach(e => {
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
      filteredExpenses.forEach(expense => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="expense-id">#${expense.id}</td>
          <td><strong>${escapeHtml(expense.title)}</strong></td>
          <td class="expense-amount">₹${parseFloat(expense.amount).toFixed(2)}</td>
          <td><span class="category-tag">${escapeHtml(expense.category)}</span></td>
          <td><span class="region-badge"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(expense.region || 'ap-south-1 (Mumbai)')}</span></td>
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
    const region = form.region ? form.region.value : 'ap-south-1 (Mumbai)';
    const expenseDate = form.expense_date.value;

    if (!title || isNaN(amount) || !expenseDate) return;

    const expenses = getExpenses();
    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;

    const newExpense = {
      id: newId,
      title: title,
      amount: amount,
      category: category,
      region: region,
      expense_date: expenseDate
    };

    expenses.unshift(newExpense);
    saveExpenses(expenses);

    // If a specific region is filtered and the new item matches or is global, view updates seamlessly
    render();

    form.reset();
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  });

  // Region Filter Change Listener
  if (regionFilter) {
    regionFilter.addEventListener('change', (e) => {
      selectedRegion = e.target.value;
      render();
    });
  }

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
