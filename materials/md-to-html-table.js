// Script to convert Markdown table in materials.md to HTML table rows
const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'materials.md');
const htmlRowsPath = path.join(__dirname, 'materials-html-rows.txt');

const md = fs.readFileSync(mdPath, 'utf8');
const lines = md.split('\n');
const tableStart = lines.findIndex(line => line.startsWith('|'));
const tableLines = lines.slice(tableStart);

const rows = [];
for (let i = 2; i < tableLines.length; i++) { // skip header and separator
  const cols = tableLines[i].split('|').map(c => c.trim()).filter(Boolean);
  if (cols.length === 5) {
    rows.push(`<tr><td>${cols[0]}</td><td>${cols[1]}</td><td>${convertLink(cols[2])}</td><td>${cols[3]}</td><td>${cols[4]}</td></tr>`);
  }
}
function convertLink(cell) {
  const match = cell.match(/\[(.*?)\]\((.*?)\)/);
  if (match) {
    return `<a href="${match[2]}" target="_blank">${match[1]}</a>`;
  }
  return cell;
}
fs.writeFileSync(htmlRowsPath, rows.join('\n'));
console.log('HTML table rows written to', htmlRowsPath);
