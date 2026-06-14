export const mealPlans = [
  {
    id: 1,
    name: 'Angel Clean',
    description: 'Lean protein, greens, and whole foods only.',
    days: [
      {
        day: 'Monday',
        meals: [
          { type: 'Breakfast', name: 'Açaí Bowl', calories: 320, protein: 8, carbs: 52, fat: 10 },
          { type: 'Lunch', name: 'Grilled Salmon + Quinoa', calories: 480, protein: 42, carbs: 38, fat: 14 },
          { type: 'Dinner', name: 'Zucchini Noodles + Turkey Meatballs', calories: 420, protein: 38, carbs: 22, fat: 16 },
          { type: 'Snack', name: 'Almond Butter + Apple', calories: 200, protein: 5, carbs: 24, fat: 10 },
        ],
      },
      {
        day: 'Tuesday',
        meals: [
          { type: 'Breakfast', name: 'Green Protein Smoothie', calories: 290, protein: 28, carbs: 30, fat: 6 },
          { type: 'Lunch', name: 'Chicken Caesar Salad', calories: 440, protein: 38, carbs: 18, fat: 22 },
          { type: 'Dinner', name: 'Baked Cod + Roasted Veggies', calories: 380, protein: 40, carbs: 20, fat: 10 },
          { type: 'Snack', name: 'Greek Yogurt + Berries', calories: 160, protein: 14, carbs: 18, fat: 2 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'High Protein Angel',
    description: 'Muscle-building macros for toning and definition.',
    days: [
      {
        day: 'Monday',
        meals: [
          { type: 'Breakfast', name: 'Egg White Omelette + Avocado', calories: 360, protein: 32, carbs: 12, fat: 20 },
          { type: 'Lunch', name: 'Turkey Wrap + Side Salad', calories: 520, protein: 48, carbs: 36, fat: 16 },
          { type: 'Dinner', name: 'Grilled Chicken + Sweet Potato', calories: 500, protein: 45, carbs: 42, fat: 10 },
          { type: 'Snack', name: 'Protein Shake + Banana', calories: 280, protein: 30, carbs: 30, fat: 3 },
        ],
      },
    ],
  },
]
