# Quirk Counter 🐉

A delightful, feature-rich counter application with dual themes and comprehensive analytics. Track quirky events with style through two distinct visual experiences: Dragon Dynasty (Chinese restaurant theme) and Neon Nexus (cyberpunk theme).

## ✨ Features

### 🎨 Dual Theme System
- **Dragon Dynasty**: Chinese restaurant-inspired theme with warm golds, reds, and elegant serif fonts
- **Neon Nexus**: Cyberpunk-inspired theme with neon blues, dark backgrounds, and monospace fonts
- Smooth theme transitions with custom animations and effects
- Theme-specific icons, phrases, and color schemes

### 📊 Analytics Dashboard
- **KPI Cards**: Real-time metrics including total events, category totals, most active category, and peak hour
- **Daily Summary**: Today's event count, first/last event times, and manager's notes
- **Category Breakdown**: Visual percentage breakdown with animated progress bars
- **Bar Chart**: Compare event counts across all categories
- **Line Chart**: Visualize events distribution throughout the day (24-hour view)
- **Event Log Table**: Sortable table showing timestamp, category, and custom phrases

### 🔄 Interactive Features
- **Counter Cards**: Four default categories (Burps, Farts, Bugs, Coffee) with customizable counts
- **Undo Button**: Remove the last entry with a single click
- **Toast Notifications**: Elegant toast messages with random contextual phrases
- **Pulse Animations**: Visual feedback when incrementing counters
- **Hover Effects**: Smooth transitions and hover states throughout the UI
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Custom Categories (UI)**: Create new categories from the header using the `＋` button — new categories persist in localStorage
- **Delete Categories**: Remove categories you no longer need via the trash (🗑) button on each card. Deleting a category also deletes all events associated with it (a confirmation dialog appears first). Be cautious: deletions are permanent in the current UI.
- **Default 'Sass' Category**: An additional default category `Sass` is included out-of-the-box.

### 💾 Data Persistence
- Local storage integration for saving state across sessions
- Persistent theme preferences
- Event history tracking with timestamps
- Category counts and event log retention

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/barkerbg001/Quirk-Counter.git
cd Quirk-Counter
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply double-click the `index.html` file.

### Using a Local Server (Optional)

For the best experience, you can serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📖 Usage

### Adding Events
1. Click the **"+ Add"** button on any category card
2. Watch the counter increment with a pulse animation
3. Receive a random contextual phrase in a toast notification
4. View the event appear in the analytics dashboard

### Undoing Events
- Click the **undo button** (↶) in the header to remove the last entry
- The button is disabled when there are no events to undo

### Switching Themes
- Click the **theme toggle buttons** in the header:
  - 🐉 for Dragon Dynasty theme
  - ⚡ for Neon Nexus theme
- Watch the entire interface smoothly transition to the new theme

### Viewing Analytics
- Scroll down to the **Analytics Dashboard** section
- Explore various visualizations and metrics
- Sort the event table by clicking column headers (Timestamp or Category)
- View real-time updates as you add new events

## 🏗️ Project Structure

```
Quirk-Counter/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with theme system
├── script.js           # Application logic and state management
└── README.md           # Project documentation
```

## 🎨 Themes

### Dragon Dynasty 🐉
A Chinese restaurant-inspired theme featuring:
- Rich red background (#B71C1C)
- Golden accents (#D4AF37)
- Jade green highlights (#2E7D32)
- Lantern yellow tones (#FFE082)
- Elegant serif font (Noto Serif SC)
- Restaurant-themed phrases and terminology

### Neon Nexus ⚡
A cyberpunk-inspired theme featuring:
- Deep space background (#020617)
- Cyan neon accents (#22d3ee)
- Dark card surfaces (#0f172a)
- Monospace font (JetBrains Mono)
- Tech-themed phrases and terminology

## 💡 Customization

### Adding New Categories
You can add categories in two ways:

- **Quick (UI)**: Click the `＋` button in the header, enter an id (lowercase, no spaces, only `a-z0-9_-`) and a display name, then click `Create`. The new category is stored in localStorage and immediately appears in the UI.

- **Source (code)**: Edit the `DEFAULT_CATEGORIES` array in `script.js` if you want a category to ship by default:

```javascript
const DEFAULT_CATEGORIES = [
    { id: "burp", name: "Burps", count: 0 },
    { id: "fart", name: "Farts", count: 0 },
    { id: "bug", name: "Bugs Introduced", count: 0 },
    { id: "coffee", name: "Coffee Consumed", count: 0 },
    { id: "sass", name: "Sass", count: 0 }
];
```

### Adding Custom Phrases
Add phrases to the theme object in `script.js`:

```javascript
phrases: {
    burp: [
        "Your custom phrase here!",
        "Another clever phrase",
        "A third option"
    ]
}
```

### Creating a New Theme
Extend the `themes` object in `script.js` with your custom theme configuration.

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## 📱 Mobile Support

Fully responsive design optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktop screens (1440px+)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with ARIA labels for accessibility
- **CSS3**: Modern features including CSS Grid, Flexbox, custom properties, gradients, and animations
- **JavaScript (ES6+)**: Vanilla JavaScript with modern syntax
- **Local Storage API**: Client-side data persistence
- **SVG**: Vector graphics for line charts

## 🎯 Key Technical Features

- **State Management**: Centralized state with localStorage persistence
- **Event System**: Custom event tracking with timestamps
- **Responsive Grid Layouts**: CSS Grid and Flexbox for adaptive layouts
- **CSS Custom Properties**: Dynamic theming system
- **Smooth Animations**: CSS transitions and keyframe animations
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **No Dependencies**: Pure vanilla JavaScript, no frameworks required

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**barkerbg001**
- GitHub: [@barkerbg001](https://github.com/barkerbg001)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/barkerbg001/Quirk-Counter/issues).

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

## 📝 Changelog

### Version 1.0.0 (Current)
- ✨ Initial release
- 🎨 Dual theme system (Dragon Dynasty & Neon Nexus)
- 📊 Comprehensive analytics dashboard
- ↶ Undo functionality
- 💾 Local storage persistence
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions

### Version 1.1.0 (Update)
- ✨ Added `Sass` default category
- ➕ In-UI custom category creation (header `＋` button)
- 🗑️ Category deletion (deletes associated events; confirmation required)

## 🔮 Future Enhancements

- [ ] Export data as CSV/JSON
- [ ] Custom category creation via UI
- [ ] Date range filtering for analytics
- [ ] Additional chart types (pie chart, heatmap)
- [ ] Dark mode toggle independent of themes
- [ ] Multi-language support
- [ ] Data backup and restore
- [ ] Weekly/monthly summary reports

---

Made with ❤️ and ☕ by [barkerbg001](https://github.com/barkerbg001)
