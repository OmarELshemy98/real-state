# Real Estate Website

A modern, fully responsive real estate website built with pure HTML, CSS, and JavaScript. Features bilingual support (Arabic/English) and static generation compatibility.

## Features

### 🏠 **Image Carousel**
- Displays apartment images in an interactive carousel
- Auto-play functionality with 5-second intervals
- Navigation arrows and dot indicators
- Touch/swipe support for mobile devices
- Click any image to open in lightbox popup

### 🎥 **Video Section**
- Embedded video player with full controls
- Responsive design for all screen sizes
- Audio controls (play/pause/mute)

### 📋 **Apartment Details**
- Comprehensive property information
- Specifications and amenities
- Clean, organized layout

### 💰 **Price Section**
- Prominent price display
- Eye-catching gradient background

### 📅 **Booking Form**
- Date picker (minimum date: today)
- Time selector with multiple options
- Name input field
- Buyer/Broker checkbox
- WhatsApp integration for form submission

### 📞 **Contact Section**
- WhatsApp button (opens chat with prefilled message)
- Call button (triggers phone call)
- Direct contact to: 01026238072

### 🌐 **Bilingual Support**
- Arabic (RTL) and English (LTR) languages
- Language toggle button
- All content translated
- Proper RTL/LTR layout switching

## File Structure

```
real-state/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── images/             # Apartment images folder
│   ├── 1.jpg
│   ├── 2.png
│   ├── 3.jpg
│   └── ... (all other images)
└── README.md           # This file
```

## How to Use

1. **Setup**: Simply open `index.html` in a web browser
2. **Language Toggle**: Click the language button in the top-left corner
3. **Image Gallery**: 
   - Use arrow buttons or dots to navigate
   - Click any image to view in full-screen lightbox
   - Swipe on mobile devices
4. **Video**: Use standard video controls
5. **Booking**: Fill out the form and submit to send WhatsApp message
6. **Contact**: Click WhatsApp or call buttons for direct contact

## Technical Details

### Static Generation Compatible
- No React hooks or client-side rendering
- Pure HTML/CSS/JavaScript
- Works with any static site generator
- No build process required

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Custom responsive breakpoints
- Touch-friendly interface

### Performance
- Lazy loading for images
- Optimized animations
- Minimal JavaScript footprint
- Fast loading times

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adding Images
1. Place new images in the `images/` folder
2. Update the `imageFiles` array in `script.js`
3. Images will automatically appear in the carousel

### Changing Contact Information
- Update phone number in HTML and JavaScript files
- Modify WhatsApp messages in `script.js`

### Styling
- Modify `styles.css` for custom styling
- Tailwind CSS classes can be adjusted in HTML
- Color scheme and fonts can be customized

## Contact

For support or questions, contact: 01026238072

---

**Note**: This website is designed to be completely static and server-side rendered compatible. All interactivity is handled through vanilla JavaScript without any client-side frameworks. 