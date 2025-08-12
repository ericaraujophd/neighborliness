# Materials Table Management

This folder contains:
- `materials.md`: The main Markdown file for adding and editing resource entries.
- `materials-html.html`: The dynamic HTML table for viewing and filtering resources on the web.
- `md-to-html-table.js`: A Node.js script to convert the Markdown table in `materials.md` to HTML table rows and update `materials-html.html` automatically.

## How to Add New Content
1. Open `materials.md` and add your new resource entry to the Markdown table.
2. Save your changes.

## How to Update the HTML Table
1. Open a terminal and navigate to this folder:
   ```sh
   cd /Users/ea47/Documents/GitPages/neighborliness/materials
   ```
2. Run the script:
   ```sh
   node md-to-html-table.js
   ```
3. This will update the table in `materials-html.html` with your latest content from `materials.md`.

## Notes
- The HTML table is dynamic and supports filtering in the browser.
- Only edit `materials.md` to add or update resources; the script will handle the HTML conversion.
- If you encounter any issues, ensure Node.js is installed and you are running the script from the correct folder.

---
For questions or improvements, contact the repository maintainer.
