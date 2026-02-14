# Design Document

## 1. Design Philosophy

SkillBridge AI embraces a **futuristic, AI-centric design language** that balances sophistication with usability. The design system prioritizes:

- **Clarity**: Information hierarchy that guides users naturally
- **Immersion**: Glassmorphism and subtle animations create depth
- **Intelligence**: Visual cues that emphasize AI-powered features
- **Performance**: Smooth interactions without sacrificing aesthetics
- **Accessibility**: Inclusive design for all users

## 2. Visual Design System

### 2.1 Color Palette

#### Primary Colors
- **Primary (Cyan/Teal)**: `hsl(187, 92%, 55%)` - AI accent, CTAs, interactive elements
- **Accent (Purple)**: `hsl(262, 83%, 65%)` - Secondary highlights, badges, special features
- **Background (Deep Navy)**: `hsl(222, 47%, 6%)` - Main canvas
- **Foreground**: `hsl(210, 40%, 98%)` - Primary text

#### Surface Colors
- **Card**: `hsl(222, 47%, 9%)` - Elevated surfaces with glassmorphism
- **Secondary**: `hsl(217, 33%, 17%)` - Muted interactive elements
- **Muted**: `hsl(217, 33%, 14%)` - Disabled states, subtle backgrounds

#### Semantic Colors
- **Success**: `hsl(142, 76%, 45%)` - Positive feedback, completion states
- **Warning**: `hsl(38, 92%, 55%)` - Caution indicators
- **Info**: `hsl(200, 95%, 50%)` - Informational messages
- **Destructive**: `hsl(0, 84%, 60%)` - Error states, dangerous actions

#### Sidebar Colors
- **Sidebar Background**: `hsl(222, 47%, 7%)` - Slightly darker than main background
- **Sidebar Accent**: `hsl(217, 33%, 14%)` - Active/hover states
- **Sidebar Border**: `hsl(217, 33%, 18%)` - Subtle separators

### 2.2 Typography

#### Font Families
- **Sans-serif**: Inter - Primary UI font (300-800 weights)
- **Monospace**: JetBrains Mono - Code editor, technical content

#### Type Scale
- **Display**: 4xl-7xl (36px-72px) - Hero headings
- **Heading**: 2xl-3xl (24px-30px) - Section titles
- **Body**: base-lg (16px-18px) - Main content
- **Small**: sm-xs (12px-14px) - Labels, captions
- **Code**: sm (14px) - Monospace content

#### Font Weights
- **Light**: 300 - Subtle text
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasized text
- **Semibold**: 600 - Subheadings
- **Bold**: 700 - Headings
- **Extrabold**: 800 - Display text

### 2.3 Spacing & Layout

#### Spacing Scale (Tailwind)
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **base**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

#### Border Radius
- **Default**: 0.75rem (12px) - Cards, buttons
- **Medium**: 0.5rem (8px) - Inputs, badges
- **Small**: 0.25rem (4px) - Tight elements
- **Full**: 9999px - Pills, avatars

#### Container Widths
- **Max Width**: 1400px (2xl breakpoint)
- **Padding**: 2rem responsive padding

### 2.4 Effects & Animations

#### Glassmorphism
```css
.glass-card {
  background: linear-gradient(145deg, 
    hsl(222 47% 11% / 0.9), 
    hsl(222 47% 8% / 0.95));
  backdrop-filter: blur(12px);
  border: 1px solid hsl(217 33% 20% / 0.5);
}
```

#### Glow Effects
- **Primary Glow**: `0 0 40px hsl(187 92% 55% / 0.4)` - Hover states, focus
- **Accent Glow**: `0 0 40px hsl(262 83% 65% / 0.3)` - Special elements
- **Soft Glow**: `0 0 60px hsl(187 92% 55% / 0.2)` - Ambient lighting

#### Gradient Definitions
- **Primary Gradient**: Cyan → Blue → Purple (135deg)
- **Card Gradient**: Subtle depth gradient (145deg)
- **Radial Glow**: Elliptical gradient for ambient effects

#### Animation Library
- **Fade In Up**: 0.6s ease-out - Page load animations
- **Float**: 6s ease-in-out infinite - Floating elements
- **AI Pulse**: 2s ease-in-out infinite - AI indicators
- **Shimmer**: 2s linear infinite - Loading states
- **Stagger Children**: Sequential fade-in (0.1s increments)

### 2.5 Grid & Background Patterns

#### Grid Pattern
- **Size**: 60px × 60px
- **Color**: Border color at 30% opacity
- **Usage**: Hero section, empty states

#### Radial Gradients
- **Ambient Orbs**: Large blurred circles for depth
- **Positioning**: Strategic placement (top-left, bottom-right)
- **Animation**: Pulse glow effect

## 3. Component Design Patterns

### 3.1 Navigation Components

#### Navbar
- **Height**: 4rem (64px)
- **Background**: Glassmorphism with backdrop blur
- **Border**: Bottom border with 50% opacity
- **Logo**: Sparkles icon + gradient text
- **Links**: Ghost buttons with hover states
- **Mobile**: Hamburger menu with slide-in drawer

#### Sidebar
- **Width**: 16rem (256px) expanded, 4rem (64px) collapsed
- **Transition**: 300ms smooth width animation
- **Sections**: Logo, navigation, user profile
- **Active State**: Secondary background with accent border
- **Collapse Toggle**: Chevron button with rotation

### 3.2 Card Components

#### Glass Card
- **Background**: Glassmorphism effect
- **Border**: Subtle border with 50% opacity
- **Padding**: 1.5rem-2rem (24px-32px)
- **Hover**: Border color shift to primary/30, soft glow
- **Shadow**: Minimal, relies on border and backdrop

#### Stat Card
- **Layout**: Icon + Value + Label + Change indicator
- **Icon Container**: 2.5rem (40px) rounded square with primary/10 background
- **Value**: 2xl-3xl bold text
- **Change**: Small badge with arrow (up/down) and color coding

#### Student/Candidate Card
- **Structure**: Avatar + Info + Metrics + Actions
- **Avatar**: Gradient background with level number
- **Skills**: Horizontal scrolling badge list
- **Actions**: Shortlist button, view profile link
- **Hover**: Elevated with border glow

### 3.3 Data Visualization

#### Chart Container
- **Background**: Glass card
- **Padding**: 1.5rem (24px)
- **Height**: 250px-350px responsive
- **Tooltip**: Dark card with border, 12px font
- **Colors**: Primary, accent, and semantic colors

#### Chart Types
- **Bar Chart**: Placement trends, department comparisons
- **Line Chart**: Monthly activity, time series
- **Pie Chart**: Domain distribution with custom colors
- **Radar Chart**: Soft skills comparison
- **Progress Bars**: Skill proficiency, completion rates

#### Chart Styling
- **Grid**: Dashed lines with border color at 30% opacity
- **Axes**: Muted foreground, 12px font
- **Bars**: 6px top radius, primary/accent fills
- **Lines**: 2px stroke width, 4px dot radius
- **Legend**: Bottom placement, 12px font

### 3.4 Form Components

#### Input Fields
- **Height**: 2.5rem (40px)
- **Background**: Card color with border
- **Border**: Border color at 50% opacity
- **Focus**: Ring with primary color
- **Padding**: 0.75rem horizontal
- **Font**: 14px regular

#### Buttons
- **Variants**:
  - **Hero**: Gradient background, white text, glow on hover
  - **Default**: Primary background, dark text
  - **Outline**: Transparent with border
  - **Ghost**: Transparent, hover background
  - **Secondary**: Muted background
- **Sizes**: sm (32px), default (40px), lg (48px), xl (56px)
- **States**: Hover (brightness increase), active (scale 0.98), disabled (50% opacity)

#### Badges
- **Variants**:
  - **Default**: Secondary background
  - **AI**: Primary gradient with sparkles icon
  - **Success**: Green background
  - **Outline**: Transparent with border
- **Size**: Compact padding (0.25rem × 0.5rem)
- **Font**: 12px medium weight

### 3.5 Interactive Components

#### Tabs
- **Layout**: Horizontal list with underline indicator
- **Active**: Primary color with bottom border
- **Inactive**: Muted foreground, hover state
- **Transition**: 200ms ease for indicator movement

#### Accordion
- **Header**: Clickable with chevron icon
- **Content**: Smooth height animation (200ms)
- **Border**: Bottom border between items
- **Hover**: Background color shift

#### Dialog/Modal
- **Overlay**: Dark background with 80% opacity
- **Content**: Glass card with max-width
- **Animation**: Fade in + scale from 95% to 100%
- **Close**: X button in top-right corner

#### Tooltip
- **Background**: Dark card with border
- **Arrow**: Matching background
- **Delay**: 200ms before show
- **Font**: 12px regular
- **Padding**: 0.5rem × 0.75rem

### 3.6 Specialized Components

#### Code Editor
- **Background**: Background/50 with backdrop blur
- **Font**: JetBrains Mono, 14px
- **Line Height**: 1.6
- **Padding**: 1rem
- **Scrollbar**: Custom styled (6px width)
- **Syntax**: Minimal highlighting (future enhancement)

#### Skill Heatmap
- **Cell Size**: 2rem × 2rem (32px)
- **Colors**: Gradient from muted to primary based on value
- **Hover**: Scale 1.2, elevated z-index
- **Tooltip**: Shows skill name and proficiency
- **Gap**: 0.25rem (4px) between cells

#### Progress Dashboard
- **Layout**: Grid of metric cards
- **Charts**: Mixed visualization types
- **Filters**: Dropdown selects and date pickers
- **Export**: Download button for reports

#### AI Assistant Panel
- **Layout**: Chat-style interface
- **Messages**: Alternating left/right alignment
- **Input**: Bottom-fixed with send button
- **Indicators**: Typing animation, AI badge
- **Scroll**: Auto-scroll to latest message

## 4. Layout Architecture

### 4.1 Page Layouts

#### Landing Page
```
┌─────────────────────────────────┐
│         Navbar (fixed)          │
├─────────────────────────────────┤
│      Hero (full viewport)       │
├─────────────────────────────────┤
│        How It Works             │
├─────────────────────────────────┤
│     Problem Statements          │
├─────────────────────────────────┤
│       Skill Heatmap             │
├─────────────────────────────────┤
│      Talent Mapping             │
├─────────────────────────────────┤
│          Footer                 │
└─────────────────────────────────┘
```

#### Dashboard Layout
```
┌──────┬──────────────────────────┐
│      │     Header (64px)        │
│      ├──────────────────────────┤
│ Side │                          │
│ bar  │      Main Content        │
│      │    (scrollable)          │
│ 256px│                          │
│      │                          │
└──────┴──────────────────────────┘
```

#### Three-Column Workspace
```
┌──────┬─────────────┬──────────┐
│      │             │          │
│ Side │   Editor    │    AI    │
│ bar  │   (2/3)     │ Assistant│
│      │             │   (1/3)  │
│      │             │          │
└──────┴─────────────┴──────────┘
```

### 4.2 Responsive Breakpoints

- **Mobile**: < 640px (sm)
  - Single column layouts
  - Collapsed sidebar (drawer)
  - Stacked cards
  - Simplified charts

- **Tablet**: 640px-1024px (md-lg)
  - Two-column grids
  - Collapsible sidebar
  - Responsive charts
  - Touch-optimized controls

- **Desktop**: > 1024px (xl)
  - Multi-column layouts
  - Expanded sidebar
  - Full-featured charts
  - Hover interactions

### 4.3 Grid Systems

#### Card Grids
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns
- **Gap**: 1rem (16px)

#### Dashboard Grids
- **Stats**: 1-2-4 columns (mobile-tablet-desktop)
- **Charts**: 1-2 columns (mobile/tablet-desktop)
- **Tables**: Full width with horizontal scroll

## 5. Interaction Design

### 5.1 Micro-interactions

#### Button Interactions
1. **Hover**: Brightness increase (110%), subtle scale (1.02)
2. **Active**: Scale down (0.98), brightness decrease
3. **Focus**: Ring with primary color, 2px offset
4. **Loading**: Spinner icon, disabled state

#### Card Interactions
1. **Hover**: Border color shift, soft glow
2. **Click**: Ripple effect (future), navigation
3. **Focus**: Keyboard navigation support

#### Input Interactions
1. **Focus**: Ring appearance, border color change
2. **Error**: Red border, shake animation
3. **Success**: Green border, checkmark icon
4. **Typing**: Character count, validation feedback

### 5.2 Navigation Patterns

#### Primary Navigation
- **Sidebar**: Persistent, collapsible
- **Active State**: Visual indicator (background + border)
- **Keyboard**: Arrow keys, Enter to select
- **Mobile**: Drawer overlay

#### Secondary Navigation
- **Tabs**: Horizontal with underline
- **Breadcrumbs**: Hierarchical path
- **Pagination**: Numbered with prev/next
- **Filters**: Dropdown menus, chips

### 5.3 Feedback Mechanisms

#### Success States
- **Toast**: Green background, checkmark icon, 3s duration
- **Inline**: Success badge, green text
- **Animation**: Checkmark draw animation

#### Error States
- **Toast**: Red background, alert icon, 5s duration
- **Inline**: Error message below field
- **Animation**: Shake effect

#### Loading States
- **Spinner**: Primary color, 24px size
- **Skeleton**: Animated shimmer effect
- **Progress**: Linear bar with percentage
- **Overlay**: Semi-transparent with spinner

#### Empty States
- **Icon**: Large muted icon (48px)
- **Message**: Heading + description
- **Action**: CTA button to resolve
- **Illustration**: Optional graphic

## 6. Accessibility Design

### 6.1 Color Contrast

- **Text on Background**: 15:1 ratio (AAA)
- **Text on Card**: 12:1 ratio (AAA)
- **Interactive Elements**: 4.5:1 minimum (AA)
- **Focus Indicators**: 3:1 against background

### 6.2 Keyboard Navigation

- **Tab Order**: Logical flow, skip links
- **Focus Visible**: Clear ring indicators
- **Shortcuts**: Common actions (Ctrl+S, Esc)
- **Trap Focus**: In modals and drawers

### 6.3 Screen Reader Support

- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Descriptive labels for icons
- **Live Regions**: Dynamic content announcements
- **Alt Text**: Meaningful image descriptions

### 6.4 Motion Preferences

- **Reduced Motion**: Disable animations when `prefers-reduced-motion`
- **Essential Motion**: Keep functional animations
- **Instant Transitions**: Replace decorative animations

## 7. Design Tokens

### 7.1 CSS Custom Properties

```css
/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Radius */
--radius: 0.75rem;
--radius-sm: 0.25rem;
--radius-full: 9999px;

/* Transitions */
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;

/* Shadows */
--shadow-glow-primary: 0 0 40px hsl(187 92% 55% / 0.4);
--shadow-glow-accent: 0 0 40px hsl(262 83% 65% / 0.3);

/* Z-index */
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

### 7.2 Component Variants

#### Button Variants
- `hero`: Gradient background, glow effect
- `default`: Solid primary
- `secondary`: Muted background
- `outline`: Border only
- `ghost`: Transparent
- `link`: Text only

#### Badge Variants
- `default`: Secondary background
- `ai`: Primary gradient
- `success`: Green
- `warning`: Yellow
- `destructive`: Red
- `outline`: Border only

## 8. Design Patterns

### 8.1 Dashboard Patterns

#### Metric Cards
- Icon + Label + Value + Trend
- Consistent sizing and spacing
- Color-coded trends (green up, red down)
- Hover effects for interactivity

#### Data Tables
- Sticky header row
- Alternating row colors
- Sortable columns
- Row actions (view, edit, delete)
- Pagination or infinite scroll

#### Filter Panels
- Collapsible sections
- Multi-select dropdowns
- Range sliders
- Clear all button
- Applied filters chips

### 8.2 Form Patterns

#### Multi-step Forms
- Progress indicator
- Next/Previous navigation
- Save draft functionality
- Validation per step

#### Inline Editing
- Click to edit
- Save/Cancel buttons
- Validation feedback
- Optimistic updates

### 8.3 Content Patterns

#### Empty States
- Centered content
- Large icon (48px-64px)
- Descriptive message
- Primary action button

#### Loading States
- Skeleton screens for content
- Spinners for actions
- Progress bars for uploads
- Shimmer animation

#### Error States
- Clear error message
- Suggested actions
- Retry button
- Support link

## 9. Iconography

### 9.1 Icon Library
**Lucide React** - Consistent, modern icon set

### 9.2 Icon Sizes
- **xs**: 12px - Inline with small text
- **sm**: 16px - Buttons, badges
- **base**: 20px - Navigation, cards
- **lg**: 24px - Headers, emphasis
- **xl**: 32px - Feature highlights
- **2xl**: 48px+ - Empty states, heroes

### 9.3 Icon Usage
- **Leading**: Before text in buttons/links
- **Trailing**: After text for external links
- **Standalone**: With aria-label for accessibility
- **Decorative**: aria-hidden="true"

## 10. Performance Considerations

### 10.1 Optimization Strategies
- **Code Splitting**: Route-based chunks
- **Lazy Loading**: Below-fold components
- **Image Optimization**: WebP format, responsive sizes
- **CSS**: Purge unused Tailwind classes
- **Animations**: GPU-accelerated transforms

### 10.2 Loading Strategy
- **Critical CSS**: Inline above-fold styles
- **Font Loading**: font-display: swap
- **Skeleton Screens**: Immediate visual feedback
- **Progressive Enhancement**: Core functionality first

## 11. Design System Maintenance

### 11.1 Component Documentation
- Storybook or similar tool (future)
- Usage examples
- Props documentation
- Accessibility notes

### 11.2 Version Control
- Design tokens in version control
- Component changelog
- Breaking change notifications
- Migration guides

### 11.3 Design-Dev Handoff
- Figma/design tool integration
- Token synchronization
- Component parity checks
- Visual regression testing
