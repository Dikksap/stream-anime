# DESIGN.md

# AniStream Frontend Design
Version: 1.0

---

# Overview

AniStream adalah website streaming anime modern dengan tampilan premium bertema dark mode.

Project dibangun menggunakan:

- React 19
- Vite
- React Router
- TailwindCSS
- Framer Motion
- Axios
- TanStack Query
- React Icons

Design mengutamakan:

- Modern
- Clean
- Responsive
- Fast
- Component Based
- Reusable UI
- Mobile First

---

# Design Philosophy

UI harus terasa seperti kombinasi:

- Netflix
- Crunchyroll
- Disney+
- Prime Video

Karakteristik utama:

- Dominasi warna hitam
- Accent merah
- Card besar
- Hero cinematic
- Banyak whitespace
- Smooth animation
- Hover interaction
- Rounded medium
- Shadow lembut

---

# Color Palette

Primary

Netflix Red

#E50914

Background

#131313

Surface

#1C1B1B

Surface High

#2A2A2A

Card

#353534

Text Primary

#E5E2E1

Text Secondary

#B4B5B5

Border

rgba(255,255,255,0.08)

Hover

rgba(229,9,20,.2)

---

# Typography

Font

Inter

Hierarchy

Display
48px

Heading
32px

Title
24px

Subtitle
20px

Body
16px

Small
14px

Caption
12px

Weight

400

500

600

700

800

---

# Border Radius

Button

8px

Card

12px

Image

12px

Avatar

50%

Modal

16px

---

# Shadow

Default

shadow-lg

Hover

shadow-red-500/20

---

# Layout

Desktop

1440px

Content

1280px

Padding Desktop

60px

Padding Tablet

32px

Padding Mobile

16px

---

# Responsive Breakpoints

Mobile

<640px

Tablet

640px

Laptop

1024px

Desktop

1280px

Large Desktop

1536px

---

# Page Structure

Home

Navbar

Hero Banner

Trending

New Releases

Popular Genres

Newsletter

Footer

Anime Detail

Header

Cover

Information

Synopsis

Episodes

Recommendation

Player

Video Player

Episode List

Comments

Search

Search Bar

Filter

Result Grid

Genre

Genre Header

Anime Grid

Profile

Avatar

Watch History

Favorite

Settings

Authentication

Login

Register

Forgot Password

---

# Component Architecture

src/

components/

layout/

Navbar

Footer

Container

Section

Hero/

HeroBanner

HeroButton

HeroContent

anime/

AnimeCard

AnimeRow

AnimeGrid

EpisodeCard

GenreCard

Badge

buttons/

PrimaryButton

SecondaryButton

IconButton

inputs/

SearchInput

FilterSelect

Checkbox

cards/

GlassCard

InfoCard

ui/

Modal

Drawer

Skeleton

Spinner

EmptyState

Pagination

Rating

Avatar

Toast

Chip

---

# Shared Components

Container

Reusable section wrapper

Button

Variants

Primary

Secondary

Ghost

Outline

Card

Hover animation

Rounded

Image zoom

Badge

Trending

New

Exclusive

Genre

Skeleton

Loading placeholder

Modal

Reusable modal

---

# Hero Section

Height

800px desktop

500px mobile

Contains

Background image

Gradient overlay

Title

Description

Watch button

My List button

Information badge

Animation

Fade

Scale

Slide Up

---

# Trending Section

Horizontal scroll

Desktop

Drag support

Mobile

Swipe support

Hover

Scale

Glow

Information appears

---

# Anime Card

Image

16:9

Hover

Scale

Shadow

Overlay

Information

Contains

Title

Genre

Rating

Year

Episode

---

# Genre Card

Simple icon

Hover

Background berubah merah

Icon berubah putih

Text berubah putih

---

# Navbar

Sticky

Transparent

Blur background

Contains

Logo

Navigation

Search

Notification

Avatar

Desktop

Horizontal

Mobile

Hamburger Menu

---

# Footer

Company

Privacy

Terms

Help

Social Media

---

# Animation

Framer Motion

Page Transition

Fade

Slide

Scale

Card Hover

Scale

1.05

Button Hover

Scale

1.03

Hero

Fade Up

Carousel

Smooth Scroll

---

# Icons

React Icons

Heroicons

Lucide React

Material Symbols

---

# Images

Aspect Ratio

16:9

Loading

Lazy Loading

Placeholder

Skeleton

Hover

Zoom

---

# State Management

React Context

Untuk:

Theme

Authentication

Sidebar

Modal

Notification

TanStack Query

Untuk:

Anime

Episode

Genre

Search

Recommendation

Axios

Untuk request API

---

# Folder Structure

src/

assets/

components/

hooks/

layouts/

pages/

services/

api/

contexts/

store/

routes/

utils/

constants/

types/

styles/

App.jsx

main.jsx

---

# Accessibility

Semua button memiliki aria-label

Semua gambar memiliki alt

Keyboard navigation

Focus state

Color contrast minimal WCAG AA

---

# Performance

Lazy Loading

React.lazy()

Suspense

Image Lazy Loading

Pagination

Infinite Scroll

Memoization

useMemo

useCallback

React.memo

---

# UI Rules

Semua component harus reusable.

Tidak boleh menggunakan inline CSS.

Gunakan Tailwind Utility.

Hindari hardcoded color.

Gunakan class helper.

Tidak boleh menggunakan ukuran tetap kecuali Hero.

Gunakan responsive utility Tailwind.

Semua section memiliki spacing yang konsisten.

Hover animation maksimal 300ms.

Transition harus smooth.

Semua data berasal dari API.

Tidak boleh ada dummy data di production.

---

# Future Features

Dark/Light Theme

Watch History

Continue Watching

Favorite

Rating

Comment

Recommendation

Recently Watched

Notification

Multiple Language

Profile Settings

PWA

Offline Cache

Video Streaming

Subscription

Admin Dashboard

Analytics