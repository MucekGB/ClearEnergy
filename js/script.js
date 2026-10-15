'use strict';

const defaults = { power: 100, hours: 4, days: 30, price: 25, compareHours: 2, appliance: '100' };

const controls = {
  power: { range: document.querySelector('#power-range'), number: document.querySelector('#power-number'), min: 1, max: 5000 },
  hours: { range: document.querySelector('#hours-range'), number: document.querySelector('#hours-number'), min: 0, max: 24 },
  days: { range: document.querySelector('#days-range'), number: document.querySelector('#days-number'), min: 0, max: 31 },
  price: { range: document.querySelector('#price-range'), number: document.querySelector('#price-number'), min: 1, max: 100 }
};

const applianceSelect = document.querySelector('#appliance');
const compareRange = document.querySelector('#compare-hours-range');
const compareNumber = document.querySelector('#compare-hours-number');
const compareMessage = document.querySelector('#compare-message');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const deviceIcon = document.querySelector('#device-icon');
const deviceName = document.querySelector('#device-name');
const currentCostBar = document.querySelector('#current-cost-bar');
const newCostBar = document.querySelector('#new-cost-bar');

const deviceVisuals = {
  '10': { name: 'LED light', icon: '<path d="M23 39h18M26 46h12"/><path d="M22 31c-5-4-7-8-7-13a17 17 0 0 1 34 0c0 5-2 9-7 13-2 2-3 4-3 8H25c0-4-1-6-3-8Z"/>' },
  '100': { name: 'TV', icon: '<rect x="8" y="11" width="48" height="33" rx="5"/><path d="M24 53h16M32 44v9"/>' },
  '65': { name: 'Laptop', icon: '<rect x="13" y="9" width="38" height="31" rx="3"/><path d="M7 48h50l-4 6H11Z"/>' },
  '2000': { name: 'Electric heater', icon: '<rect x="13" y="8" width="38" height="48" rx="5"/><path d="M23 18c-5 5 5 8 0 14s5 9 0 14M34 18c-5 5 5 8 0 14s5 9 0 14M45 18c-5 5 5 8 0 14s5 9 0 14"/>' },
  custom: { name: 'Other device', icon: '<rect x="10" y="17" width="44" height="35" rx="6"/><path d="M25 17V9M39 17V9M25 34h14M32 27v14"/>' }
};

function clamp(value, minimum, maximum, fallback) {
  if (value === '') return fallback;
  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) return fallback;
  return Math.min(Math.max(parsedValue, minimum), maximum);
}

function syncControl(control, value) {
  const safeValue = clamp(value, control.min, control.max, Number(control.range.value));
  control.range.value = safeValue;
  // The browser rounds to the slider's step. Use that same value in both inputs.
  // Leave valid text alone so typing a decimal point does not move the cursor.
  if (control.number.value === '' || Number(control.number.value) !== Number(control.range.value)) {
    control.number.value = control.range.value;
  }
}

function formatNumber(value, maximumDecimals = 2) {
  return value.toLocaleString('en-GB', { minimumFractionDigits: Math.min(2, maximumDecimals), maximumFractionDigits: maximumDecimals });
}

function formatMoney(value) {
  return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function currentValues() {
  return {
    power: Number(controls.power.range.value),
    hours: Number(controls.hours.range.value),
    days: Number(controls.days.range.value),
    price: Number(controls.price.range.value)
  };
}

function setRangeFill(input) {
  const minimum = Number(input.min);
  const maximum = Number(input.max);
  const percentage = maximum === minimum ? 0 : ((Number(input.value) - minimum) / (maximum - minimum)) * 100;
  input.setAttribute('style', `--fill: ${Math.max(0, Math.min(100, percentage))}%`);
}

function updateVisuals() {
  Object.values(controls).forEach((control) => setRangeFill(control.range));
  setRangeFill(compareRange);
  const visual = deviceVisuals[applianceSelect.value] || deviceVisuals.custom;
  deviceIcon.innerHTML = visual.icon;
  deviceName.textContent = visual.name;
}

function updateResults() {
  const { power, hours, days, price } = currentValues();
  const priceInPounds = price / 100;
  const dailyEnergy = (power / 1000) * hours;
  const dailyCost = dailyEnergy * priceInPounds;
  const monthlyEnergy = dailyEnergy * days;
  const monthlyCost = monthlyEnergy * priceInPounds;
  const yearlyCost = monthlyCost * 12;

  document.querySelector('#daily-energy').textContent = `${formatNumber(dailyEnergy)} kWh`;
  document.querySelector('#daily-cost').textContent = formatMoney(dailyCost);
  document.querySelector('#monthly-energy').textContent = `${formatNumber(monthlyEnergy)} kWh`;
  document.querySelector('#monthly-cost').textContent = formatMoney(monthlyCost);
  document.querySelector('#yearly-cost').textContent = formatMoney(yearlyCost);
  document.querySelector('#calculation-text').textContent = `(${formatNumber(power, 1)} W ÷ 1,000) × ${formatNumber(hours, 1)} hours × ${days} days × (${formatNumber(price, 1)} p/kWh ÷ 100) = ${formatMoney(monthlyCost)} per month.`;

  updateComparison(monthlyCost, power, days, priceInPounds, hours);
  updateVisuals();
}

function updateComparison(currentMonthlyCost, power, days, priceInPounds, currentHours) {
  compareRange.max = currentHours;
  compareNumber.max = currentHours;
  const safeHours = clamp(compareNumber.value, 0, currentHours, Number(compareRange.value));

  if (Number(compareNumber.value) > currentHours) {
    compareMessage.textContent = `Enter ${currentHours} hours or less.`;
  } else {
    compareMessage.textContent = '';
  }

  compareRange.value = safeHours;
  if (compareNumber.value === '' || Number(compareNumber.value) !== Number(compareRange.value)) {
    compareNumber.value = compareRange.value;
  }
  const compareHours = Number(compareRange.value);
  const reducedCost = (power / 1000) * compareHours * days * priceInPounds;
  const difference = Math.max(0, currentMonthlyCost - reducedCost);

  document.querySelector('#current-monthly-cost').textContent = formatMoney(currentMonthlyCost);
  document.querySelector('#reduced-monthly-cost').textContent = formatMoney(reducedCost);
  document.querySelector('#cost-difference').textContent = formatMoney(difference);
  const newWidth = currentMonthlyCost > 0 ? (reducedCost / currentMonthlyCost) * 100 : 0;
  currentCostBar.setAttribute('style', `width: ${currentMonthlyCost > 0 ? 100 : 0}%`);
  newCostBar.setAttribute('style', `width: ${Math.max(0, Math.min(100, newWidth))}%`);
}

Object.values(controls).forEach((control) => {
  control.range.addEventListener('input', () => {
    control.number.value = control.range.value;
    updateResults();
  });

  control.number.addEventListener('input', () => {
    if (control.number.value === '') return;
    syncControl(control, control.number.value);
    updateResults();
  });

  control.number.addEventListener('change', () => {
    syncControl(control, control.number.value);
    updateResults();
  });
});

applianceSelect.addEventListener('change', () => {
  if (applianceSelect.value !== 'custom') {
    syncControl(controls.power, applianceSelect.value);
  }
  updateResults();
});

controls.power.number.addEventListener('input', () => {
  applianceSelect.value = 'custom';
  updateVisuals();
});
controls.power.range.addEventListener('input', () => {
  applianceSelect.value = 'custom';
  updateVisuals();
});

compareRange.addEventListener('input', () => {
  compareNumber.value = compareRange.value;
  compareMessage.textContent = '';
  updateResults();
});

compareNumber.addEventListener('input', () => {
  if (compareNumber.value === '') return;
  updateResults();
});

compareNumber.addEventListener('change', () => {
  updateResults();
});

document.querySelector('#reset-calculator').addEventListener('click', () => {
  applianceSelect.value = defaults.appliance;
  Object.entries(controls).forEach(([name, control]) => {
    syncControl(control, defaults[name]);
  });
  // updateComparison restores the maximum before setting the comparison slider.
  compareNumber.value = defaults.compareHours;
  compareMessage.textContent = '';
  updateResults();
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.querySelector('.sr-only').textContent = isOpen ? 'Open navigation menu' : 'Close navigation menu';
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Open navigation menu';
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Open navigation menu';
    menuButton.focus();
  }
});

updateResults();

