# Bitscale Grid - Data Management Interface

A fully responsive, feature-rich data grid application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- ✅ **Responsive Data Grid** - Fully responsive table that works on all devices
- ✅ **Sorting** - Click column headers to sort data (ascending/descending)
- ✅ **Filtering** - Advanced filtering with search and multiple filter options
- ✅ **Infinite Scroll** - Loads 10 rows per page dynamically as you scroll
- ✅ **Expandable Rows** - Click on rows to view additional details
- ✅ **Interactive Status** - Click email status badges to see action dropdowns
- ✅ **Real-time Data** - Mock data generator for realistic testing

### UI Components
- Payment banner (dismissible)
- Header with progress indicator
- Toolbar with action buttons
- Filter modal with search and checkboxes
- Sort modal with field selection
- Email status dropdown with contextual actions
- Bottom tabs navigation
- Loading spinner for infinite scroll

### Design Features
- Clean, professional interface matching the original design
- Smooth animations and transitions
- Hover effects and interactive states
- Company favicons from Google's favicon API
- Color-coded status indicators
- Responsive breakpoints for mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect, useCallback)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
bitscale-grid/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with state management
│   └── globals.css         # Global styles
├── components/
│   ├── PaymentBanner.tsx   # Dismissible payment alert
│   ├── Header.tsx          # Top navigation
│   ├── Toolbar.tsx         # Action buttons toolbar
│   ├── DataTable.tsx       # Main data table
│   ├── DataTableRow.tsx    # Individual table rows
│   ├── FilterModal.tsx     # Filter dialog
│   ├── SortModal.tsx       # Sort dialog
│   ├── EmailStatusDropdown.tsx  # Status actions
│   ├── BottomTabs.tsx      # Bottom navigation
│   └── LoadingSpinner.tsx  # Loading indicator
├── data/
│   └── mockData.ts         # Mock data generator
├── lib/
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript interfaces
└── package.json
```

## Features Breakdown

### Sorting
- Click any sortable column header to sort
- Toggle between ascending and descending order
- Visual indicator shows current sort field and direction
- Accessible through toolbar "Sort by" button

### Filtering
- **Search**: Filter by name, company, or website
- **Company Filter**: Multi-select company filter
- **Email Status Filter**: Filter by "Email Found" or "Run condition not met"
- Real-time filtering as you type or select options

### Infinite Scroll
- Initially loads 10 rows
- Automatically loads 10 more rows when scrolling near bottom
- Shows loading spinner while fetching
- Stops at 30 total rows (configurable)
- Intersection Observer API for performance

### Expandable Rows
- Click row, name, or arrow icon to expand
- Shows additional details: phone, job title, location, company size, industry, last contact
- Smooth expand/collapse animation
- Blue background for expanded content

### Email Status Actions
- Click status badge to open action menu
- Different actions for "Email Found" vs "Run condition not met"
- Positioned relative to clicked element
- Closes when clicking outside

## Customization

### Changing Row Count
Edit `data/mockData.ts` and modify the numbers in `generateMockData()` calls.

### Adding More Columns
1. Update `CompanyData` interface in `types/index.ts`
2. Add column in `DataTable.tsx` header
3. Add data in `DataTableRow.tsx`
4. Update mock data generator in `data/mockData.ts`

### Styling
All styles use Tailwind CSS. Modify classes directly in components or extend `tailwind.config.ts`.

## Performance Optimizations

- Intersection Observer for infinite scroll
- Event delegation for row clicks
- Memoized filtering and sorting functions
- Debounced search input (if needed)
- Optimized re-renders with React hooks

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Author

Built as a demonstration of modern React/Next.js development practices.