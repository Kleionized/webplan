# 🚀 Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Add Your First Task (Week View)

1. The app opens to the **Week** tab by default
2. Find today's column (highlighted with a purple border)
3. Click **"+ Add task"** at the bottom of today
4. Fill in:
   - **Title** (required) - e.g., "Morning workout"
   - **Description** (optional) - e.g., "30 min cardio"
   - **Start Time** (optional) - e.g., "07:00"
   - **End Time** (optional) - e.g., "07:30"
5. Click **"Create"**

### 2. Complete a Task

- Click the checkbox next to any task to mark it complete
- Completed tasks show with a green checkmark and strikethrough text

### 3. Rate Your Day (Reflect View)

1. Click the **"Reflect"** tab in navigation
2. Select a rating from **1-10** based on how your day went
3. (Optional) Add a reflection note
4. Click **"Save Reflection"**

### 4. View Your Progress (Progress View)

1. Click the **"Progress"** tab
2. See your **100-day grid** with color-coded boxes
3. View the **Mountain Graph** showing exponential growth
4. Click any day box to see details

## Tips & Tricks

### Weekly Planning
- Use **Previous/Next Week** arrows to plan ahead
- Click **"Today"** button to quickly return to current week
- Tasks are automatically sorted by start time
- Edit any task by clicking the pencil icon
- Delete tasks with the trash icon

### Daily Reflection
- Reflect at the end of each day for best results
- Use **Previous/Next Day** arrows to update past reflections
- You can see your task completion summary while rating
- Rating colors:
  - **Gray/Blue** (1-3): Tough day
  - **Purple** (4-7): Average day
  - **Yellow/Peach** (8-10): Great day

### Progress Tracking
- The grid shows the last 100 days
- Gray boxes = no rating yet
- Colored boxes = rated days
- Click any box to see full details for that day
- The mountain graph grows exponentially with high ratings
- Consistency creates the most dramatic growth curves

## Understanding the Growth Mountain

The graph uses an exponential formula:

- **High ratings (8-10)** contribute significantly to growth
- **Medium ratings (4-7)** contribute moderately
- **Low ratings (1-3)** contribute minimally
- **Consistency** creates steep growth curves
- **Sporadic high ratings** show slower growth

This mimics real-life compound growth - small consistent actions create big results!

## Data & Privacy

- **All data stays on your device** (localStorage)
- **No account required** - start using immediately
- **No tracking or analytics** - completely private
- **Warning:** Clearing browser data will delete your progress
- **Backup:** Currently no export feature (future enhancement)

## Keyboard Shortcuts

Currently no keyboard shortcuts implemented, but planned for future:
- `n` - New task
- `r` - Rate today
- `←/→` - Navigate days/weeks
- `Esc` - Close modal

## Troubleshooting

### Data not saving?
- Check browser localStorage is enabled
- Try a different browser
- Make sure you're not in incognito mode

### Layout looks broken?
- Hard refresh: `Cmd/Ctrl + Shift + R`
- Clear browser cache
- Update to latest browser version

### Build errors?
```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## File Structure Overview

```
webplan/
├── app/
│   ├── week/page.tsx        # Weekly planner (main view)
│   ├── reflect/page.tsx     # Daily reflection
│   ├── progress/page.tsx    # 100-day grid + graph
│   ├── layout.tsx           # Root layout + navigation
│   └── page.tsx             # Home (redirects to /week)
│
├── components/
│   ├── Navigation.tsx       # Top nav bar
│   ├── TaskCard.tsx         # Individual task UI
│   └── TaskModal.tsx        # Task create/edit modal
│
├── lib/
│   ├── types.ts             # TypeScript types
│   ├── context.tsx          # React Context (state)
│   ├── storage.ts           # localStorage utils
│   └── utils.ts             # Helper functions
│
└── public/                  # Static assets
```

## Next Steps

1. **Plan your week** - Add tasks for the next 7 days
2. **Reflect daily** - Rate each day as it ends
3. **Check progress** - Watch your mountain grow
4. **Build consistency** - Aim for 30+ days in a row
5. **Observe patterns** - Notice what makes great days

---

**Enjoy building your productivity mountain!** 🏔️
