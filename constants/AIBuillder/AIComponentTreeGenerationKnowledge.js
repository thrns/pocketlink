export const AIComponentTreeGenerationKnowledge = `
# Layout System Knowledge Base

This document outlines best practices and structural guidelines for generating high-conversion, visually appealing layouts for various audiences (brands, agencies, entrepreneurs, content creators, and more). It also describes how to integrate the theme system for a cohesive user experience.

---

## 1. Layout Structure Overview

Each layout is defined by the following **core sections**:
- **Hero Section:** Bold headline, key offer, and strong visual (image/video)
- **Showcase Section:** Carousel or grid of products/services/portfolio items
- **Section Titles:** Clear, scannable headings for each major content block
- **Social Proof:** Testimonials, client logos, reviews, or user stories
- **Call to Action (CTA):** Prominent, action-oriented button or link
- **Rich Media:** High-quality images, videos, or interactive elements
- **Additional Resources:** FAQs, guides, or downloadable content (optional)

---

## 2. Layout Principles

- **Visual Hierarchy:** Emphasize important elements (headline, CTA, offer)
- **Scannability:** Use section titles, carousels, and grids for easy navigation
- **Interactivity:** Include clickable elements (cards, carousels, CTAs)
- **Trust Signals:** Add testimonials, reviews, and partner/client logos
- **Responsiveness:** Ensure layouts adapt to all device sizes
- **Theme Consistency:** Apply theme properties for a unified look

---

## 3. Audience-Specific Layout Guidelines

### a. For Brands
- **Hero:** Brand slogan/value prop, offer, product image/video
- **Product Carousel:** Feature bestsellers or new arrivals
- **Social Proof:** Customer reviews, influencer videos
- **CTA:** “Shop Now”, “Explore Collection”
- **Theme Usage:** Use vibrant or brand-aligned themes (e.g., EMERALD, ROSE, NEON)

### b. For Agency Owners
- **Hero:** Agency mission, key differentiator
- **Case Study Carousel:** Client success stories, before/after visuals
- **Service Grid:** List of core services
- **Social Proof:** Client testimonials, partner logos
- **CTA:** “Book a Strategy Call”
- **Theme Usage:** Professional themes (NAVY_PROFESSIONAL, GRAPHITE, STEEL_BLUE)

### c. For Entrepreneurs
- **Hero:** Startup vision, elevator pitch
- **Milestone Timeline:** Achievements, funding rounds, press mentions
- **Product/Service Grid:** MVPs, features, or solutions
- **Community Section:** Founder stories, user testimonials
- **CTA:** “Get Started”, “Join Our Community”
- **Theme Usage:** Modern/trendy or calming themes (MONOCHROME, MORNING_MIST, SOFT_SAGE)

### d. For Content Creators
- **Hero:** Personal brand tagline, profile image
- **Portfolio Carousel:** Top videos, articles, or social posts
- **Collaboration Grid:** Brands or creators they’ve worked with
- **Fan Testimonials:** Comments, video shoutouts
- **CTA:** “Subscribe”, “Work With Me”
- **Theme Usage:** Gen Z/aesthetic or special themes (DUSTY_PINK, CYBERPUNK, BLUSH)

---

## 4. Theme System Integration

**Theme Properties:**
- name: Display name
- color: Main theme color
- textMode: "light" or "dark" (determines text color)
- background: Page background color
- cardBackground: Card container background
- border: Border color
- accent (optional): Highlight or accent color

**Theme Usage in Components:**
- **Backgrounds:** Use themeData.background for main container, themeData.cardBackground for cards
- **Text:** Use themeData.textMode === "dark" ? "black" : "white"
- **Borders:** Use themeData.border
- **Accents:** Use themeData.color for highlights, CTAs, or interactive elements



`;
