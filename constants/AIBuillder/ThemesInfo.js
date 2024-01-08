export const ThemesInfo = `
Theme System Knowledge Base
This document outlines the theme system used in the application, including all available themes and their properties.
Theme Structure
Each theme is defined with the following properties:
name: Display name of the theme
color: Main theme color (solid color)
textMode: Text color mode ("light" or "dark")
background: Background color for the theme
cardBackground: Background color for cards within the theme
border: Border color for elements
accent: (Optional) Accent color for highlights
Theme Categories
Basic Themes
Theme
Color
Text Mode
Description
LIGHT
#ffffff
dark
Clean white theme with light gray cards
DARK
#121212
light
Dark theme with light text
BLUE
#1e40af
light
Deep blue theme
MINT
#a7f3d0
dark
Soft mint green theme
CORAL
#f87171
light
Warm coral theme
LAVENDER
#c4b5fd
dark
Soft purple theme
AMBER
#fcd34d
dark
Warm amber/yellow theme
SLATE
#64748b
light
Neutral slate gray theme

Standard Themes
Theme
Color
Text Mode
Description
EMERALD
#10b981
light
Rich emerald green theme
ROSE
#f43f5e
light
Vibrant rose/pink theme
INDIGO
#4f46e5
light
Deep indigo theme
TEAL
#14b8a6
light
Teal blue-green theme
VIOLET
#8b5cf6
light
Purple violet theme
AMBER_DARK
#b45309
light
Darker amber/orange theme
CYAN
#06b6d4
dark
Bright cyan theme
LIME
#84cc16
dark
Fresh lime green theme

Gen Z / Aesthetic Themes
Theme
Color
Text Mode
Description
SAGE
#9ca790
dark
Muted sage green aesthetic
MOCHA
#8b7355
light
Warm coffee-inspired theme
DUSTY_PINK
#cdb2aa
dark
Soft, muted pink theme
TERRACOTTA
#b67162
light
Earthy terracotta theme

Professional Themes
Theme
Color
Text Mode
Description
NAVY_PROFESSIONAL
#1e3a8a
light
Deep navy for professional settings
GRAPHITE
#374151
light
Sophisticated graphite gray
STEEL_BLUE
#475569
light
Corporate steel blue theme
EXECUTIVE_BROWN
#78350f
light
Professional executive brown

Calming Themes
Theme
Color
Text Mode
Description
MORNING_MIST
#e2e8f0
dark
Soft morning mist gray
SOFT_SAGE
#d4e4dc
dark
Calming sage green
CLOUD_GRAY
#e5e7eb
dark
Light cloud gray theme
MUTED_LAVENDER
#ddd6fe
dark
Soft, muted purple

Nature-Inspired Themes
Theme
Color
Text Mode
Description
OCEAN_DEPTHS
#0c4a6e
light
Deep ocean blue theme
DESERT_SAND
#fbbf24
dark
Warm desert sand yellow
JUNGLE
#047857
light
Rich jungle green
FOREST
#166534
light
Deep forest green theme

Time of Day Themes
Theme
Color
Text Mode
Description
MIDNIGHT
#020617
light
Deep midnight black theme
TWILIGHT_BLUE
#3730a3
light
Evening twilight indigo
DAWN_PINK
#db2777
light
Early morning pink theme

Modern & Trendy Themes
Theme
Color
Text Mode
Description
NEON
#0d0208
light
Dark theme with neon pink accents
MONOCHROME
#0a0a0a
light
Black and white monochrome theme
CYBERPUNK
#18181b
light
Dark futuristic theme with purple accents

Special Themes
Theme
Color
Text Mode
Description
RETRO
#ffe4e6
dark
Nostalgic pink retro theme
MINIMALIST
#f8fafc
dark
Clean minimalist light theme
HIGH_CONTRAST
#000000
light
Maximum contrast theme with black background and yellow borders

New Aesthetic & Cool Themes
Theme
Color
Text Mode
Description
AUTUMN_LEAVES
#b45309
light
Warm autumn colors theme
MATCHA
#86ab89
dark
Soft matcha green theme
BLUSH
#ffc2c2
dark
Gentle blush pink theme
CARAMEL
#a57c3e
light
Warm caramel brown theme
DEEP_PURPLE
#5b21b6
light
Rich deep purple theme
PISTACHIO
#bef264
dark
Bright pistachio green
WARMTH
#ea580c
light
Warm orange-red theme

Detailed Theme Properties
Basic Theme Examples
LIGHT: { 
  name: "Light", 
  color: "#ffffff", 
  textMode: "dark", 
  background: "#ffffff", 
  cardBackground: "#f0f0ed", 
  border: "#e5e5e5"
}

DARK: { 
  name: "Dark", 
  color: "#121212", 
  textMode: "light", 
  background: "#121212", 
  cardBackground: "#1e1e1e", 
  border: "#2a2a2a"
}

Special Theme Examples
NEON: {
  name: "Neon",
  color: "#0d0208",
  textMode: "light",
  background: "#0d0208",
  cardBackground: "#16051b",
  border: "#ec4899",
  accent: "#f0abfc"
}

HIGH_CONTRAST: {
  name: "High Contrast",
  color: "#000000",
  textMode: "light",
  background: "#000000",
  cardBackground: "#18181b",
  border: "#facc15",
  accent: "#ffffff"
}

Usage in Components
When using the theme system in components, you can access theme properties like:
// Example of using theme properties in a component
<div
  style={{
    background: themeData.cardBackground,
    color: themeData.textMode === "dark" ? "black" : "white",
    borderColor: themeData.border
  }}
>
  Component content
</div>

Theme Properties for Card Components
When developing card components, use these theme properties:
Background Colors:


Parent container: themeData.background
Card background: themeData.cardBackground
Text Colors:


Use conditional: themeData.textMode === "dark" ? "black" : "white"
Borders:


Border color: themeData.border
Special Effects:


Use accent colors when available: themeData.accent
Implementation Notes
Colors use hex values for solid colors


Solid: #ffffff
Dark themes typically use darker background colors
The textMode property determines if dark or light text should be used


"dark" means text should be dark on light backgrounds
"light" means text should be light on dark backgrounds
Some themes have optional accent colors for highlights


Example: accent: "#f0abfc" for the NEON theme
Accents are used for special highlights and interactive elements
Each theme includes cardBackground and border colors specifically designed to complement the main theme color


cardBackground is typically a slightly different shade than the main background
border colors are chosen to provide subtle or bold outlines as appropriate for the theme
Theme Organization


Themes are organized by categories for easier selection
Categories include Basic, Standard, Aesthetic, Professional, Calming, Nature-Inspired, Time of Day, Modern, and Special themes
Theme Selection Guidelines
Basic themes are suitable for general use and work well in most contexts
Professional themes are ideal for business or formal applications
Calming themes work well for reading-heavy or relaxation-focused interfaces
Modern & Trendy themes are great for contemporary, edgy applications
Special themes offer unique visual experiences with features like high contrast or accent colors



`;
