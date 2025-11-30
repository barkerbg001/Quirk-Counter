# Quirk Counter 🐉

A delightful, feature-rich counter application with three distinct themes and comprehensive analytics. Track quirky events with style through multiple visual experiences: Dragon Dynasty (Chinese restaurant theme), Neon Nexus (cyberpunk theme), and Forest Grove (nature-inspired theme).

## ✨ Features

### 🎨 Theme System
- **Dragon Dynasty**: Chinese restaurant-inspired theme with warm golds, reds, and elegant fonts
- **Neon Nexus**: Cyberpunk-inspired theme with neon blues, dark backgrounds, and monospace fonts
- **Forest Grove**: Nature-inspired theme with forest greens, earthy tones, and organic aesthetics
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
- **Counter Cards**: Five default categories (Burps, Farts, Bugs, Coffee, Sass) with customizable counts
- **Increment/Decrement**: Add or remove entries with `+` and `−` buttons on each card
- **Toast Notifications**: Elegant toast messages with random contextual phrases
- **Pulse Animations**: Visual feedback when incrementing counters
- **Hover Effects**: Smooth transitions and hover states throughout the UI
- **Multi-Page Navigation**: Navigate between Home, Dashboard, Event Log, Todos, and Settings pages
- **Todo List System**: Full-featured todo list with three status columns (Todo, In Progress, Done) and filtering capabilities
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Custom Categories (UI)**: Create new categories from the Settings page using the `＋` button — new categories persist in localStorage
- **Delete Categories**: Remove categories you no longer need via the delete button on each card. Deleting a category also deletes all events associated with it (a beautiful custom confirmation dialog appears first). Be cautious: deletions are permanent.
- **Custom Dialog System**: Theme-aware confirmation dialogs replace default browser alerts with smooth animations and consistent styling
- **Daily Reset**: All tallies automatically reset to 0 at the start of each new day

### ✅ Todo List Features
- **Three-Column Kanban Board**: Organize todos into Todo, In Progress, and Done columns
- **Status Management**: Easily move todos between statuses with intuitive action buttons
- **Filtering**: Filter todos by status (All, Todo, In Progress, Done)
- **Count Badges**: See at a glance how many items are in each column
- **Delete Functionality**: Remove todos with custom confirmation dialog
- **Theme Integration**: Todo list styling adapts to all three themes
- **Persistent Storage**: All todos saved to localStorage

### 💾 Data Persistence
- Local storage integration for saving state across sessions
- Persistent theme preferences
- Event history tracking with timestamps
- Category counts and event log retention
- Todo list persistence
- Automatic daily reset tracking

### 📤 Data Export
- **Export Events**: Download your event history as JSON or CSV files
- Export button available in the Event Log page
- Timestamped filenames for easy organization

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
1. Click the **"+"** button on any category card
2. Watch the counter increment with a pulse animation
3. Receive a random contextual phrase in a toast notification
4. View the event appear in the analytics dashboard

### Removing Events
- Click the **"−"** button on any category card to decrement the count
- The most recent event for that category will be removed
- The button is disabled when the count is 0

### Navigation
- Use the navigation buttons in the header to switch between pages:
  - **Home**: View and interact with counter cards
  - **Dashboard**: View analytics and visualizations
  - **Event Log**: Browse all events in a sortable table
  - **Todos**: Manage your todo list with status tracking
  - **Settings**: Change theme and manage categories

### Switching Themes
- Navigate to the **Settings** page
- Click on any theme option:
  - 🐉 **Dragon Dynasty**: Chinese restaurant theme
  - ⚡ **Neon Nexus**: Cyberpunk theme
  - 🌲 **Forest Grove**: Nature theme
- Watch the entire interface smoothly transition to the new theme

### Viewing Analytics
- Navigate to the **Dashboard** page
- Explore various visualizations and metrics:
  - KPI cards with real-time statistics
  - Daily summary with manager's notes
  - Category breakdown with percentages
  - Bar and line charts
- Sort the event table by clicking column headers (Timestamp or Category)
- View real-time updates as you add new events

### Exporting Data
- Navigate to the **Event Log** page
- Click the **Export** button to download your events
- Choose between JSON or CSV format (both are downloaded)
- Files are automatically timestamped

### Deleting Categories
- Click the **delete button** (🗑️) on any category card
- A custom confirmation dialog will appear with a warning message
- Click **Delete** to confirm or **Cancel** to abort
- You can also close the dialog by clicking the X button, clicking outside the dialog, or pressing the Escape key
- The dialog matches your current theme and includes smooth animations

### Managing Your Todo List
Navigate to the **Todos** page to manage your tasks:
1. **Add a Todo**: Type your task in the input field and click **Add**
2. **Change Status**: Use the action buttons on each todo item:
   - From **Todo**: Move to In Progress or mark as Done
   - From **In Progress**: Move back to Todo or mark as Done
   - From **Done**: Move back to Todo or In Progress
3. **Filter Todos**: Click filter buttons (All, Todo, In Progress, Done) to view specific statuses
4. **Delete Todos**: Click the delete button (🗑️) on any todo item to remove it (confirmation required)
5. **View Counts**: See how many items are in each column with the count badges

**Todo Status Flow:**
- **Todo** → **In Progress** → **Done**
- You can move items in any direction between these statuses

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

### Forest Grove 🌲
A nature-inspired theme featuring:
- Forest green background (#1B4332)
- Light card surfaces (#F0F7F4)
- Earthy green accents (#52B788)
- Natural color palette with jade and mint tones
- Nature-themed phrases and terminology

## 💡 Customization

### Adding New Categories
You can add categories in two ways:

- **Quick (UI)**: Navigate to the Settings page, click the `＋` button, enter an id (lowercase, no spaces, only `a-z0-9_-`) and a display name, then click `Create`. The new category is stored in localStorage and immediately appears in the UI.

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
- **Custom Dialog System**: Promise-based dialog API with theme-aware styling
- **Todo List Management**: Kanban-style todo board with status tracking and filtering
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

### Version 1.0.0
- ✨ Initial release
- 🎨 Dual theme system (Dragon Dynasty & Neon Nexus)
- 📊 Comprehensive analytics dashboard
- 💾 Local storage persistence
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions

### Version 1.1.0
- ✨ Added `Sass` default category
- ➕ In-UI custom category creation (Settings page `＋` button)
- 🗑️ Category deletion (deletes associated events; confirmation required)

### Version 1.2.0
- 🌲 Added Forest Grove theme
- 📤 Export functionality (JSON and CSV)
- 🔄 Daily automatic reset (tallies reset to 0 each day)
- ➖ Decrement functionality on counter cards
- 🧭 Multi-page navigation system (Home, Dashboard, Event Log, Settings)

### Version 1.3.0
- 💬 Custom dialog system replacing default browser alerts
- 🎨 Theme-aware dialog styling with smooth animations
- ⌨️ Keyboard support (Escape key to close dialogs)
- ♿ Enhanced accessibility with ARIA attributes

### Version 1.4.0 (Current)
- ✅ Full-featured Todo List system with Kanban board layout
- 📋 Three-column status tracking (Todo, In Progress, Done)
- 🔍 Todo filtering by status
- 🎯 Status management with intuitive action buttons
- 💾 Todo persistence in localStorage
- 🎨 Theme-aware todo styling

## 🔮 Future Enhancements

- [ ] Date range filtering for analytics
- [ ] Additional chart types (pie chart, heatmap)
- [ ] Dark mode toggle independent of themes
- [ ] Multi-language support
- [ ] Data backup and restore
- [ ] Weekly/monthly summary reports
- [ ] Custom reset schedules (weekly, monthly, etc.)
- [ ] Event search and filtering

---

Made with ❤️ and ☕ by [barkerbg001](https://github.com/barkerbg001)
