<div align="center">
  <img src="src/assets/logo.png" alt="Quirk Counter Logo" width="120" height="120">
  
  # Quirk Counter 🐉

  A modern, feature-rich event tracking application built with React and Vite. Track quirky events with style through multiple beautiful themes, comprehensive analytics, and an intuitive interface.

  ![Quirk Counter](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-purple) ![License](https://img.shields.io/badge/License-MIT-green)
</div>

## ✨ Features

### 🎨 Theme System
- **Dragon Dynasty** 🐉: Chinese restaurant-inspired theme with warm golds, reds, and elegant fonts
- **Neon Nexus** ⚡: Cyberpunk-inspired theme with neon blues, dark backgrounds, and monospace fonts
- **Forest Grove** 🌲: Nature-inspired theme with forest greens, earthy tones, and organic aesthetics
- **Ruby Sea** 💎: Oceanic theme with coral reds and deep blues
- Smooth theme transitions with custom animations
- Theme-specific icons, phrases, and color schemes
- **Dynamic Logo Tinting**: Logo automatically adapts to match the current theme

### 🧭 Navigation
- **Collapsible Sidebar**: Modern sidebar navigation that can expand/collapse
- **Logo Integration**: Clickable logo that toggles sidebar (desktop) or navigates home (double-click)
- **Mobile Menu**: Slide-out menu for mobile devices with overlay backdrop
- **Keyboard Shortcuts**: Full keyboard navigation support
  - `H` - Home
  - `D` - Dashboard
  - `E` - Event Log
  - `T` - Todos
  - `S` - Settings
  - `Ctrl+/` - Show shortcuts
- **State Persistence**: Sidebar collapse state saved to localStorage

### 📊 Enhanced Analytics Dashboard
- **KPI Cards with Icons**: Visual metrics with Material Icons
  - Total Events (primary card with trend indicators)
  - Today's Events with comparison
  - Peak Hour with event count
  - Most Active Category
- **Trend Indicators**: Visual up/down arrows showing day-over-day trends
- **Dynamic Category KPIs**: Grid of all categories with totals and today's counts
- **Daily Summary**: Enhanced summary card with icons and detailed metrics
- **Category Breakdown**: Visual percentage breakdown with animated progress bars
- **Interactive Charts**:
  - Bar Chart: Compare event counts across categories with hover tooltips
  - Line Chart: 24-hour event distribution with gradient fill
- **Manager's Notes**: Theme-aware contextual notes based on activity

### 🏠 Home Page
- **Counter Cards**: Dynamic category cards with increment/decrement
- **Drag & Drop Reordering**: Drag cards to reorganize your categories - order persists automatically
- **Pulse Animations**: Visual feedback when incrementing
- **Delete Categories**: Remove categories with confirmation dialog
- **Custom Categories**: Create new categories on the fly
- **Theme-Aware Styling**: All cards adapt to current theme
- **Visual Drag Feedback**: Smooth animations and highlights during drag operations

### 📋 Event Log
- **Real-Time Search**: Filter events by category, phrase, timestamp, or ID
- **Sortable Table**: Click column headers to sort by timestamp or category
- **Result Count**: See how many events match your search
- **Export Functionality**: Download events as JSON and CSV
- **Responsive Design**: Works seamlessly on all screen sizes

### ✅ Todo List
- **Kanban Board**: Three-column layout (Todo, In Progress, Done)
- **Status Management**: Drag-and-drop or button-based status changes
- **Filtering**: Filter todos by status (All, Todo, In Progress, Done)
- **Count Badges**: See item counts in each column
- **Modern Input**: Centered, card-style input form
- **Persistent Storage**: All todos saved automatically

### ⚙️ Settings
- **Theme Selection**: Switch between four beautiful themes
- **Category Management**: Add and delete custom categories
- **Validation**: Category ID validation (lowercase, alphanumeric, dashes, underscores)
- **Real-Time Updates**: Changes apply immediately

### 💾 Data Management
- **LocalStorage Persistence**: All data saved automatically
- **Debounced Saves**: Optimized write operations (500ms debounce)
- **Daily Reset**: Automatic count reset at midnight
- **Data Export**: JSON and CSV export options
- **Backward Compatible**: Existing data preserved during updates

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ and npm (or yarn/pnpm)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/barkerbg001/Quirk-Counter.git
cd Quirk-Counter
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Building for Production

**Create a production build:**
```bash
npm run build
```

The built files will be in the `dist` directory.

**Preview the production build:**
```bash
npm run preview
```

## 📖 Usage Guide

### Navigation
- **Desktop**: Click the logo to collapse/expand the sidebar, or double-click to go home
- **Mobile**: Use the hamburger menu button (top-left) to open the sidebar
- **Keyboard**: Use `H`, `D`, `E`, `T`, `S` keys for quick navigation

### Adding Events
1. Navigate to **Home** page
2. Click the **"+"** button on any category card
3. Watch the counter increment with a pulse animation
4. Receive a random contextual phrase in a toast notification
5. View the event appear in the analytics dashboard

### Reorganizing Categories
- **Drag and Drop**: Click and drag any category card to reorder it
- **Visual Feedback**: Cards show visual feedback during drag operations
- **Auto-Save**: Your new order is automatically saved to localStorage
- **Button Protection**: Buttons remain clickable - drag only starts from card body

### Viewing Analytics
- Navigate to **Dashboard** to see:
  - Real-time KPI metrics with trend indicators
  - Category breakdowns and percentages
  - Interactive bar and line charts
  - Daily summary with manager's notes

### Managing Categories
- **Add**: Go to Settings → Click `＋` → Enter ID and name → Create
- **Delete**: Click the delete button on any category card → Confirm
- **Note**: Deleting a category removes all associated events

### Using Todos
- **Add**: Type in the centered input field and press Enter
- **Change Status**: Use action buttons on each todo item
- **Filter**: Click filter buttons to view specific statuses
- **Delete**: Click delete button (confirmation required)

### Searching Events
- Navigate to **Event Log**
- Type in the search bar to filter in real-time
- Search works across categories, phrases, timestamps, and IDs

### Exporting Data
- Go to **Event Log** page
- Click **Export** button
- Both JSON and CSV files are downloaded automatically

## 🏗️ Project Structure

```
Quirk-Counter/
├── index.html              # Main HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main App component with routing
│   ├── index.css           # Global styles and theme system
│   ├── assets/
│   │   └── logo.png        # Application logo
│   ├── components/         # Reusable components
│   │   ├── Sidebar.jsx     # Collapsible sidebar navigation
│   │   ├── CategoryCard.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── Dialog.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx   # Enhanced analytics dashboard
│   │   ├── EventLog.jsx
│   │   ├── Todos.jsx
│   │   └── Settings.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAppState.js  # Main state management
│   │   ├── useDebounce.js  # Debouncing utilities
│   │   └── useKeyboardShortcuts.js
│   ├── context/           # React Context providers
│   │   └── AppContext.jsx  # Global state (toasts, dialogs)
│   └── utils/              # Utility functions
│       ├── constants.js    # Themes and default categories
│       └── storage.js      # LocalStorage utilities
└── README.md
```

## 🎨 Themes

### Dragon Dynasty 🐉
- Rich red background (#B71C1C)
- Golden accents (#D4AF37)
- Jade green highlights (#2E7D32)
- Lantern yellow tones (#FFE082)
- Elegant serif font (Noto Serif SC)
- Restaurant-themed phrases

### Neon Nexus ⚡
- Deep space background (#020617)
- Cyan neon accents (#22d3ee)
- Dark card surfaces (#0f172a)
- Monospace font (JetBrains Mono)
- Tech-themed phrases

### Forest Grove 🌲
- Forest green background (#1B4332)
- Light card surfaces (#F0F7F4)
- Earthy green accents (#52B788)
- Natural color palette
- Nature-themed phrases

### Ruby Sea 💎
- Oceanic blue background
- Coral red accents
- Deep sea tones
- Ocean-themed phrases

## 🛠️ Technologies

- **React 18**: Modern React with hooks and component-based architecture
- **Vite 5**: Lightning-fast build tool and dev server
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties, Animations)
- **LocalStorage API**: Client-side data persistence
- **SVG**: Vector graphics for charts

## 🎯 Key Features

### Performance
- ⚡ **Lazy Loading**: Pages loaded on-demand for faster initial load
- 🎯 **Debounced Saves**: Optimized localStorage writes (500ms delay)
- 🧠 **Memoization**: React.memo and useMemo for performance
- 📦 **Code Splitting**: Automatic code splitting with React.lazy

### User Experience
- ⌨️ **Keyboard Shortcuts**: Full keyboard navigation
- 🖱️ **Drag & Drop**: Intuitive card reordering with visual feedback
- 🔍 **Real-Time Search**: Instant filtering in Event Log
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Smooth Animations**: Polished transitions throughout
- ♿ **Accessibility**: ARIA labels, semantic HTML, keyboard support

### Architecture
- 🏗️ **Component-Based**: Modular, reusable React components
- 🔄 **Context API**: Global state management
- 🎣 **Custom Hooks**: Reusable logic (useAppState, useDebounce, etc.)
- 🛡️ **Error Boundaries**: Graceful error handling
- 📝 **Clean Code**: Well-organized, maintainable structure

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

## 💡 Customization

### Adding Categories
Navigate to **Settings** → Click `＋` → Enter:
- **ID**: Lowercase, alphanumeric, dashes, underscores only
- **Name**: Display name for the category

### Adding Custom Phrases
Edit `src/utils/constants.js`:
```javascript
phrases: {
    yourCategory: [
        "Custom phrase 1",
        "Custom phrase 2"
    ]
}
```

### Creating Themes
Extend the `themes` object in `src/utils/constants.js` with your theme configuration.

## 📝 Changelog

### Version 2.0.0 - Modern React Architecture
- ⚛️ **Migrated to Vite + React**: Complete rewrite with modern React
- 🧭 **Collapsible Sidebar**: Modern navigation with expand/collapse
- 🎨 **Logo Integration**: Theme-tinted logo with toggle functionality
- 📊 **Enhanced Dashboard**: Icons, trends, dynamic KPIs, improved charts
- 🔍 **Event Search**: Real-time search with filtering
- ⌨️ **Keyboard Shortcuts**: Full keyboard navigation
- 🚀 **Performance**: Lazy loading, debounced saves, memoization
- 🛡️ **Error Handling**: Error boundaries and better loading states
- 🎯 **UX Improvements**: Better toast system, improved layouts
- 🖱️ **Drag & Drop**: Reorganize category cards with intuitive drag and drop

### Version 1.4.0
- ✅ Todo List system with Kanban board
- 📋 Three-column status tracking
- 🔍 Todo filtering

### Version 1.3.0
- 💬 Custom dialog system
- 🎨 Theme-aware dialogs

### Version 1.2.0
- 🌲 Forest Grove theme
- 📤 Export functionality
- 🔄 Daily reset

### Version 1.1.0
- ➕ Custom category creation
- 🗑️ Category deletion

### Version 1.0.0
- ✨ Initial release
- 🎨 Dual theme system
- 📊 Analytics dashboard

## 🔮 Future Enhancements

- [ ] Date range filtering for analytics
- [ ] Additional chart types (pie chart, heatmap)
- [ ] Data backup/restore functionality
- [ ] Weekly/monthly summary reports
- [ ] Custom reset schedules
- [ ] TypeScript migration
- [ ] Unit tests
- [ ] PWA support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**barkerbg001**
- GitHub: [@barkerbg001](https://github.com/barkerbg001)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/barkerbg001/Quirk-Counter/issues).

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

---

Made with ❤️ and ☕ by [barkerbg001](https://github.com/barkerbg001)
