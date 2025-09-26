# Portfolio Website Configuration Guide

This guide explains how to customize your portfolio website using the `config.json` file.

## 📁 Configuration File

The website uses `config.json` to store all customizable information. This allows you to easily update content without modifying the HTML, CSS, or JavaScript files.

## 🔧 Configuration Sections

### 1. Personal Information (`personal`)

```json
{
  "personal": {
    "name": "Ali Akbar",
    "title": "Software Engineer & Developer",
    "description": "Passionate about creating innovative solutions...",
    "email": "aliakbar@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City, Country",
    "profileImage": "fas fa-user"
  }
}
```

**Fields:**
- `name`: Your full name (appears in navigation and hero section)
- `title`: Your professional title
- `description`: Short description for hero section
- `email`: Your contact email
- `phone`: Your phone number
- `location`: Your location
- `profileImage`: Font Awesome icon class for profile image

### 2. About Section (`about`)

```json
{
  "about": {
    "description1": "First paragraph of about section...",
    "description2": "Second paragraph of about section...",
    "stats": [
      {
        "number": "50+",
        "label": "Projects Completed"
      }
    ]
  }
}
```

**Fields:**
- `description1`: First paragraph of about text
- `description2`: Second paragraph of about text
- `stats`: Array of statistics to display

### 3. Experience Section (`experience`)

```json
{
  "experience": [
    {
      "period": "2023 - Present",
      "title": "Senior Software Engineer",
      "company": "Tech Solutions Inc.",
      "description": "Leading development of scalable web applications...",
      "technologies": ["React", "Node.js", "TypeScript", "AWS"]
    }
  ]
}
```

**Fields:**
- `period`: Time period of employment
- `title`: Job title/position
- `company`: Company name
- `description`: Job description and responsibilities
- `technologies`: Array of technologies used in the role

### 4. Projects Section (`projects`)

```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description...",
      "technologies": ["React", "Node.js"],
      "icon": "fas fa-shopping-cart",
      "liveDemo": "https://example.com",
      "github": "https://github.com/username/project"
    }
  ]
}
```

**Fields:**
- `title`: Project name
- `description`: Project description
- `technologies`: Array of technologies used
- `icon`: Font Awesome icon class
- `liveDemo`: Link to live demo
- `github`: Link to GitHub repository

### 5. Social Links (`social`)

```json
{
  "social": [
    { "name": "GitHub", "icon": "fab fa-github", "url": "https://github.com/username" },
    { "name": "LinkedIn", "icon": "fab fa-linkedin", "url": "https://linkedin.com/in/username" }
  ]
}
```

**Fields:**
- `name`: Social platform name
- `icon`: Font Awesome icon class
- `url`: Link to your profile

### 6. Contact Section (`contact`)

```json
{
  "contact": {
    "title": "Let's work together!",
    "description": "I'm always interested in new opportunities...",
    "formAction": "#"
  }
}
```

### 7. Footer (`footer`)

```json
{
  "footer": {
    "copyright": "2024 Ali Akbar. All rights reserved."
  }
}
```

## 🎨 Customization Examples

### Adding a New Experience Entry

```json
{
  "period": "2024 - Present",
  "title": "Your Job Title",
  "company": "Your Company Name",
  "description": "Describe your role and responsibilities...",
  "technologies": ["Technology1", "Technology2", "Technology3"]
}
```

### Adding a New Project

```json
{
  "title": "My New Project",
  "description": "Description of my amazing project...",
  "technologies": ["Vue.js", "Firebase", "Tailwind CSS"],
  "icon": "fas fa-rocket",
  "liveDemo": "https://myproject.com",
  "github": "https://github.com/username/myproject"
}
```

### Adding Social Media

```json
{
  "name": "Twitter",
  "icon": "fab fa-twitter",
  "url": "https://twitter.com/username"
}
```

## 🔄 How It Works

1. **Automatic Loading**: The JavaScript automatically loads `config.json` when the page loads
2. **Dynamic Population**: All content is populated from the config file
3. **Fallback**: If config fails to load, the website uses default content
4. **Real-time Updates**: Changes to `config.json` are reflected immediately after page refresh

## 📝 Best Practices

1. **Keep JSON Valid**: Ensure proper JSON syntax (commas, quotes, brackets)
2. **Use Font Awesome Icons**: For consistent iconography
3. **Test Changes**: Always test after making changes
4. **Backup Config**: Keep a backup of your working config
5. **Validate URLs**: Ensure all links are working and accessible

## 🚀 Quick Start

1. Open `config.json` in a text editor
2. Update the `personal` section with your information
3. Modify `about` section with your story
4. Add your skills in the `skills` section
5. Update `projects` with your work
6. Add your social media links
7. Save the file and refresh your browser

## 🔍 Troubleshooting

- **Content not updating**: Check browser console for errors
- **Icons not showing**: Verify Font Awesome classes are correct
- **Links not working**: Ensure URLs are properly formatted
- **JSON errors**: Use a JSON validator to check syntax

## 📞 Support

If you need help customizing your portfolio, check the main README.md file for additional guidance.