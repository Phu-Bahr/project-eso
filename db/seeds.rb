Category.delete_all

categories = [
    { name: "American" },
    { name: "Asian" },
    { name: "Barbeque" },
    { name: "Bistros" },
    { name: "Brazilian" },
    { name: "Breakfast" },
    { name: "Burgers" },
    { name: "Cafes" },
    { name: "Diners" },
    { name: "Chinese" },
    { name: "Delis" },
    { name: "Falafel" },
    { name: "Fast Food" },
    { name: "French" },
    { name: "Halal" },
    { name: "Italian" },
    { name: "Japanese" },
    { name: "Greek" },
    { name: "Korean" },
    { name: "Mediterranean" },
    { name: "Mexican" },
    { name: "European" },
    { name: "Pizza" },
    { name: "Salad" },
    { name: "Sandwiches" },
    { name: "Seafood" },
    { name: "Spanish" },
    { name: "Sushi" },
    { name: "Steakhouses" },
    { name: "Thai" },
    { name: "Vegetarian" },
    { name: "Vietnamese" }
]

categories.each do |category|
	Category.create!(category)
end
