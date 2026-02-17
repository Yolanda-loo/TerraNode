1. Project Title
"TerraNode: A Global Discovery Dashboard"
A high-performance, responsive web application for exploring geopolitical data with real-time filtering and dark mode support.

2. Live Demo & Deployment
Host on: Vercel or GitHub Pages (Both offer seamless "push-to-deploy" from your repo).

Why: Demonstrates CI/CD awareness.

3. GitHub Repo Structure
Plaintext
/terra-node
│── /assets
│   └── /images (screenshots)
│── index.html
│── style.css
│── script.js
│── README.md
└── .gitignore
4. README.md Content
🌍 TerraNode: Global Discovery Dashboard
TerraNode is a sleek, mobile-first explorer that leverages the REST Countries API to provide instant access to data on 250+ nations.

📸 Preview
[Place Desktop Screenshot Here]
[Place Mobile Responsive Screenshot Here]

✨ Key Features
Dynamic Search: Real-time filtering by country name.

Regional Sorting: Filter by continent (Africa, Americas, Asia, etc.).

Dark Mode: System-aware theme switching for a premium UI feel.

Detail Modals: Deep dive into population, capital, and currency data.

Performance: Optimized API fetching with skeleton loading states.

🛠️ Tech Stack
HTML5 / Tailwind CSS: Utility-first styling for rapid, responsive design.

Vanilla JavaScript: Clean, modular ES6+ logic (Fetch API, Async/Await).

REST Countries API: No-auth public data source.

🚀 Setup Instructions
Clone the repo: git clone https://github.com/youruser/terra-node.git

Open index.html in your browser (or use Live Server in VS Code).

No API keys required!

🧠 Challenges & Learnings
API Resilience: Handled "Not Found" errors gracefully when users type nonsensical names.

Data Formatting: Implemented .toLocaleString() to make large population numbers readable.

State Management: Managed UI states (Loading vs. Data vs. Error) without using a library like React.
