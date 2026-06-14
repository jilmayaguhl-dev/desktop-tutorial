const quotes = [
  '"Your body is your runway."',
  '"Strong is the new beautiful."',
  '"Discipline is doing it even when you don\'t feel like it."',
  '"Train like an Angel, glow like a goddess."',
  '"Every rep counts. Every meal matters."',
  '"Beauty starts from within — feed your body well."',
];

const workouts = [
  { id:'w1', emoji:'🏃‍♀️', tag:'cardio', name:'Angel Cardio Blast', desc:'High-intensity intervals to torch calories and boost endurance.', meta:'30 min · 350 kcal', calories: 350 },
  { id:'w2', emoji:'🏋️‍♀️', tag:'strength', name:'Full Body Sculpt', desc:'Tone and define every muscle group with weights and resistance.', meta:'45 min · 280 kcal', calories: 280 },
  { id:'w3', emoji:'🧘‍♀️', tag:'yoga', name:'Runway Yoga Flow', desc:'Lengthen and strengthen with graceful poses for flexibility.', meta:'40 min · 180 kcal', calories: 180 },
  { id:'w4', emoji:'🚴‍♀️', tag:'cardio', name:'Spin & Sweat', desc:'Indoor cycling session for powerful legs and fat burning.', meta:'35 min · 400 kcal', calories: 400 },
  { id:'w5', emoji:'🤸‍♀️', tag:'strength', name:'Core & Glutes', desc:'Targeted exercises for a strong core and sculpted glutes.', meta:'30 min · 220 kcal', calories: 220 },
  { id:'w6', emoji:'🌊', tag:'cardio', name:'Dance Cardio', desc:'Fun, high-energy dance moves to keep you moving and smiling.', meta:'25 min · 300 kcal', calories: 300 },
  { id:'w7', emoji:'🧗‍♀️', tag:'strength', name:'Upper Body Power', desc:'Arms, shoulders, and back definition for the perfect silhouette.', meta:'35 min · 240 kcal', calories: 240 },
  { id:'w8', emoji:'🌸', tag:'yoga', name:'Morning Stretch & Meditate', desc:'Wake up your body gently and set a positive intention for the day.', meta:'20 min · 80 kcal', calories: 80 },
];

const meals = [
  { id:'m1', emoji:'🥗', tag:'lunch', name:'Angel Green Bowl', desc:'Mixed greens, avocado, quinoa, cucumber & lemon tahini dressing.', meta:'420 kcal · High Protein', calories: 420 },
  { id:'m2', emoji:'🍓', tag:'breakfast', name:'Berry Protein Smoothie', desc:'Strawberries, blueberries, Greek yogurt, chia seeds & almond milk.', meta:'310 kcal · Antioxidant-rich', calories: 310 },
  { id:'m3', emoji:'🍗', tag:'dinner', name:'Grilled Lemon Chicken', desc:'Herb-marinated chicken breast with roasted sweet potato & broccoli.', meta:'520 kcal · Lean Protein', calories: 520 },
  { id:'m4', emoji:'🥚', tag:'breakfast', name:'Egg White Omelette', desc:'Egg whites, spinach, tomato & feta. Light and protein-packed.', meta:'280 kcal · Low Carb', calories: 280 },
  { id:'m5', emoji:'🐟', tag:'dinner', name:'Salmon & Asparagus', desc:'Baked salmon fillet with asparagus and a side of cauliflower rice.', meta:'490 kcal · Omega-3 Boost', calories: 490 },
  { id:'m6', emoji:'🍎', tag:'snack', name:'Apple & Almond Butter', desc:'Crisp apple slices with natural almond butter. Simple & satisfying.', meta:'200 kcal · Healthy Fats', calories: 200 },
  { id:'m7', emoji:'🌮', tag:'lunch', name:'Turkey Lettuce Wraps', desc:'Seasoned ground turkey in butter lettuce with salsa and avocado.', meta:'380 kcal · Gluten-Free', calories: 380 },
  { id:'m8', emoji:'🍫', tag:'snack', name:'Dark Chocolate & Nuts', desc:'70% dark chocolate with a small handful of mixed nuts.', meta:'180 kcal · Mood Booster', calories: 180 },
];

let log = JSON.parse(localStorage.getItem('angelLog') || '[]');

function showTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const btns = document.querySelectorAll('.nav-btn');
  const order = ['dashboard','workouts','meals','log'];
  btns[order.indexOf(id)].classList.add('active');
  if (id === 'dashboard') updateStats();
  if (id === 'log') renderLog();
}

function updateStats() {
  const workoutEntries = log.filter(e => e.type === 'workout');
  const mealEntries = log.filter(e => e.type === 'meal');
  const totalCal = workoutEntries.reduce((sum, e) => sum + e.calories, 0);
  document.getElementById('stat-workouts').textContent = workoutEntries.length;
  document.getElementById('stat-calories').textContent = totalCal;
  document.getElementById('stat-meals').textContent = mealEntries.length;
}

function renderWorkouts(filter = 'all') {
  const grid = document.getElementById('workout-grid');
  const items = filter === 'all' ? workouts : workouts.filter(w => w.tag === filter);
  grid.innerHTML = items.map(w => `
    <div class="card" data-tag="${w.tag}">
      <div class="card-emoji">${w.emoji}</div>
      <div class="card-body">
        <span class="card-tag">${w.tag}</span>
        <h3>${w.name}</h3>
        <p>${w.desc}</p>
        <div class="card-meta">${w.meta}</div>
        <button class="log-btn" onclick="logItem('workout','${w.id}','${w.name}',${w.calories})">
          + Log Workout
        </button>
      </div>
    </div>
  `).join('');
}

function renderMeals(filter = 'all') {
  const grid = document.getElementById('meal-grid');
  const items = filter === 'all' ? meals : meals.filter(m => m.tag === filter);
  grid.innerHTML = items.map(m => `
    <div class="card" data-tag="${m.tag}">
      <div class="card-emoji">${m.emoji}</div>
      <div class="card-body">
        <span class="card-tag">${m.tag}</span>
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div class="card-meta">${m.meta}</div>
        <button class="log-btn" onclick="logItem('meal','${m.id}','${m.name}',${m.calories})">
          + Track Meal
        </button>
      </div>
    </div>
  `).join('');
}

function filterWorkouts(tag, btn) {
  document.querySelectorAll('#workouts .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderWorkouts(tag);
}

function filterMeals(tag, btn) {
  document.querySelectorAll('#meals .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMeals(tag);
}

function logItem(type, id, name, calories) {
  const entry = {
    type,
    id,
    name,
    calories,
    time: new Date().toLocaleString(),
  };
  log.unshift(entry);
  localStorage.setItem('angelLog', JSON.stringify(log));
  updateStats();

  const btn = event.target;
  btn.textContent = '✓ Logged!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = type === 'workout' ? '+ Log Workout' : '+ Track Meal';
    btn.disabled = false;
  }, 1500);
}

function renderLog() {
  const list = document.getElementById('log-list');
  if (log.length === 0) {
    list.innerHTML = '<p class="empty-log">No activity logged yet. Start a workout or track a meal!</p>';
    return;
  }
  list.innerHTML = log.map(e => `
    <div class="log-entry">
      <div class="log-entry-info">
        ${e.type === 'workout' ? '🏋️' : '🍽️'} <strong>${e.name}</strong>
        <br/><span class="log-entry-time">${e.time}</span>
      </div>
      <div style="text-align:right">
        <div class="log-entry-type">${e.type}</div>
        <div style="font-size:0.82rem;color:#c9607a;margin-top:0.3rem">${e.calories} kcal</div>
      </div>
    </div>
  `).join('');
}

function clearLog() {
  if (confirm('Clear your entire activity log?')) {
    log = [];
    localStorage.removeItem('angelLog');
    renderLog();
    updateStats();
  }
}

// Init
document.getElementById('daily-quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
updateStats();
renderWorkouts();
renderMeals();
