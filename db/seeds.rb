Category.delete_all

categories = [
  { name: "American (New)" },
  { name: "American (Traditional)" },
  { name: "Asian Fusion" },
  { name: "Barbeque" },
  { name: "Brazilian" },
  { name: "Breakfast & Brunch" },
  { name: "Burgers" },
  { name: "Cafes" },
  { name: "Fast Food" },
  { name: "Chinese" },
  { name: "DimSum" },
  { name: "Diners" },
  { name: "French" },
  { name: "Greek" },
  { name: "Indian" },
  { name: "Italian" },
  { name: "Japanese" },
  { name: "Korean" },
  { name: "Mediterranean" },
  { name: "Mexican" },
  { name: "Middle Eastern" },
  { name: "Modern European" },
  { name: "Pizza" },
  { name: "Salad" },
  { name: "Sandwiches" },
  { name: "Seafood" },
  { name: "Southern" },
  { name: "Spanish" },
  { name: "Steakhouses" },
  { name: "Sushi Bars " },
  { name: "Tacos" },
  { name: "Taiwanese" },
  { name: "Tapas/Small Plates" },
  { name: "Thai" },
  { name: "Vegetarian" },
  { name: "Vietnamese" },
]

categories.each do |category|
	Category.create!(category)
end
