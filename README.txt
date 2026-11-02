FIGURE CULT — WEBSITE STARTER
================================

Included files:
- index.html       Home / landing page
- story.html       Story of the collection
- collection.html  Figure grid, filter buttons, detail modal
- about.html       About the collector
- styles.css       Responsive design and visual themes
- script.js        Navigation, theme switching, filtering, modal

HOW TO RUN
1. Extract the ZIP file.
2. Open the folder in Visual Studio Code.
3. Recommended: install the "Live Server" extension.
4. Right-click index.html and choose "Open with Live Server".
   You can also open index.html directly in a browser, but Live Server is better.

HOW TO CHANGE THE FIGURE IMAGES
The first prototype uses original abstract SVG silhouettes, not official anime product photos.
To use your own photos:
1. Create an "images" folder inside this project.
2. Put your images in it, for example images/naruto.jpg.
3. In collection.html, replace the inline <svg> inside each .figure-image with:
   <img src="images/naruto.jpg" alt="Naruto figure" class="figure-photo">
4. Add this to styles.css:
   .figure-photo { width:100%; height:100%; object-fit:cover; }
5. For the modal to show a photo too, the modal script can be adjusted to clone the image element.

THEME COLORS
Naruto: #ff6b16 / #e62f22
Hunter x Hunter: #b7e83f / #35a56b
Berserk: #a51d2d / #6f0f1c
Jujutsu Kaisen: #9b73ff / #34c7f3

NOTES
- This is a front-end prototype; no database or login system is included.
- The figure entries are demo content. Edit names, descriptions, and status to match your project.
- Fonts load from Google Fonts, so an internet connection is needed for those fonts.
- The website uses original abstract placeholder illustrations; replace them with photos you own or have permission to use before presenting if you prefer actual product images.
- To deploy, upload the extracted project to a GitHub repository and import it into Vercel as a static site.
