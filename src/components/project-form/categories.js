export const  categories = [
  "Productivity",
  "Music",
  "Health & Fitness",
  "Design Tools",
  "Social Media",
  "Open Source",
  "Medical",
  "Marketing",
  "Developer Tools",
  "Artificial Intelligence",
  "Analytics",
  "Sports",
  "iOS",
  "Android",
  "Web App",
  "Crypto",
  "Education",
  "Art",
  "Finance",
  "Food",
  "Games",
  "Entertainment",
  "API",
  "Communication",
  "Virtual Reality",
  "Travel",
  "E-commerce",
  "News",
  "Beauty",
  "Logistics",
  "Storage",
  "Events",
];

const initialCheckState = {};
categories.forEach(category => {
  initialCheckState[category] = false;
});

export default initialCheckState;