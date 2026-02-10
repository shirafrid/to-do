# React GitHub Pages Demo

A sample React project configured for deployment to GitHub Pages, featuring an interactive todo list and counter.

## Features

- ⚡ Built with Vite + React
- 📝 Interactive todo list with add, complete, and delete functionality
- 🔢 Simple counter demo
- 🎨 Modern, responsive design
- 🚀 Ready for GitHub Pages deployment

## Local Development

### Prerequisites

- Node.js (v20+ recommended)
- npm or yarn

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deploying to GitHub Pages

### One-time Setup

1. Create a new repository on GitHub (e.g., `github-pages`)

2. Update the `base` in `vite.config.js` to match your repository name:
```js
base: '/your-repo-name/',
```

3. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/your-repo-name.git
git push -u origin main
```

4. In your GitHub repository, go to **Settings > Pages** and set the source to the `gh-pages` branch

### Deploy

To deploy your app to GitHub Pages, simply run:

```bash
npm run deploy
```

This will:
1. Build your app (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Your site will be live at `https://YOUR-USERNAME.github.io/your-repo-name/`

## Project Structure

```
github-pages/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Styles
│   ├── main.jsx         # Entry point
│   └── assets/          # Static assets
├── public/              # Public assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint

## Technologies Used

- [React](https://react.dev/) - UI library
- [Vite](https://vite.dev/) - Build tool
- [gh-pages](https://github.com/tschaub/gh-pages) - GitHub Pages deployment

## License

MIT
