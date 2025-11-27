# Daily Planner - Plan, Reflect, Grow

A beautiful productivity web app focused on daily planning, reflection, and long-term visual progress tracking.

## Features

### 1. Weekly Planner
- View your entire week at a glance
- Add, edit, and delete tasks for each day
- Set optional start and end times for tasks
- Mark tasks as completed
- See daily ratings directly in the weekly view
- Navigate between weeks easily

### 2. End-of-Day Reflection
- Rate each day from 1-10
- Add optional reflection notes
- View completed tasks for the day
- Navigate through past days to update reflections
- Quick and frictionless interface

### 3. 100-Day Progress View
- **Color-coded Grid**: 10x10 grid showing 100 days of progress
  - Gray: No rating yet
  - Cool colors: Low ratings (1-3)
  - Purple/Blue: Medium ratings (4-7)
  - Warm colors: High ratings (8-10)
- **Mountain Graph**: Exponential growth visualization
  - Growth accelerates with consistent high ratings
  - Visual representation of your journey
- **Day Details**: Click any day to see rating, reflection, and tasks

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom pastel color palette
- **Recharts** - Data visualization for growth mountain
- **date-fns** - Date manipulation
- **Local Storage** - Data persistence (browser-based)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

### Adding Tasks
1. Navigate to the "Week" tab
2. Click "Add task" on any day
3. Fill in the task details (title required, others optional)
4. Click "Create"

### Daily Reflection
1. Navigate to the "Reflect" tab
2. Select a rating from 1-10
3. Optionally add a reflection note
4. Click "Save Reflection"

### Viewing Progress
1. Navigate to the "Progress" tab
2. View the 100-day grid to see your rating patterns
3. Check the Mountain Graph to see exponential growth
4. Click any day in the grid to see detailed information

## Data Storage

All data is stored locally in your browser's localStorage. This means:
- ✅ Your data is private and stays on your device
- ✅ No account or login required
- ⚠️ Clearing browser data will delete your progress
- ⚠️ Data doesn't sync across devices

## Design Philosophy

- **Minimal & Clean**: Soft pastel colors, generous white space, rounded corners
- **Desktop-first**: Optimized for desktop use, but responsive on mobile
- **Low Friction**: Quick interactions, no unnecessary complexity
- **Visual Motivation**: Growth visualization encourages consistency

## Color Palette

- Pastel Pink: `#FFD1DC`
- Pastel Blue: `#AEC6CF`
- Pastel Lavender: `#E6E6FA`
- Pastel Mint: `#B5EAD7`
- Pastel Peach: `#FFDAB9`
- Pastel Yellow: `#FFF9C4`
- Pastel Purple: `#D4C5F9`
- Pastel Green: `#C7EFCF`

## Project Structure

```
webplan/
├── app/
│   ├── week/         # Weekly planner page
│   ├── reflect/      # Daily reflection page
│   ├── progress/     # 100-day progress page
│   ├── layout.tsx    # Root layout with navigation
│   └── globals.css   # Global styles
├── components/
│   ├── Navigation.tsx    # Top navigation bar
│   ├── TaskCard.tsx      # Individual task display
│   └── TaskModal.tsx     # Task creation/editing modal
├── lib/
│   ├── types.ts      # TypeScript type definitions
│   ├── context.tsx   # React Context for state management
│   ├── storage.ts    # LocalStorage utilities
│   └── utils.ts      # Helper functions
└── README.md
```

## Future Enhancements

Potential features for future versions:
- Cloud sync for multi-device access
- Export data to CSV/JSON
- Custom themes and color palettes
- Streak tracking and achievements
- Task categories and tags
- Weekly/monthly reports
- Drag-and-drop task reordering
- Recurring tasks

## License

ISC

## Contributing

This is a personal productivity app. Feel free to fork and customize for your own needs!
