vv🎟️ EventHub – Real-Time Event Management Platform
EventHub is a full-stack, production-grade platform for creating, managing, and engaging with events in real time. Built with React, Supabase, and modern frontend tools, it provides an enterprise-level experience for both event organizers and attendees.

---

## 🚀 Features

### 🧑‍💼 For Event Hosts
- Create, edit, and manage events
- Dashboard with real-time metrics (RSVPs, check-ins)
- Walk-in registration support
- Live feedback stream (comments + emojis)
- Post-event analytics dashboard
- Automated email notifications
- Role-based access and event ownership

### 🙋 For Attendees
- Event discovery and RSVP
- Time-gated check-in experience
- Real-time feedback with reactions
- Track personal event engagement
- Event recommendations (based on preferences)

### 🔄 Shared Features
- Google OAuth and email/password login
- Mobile-first responsive design
- Live updates via Supabase subscriptions
- Notifications system (mocked)
- Social features: event sharing & user connections
- SEO optimized and performance-tuned

---

## 🧱 Tech Stack

### Frontend
- **React 18 + TypeScript**
- **Vite** – Fast bundler & dev server
- **Tailwind CSS**, **Radix UI**, **Shadcn/UI**
- **TanStack Query** – Server state management
- **Framer Motion**, **Recharts** – Animations & data viz
- **React Router**, **React Hook Form**, **Zod**

### Backend
- **Supabase** – PostgreSQL + RLS + Auth
- **Edge Functions** – Serverless backend logic
- **Google OAuth** – Authentication provider
- **Real-time subscriptions** – Via Supabase

### Tooling & Testing
- **ESLint**, **Prettier**
- **Vitest**, **React Testing Library**
- **Performance Monitoring** – Lazy loading + caching

---

## 📦 Database Schema

| Table         | Purpose                            |
|---------------|------------------------------------|
| `users`       | Auth & profile data                |
| `events`      | Event details & metadata           |
| `rsvps`       | RSVP & check-in tracking           |
| `feedback`    | Comments + emoji reactions         |
| `notifications` | Mocked alert system              |
| `connections` | User relationships                 |
| `email_queue` | Email reminders                    |

---

## 🔐 Authentication & Authorization

- Role-based access (Host / Attendee)
- Supabase Row-Level Security (RLS)
- Event isolation: Hosts only see their own events
- Secure check-in & RSVP management

---

## 📊 Analytics & Reporting

- RSVP vs Actual Attendance (Bar/Line chart)
- Top Emoji Reactions (Pie chart)
- Feedback Trends (Tag Cloud)
- Walk-in Metrics
- Personal insights for attendees

---

## 🖥️ UI/UX Design Highlights

- Calendar view of events
- Blinking "Live" badge
- Mobile-first check-in and feedback screens
- Modular and reusable UI components
- Lazy-loaded routes and error boundaries

---

## 📂 Project Structure
src/
│
├── auth/ # Login, Signup, Role routing
├── host/ # Host dashboard, Event editor
├── attendee/ # Attendee dashboard, RSVP
├── live/ # Live event screen
├── analytics/ # Reporting & insights
├── components/ # Reusable UI components
├── lib/ # Supabase client, helpers
├── types/ # Shared TypeScript interfaces
├── hooks/ # Custom React hooks
