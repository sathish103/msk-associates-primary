# BMSR & Co | Chartered Accountants Website

This workspace contains a polished static website for **BMSR & Co | Chartered Accountants**. It has been engineered to look and behave like a real‑world professional firm site, with full responsiveness on desktop and mobile. Features include:

- Sticky header with anchor navigation and scroll‑spy highlighting
- Hero banner slideshow with rotating captions
- Services overview, team bios, background information and contact section
- Embedded Google Map, social media links and contact details
- Custom chat widget offering quick answers and prompting users to reach out
- Smooth scroll between page sections and a top contact bar

The codebase is intentionally simple HTML/CSS/JS so you can host it on any static server or GitHub Pages.

## File structure

```
bmsr-associates-site/
├── LICENSE
├── package.json
├── README.md
├── src/
│   ├── index.html          # single‑page landing layout with anchor sections
│   ├── about.html          # auxiliary page linking back to index
│   ├── services.html       # detailed services page
│   ├── team.html           # team profiles and bios
│   ├── contact.html        # contact form & map
│   ├── css/
│   │   └── style.css       # responsive, modern stylesheet
│   ├── js/
│   │   └── main.js         # UI scripts (menu, chat, slider, scroll spy)
│   └── assets/
│       ├── images/         # logos, photos, hero images, etc.
│       └── fonts/          # optional custom fonts
```

### Getting started

1. Open `src/index.html` in a browser to preview the site. No build step is required.
2. Replace placeholder images in `src/assets/images/` with your own company logo, team photo and hero backgrounds.
3. Customize text, colors, contact information and chat responses directly in the HTML/JS files.

Enjoy building a professional static website – this template provides a strong foundation and carries all elements requested, including chat, maps, social, scrolling behaviour, and responsive design.
## Project Structure

```
bmsr-associates-site
├── src
│   ├── index.html         # Main entry point of the website
│   ├── about.html         # Background information about the firm
│   ├── services.html      # List of services provided by the firm
│   ├── team.html          # Introduction of team members
│   ├── contact.html       # Contact form and firm details
│   ├── css
│   │   └── style.css      # Styles for the website
│   ├── js
│   │   └── main.js        # JavaScript functionality
│   └── assets
│       ├── images         # Folder for images (e.g., profile pictures)
│       └── fonts          # Folder for custom fonts
├── .gitignore             # Files and directories to ignore in version control
├── package.json           # Project metadata and dependencies
├── README.md              # Documentation about the project
└── LICENSE                # Licensing information
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd bmsr-associates-site
   ```

2. **Install Dependencies**
   If there are any dependencies specified in `package.json`, install them using:
   ```bash
   npm install
   ```

3. **Run the Project**
   Open `src/index.html` in your web browser to view the website.

## Usage

- Navigate through the website using the links provided in the navigation menu.
- The "About" page provides background information about the firm and its team.
- The "Services" page outlines the various services offered by the firm.
- The "Team" page introduces the key members of the firm, detailing their qualifications and experience.
- The "Contact" page includes a contact form for inquiries and displays the firm's contact details.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests. Your feedback and suggestions are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details.