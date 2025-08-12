// Script to convert Markdown table in materials.md to HTML table rows
const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'materials.md');

const htmlPath = path.join(__dirname, 'materials-html.html');

const md = fs.readFileSync(mdPath, 'utf8');
const lines = md.split('\n');
const tableStart = lines.findIndex(line => line.startsWith('|'));
const tableLines = lines.slice(tableStart);

const rows = [];
for (let i = 2; i < tableLines.length; i++) { // skip header and separator
  let line = tableLines[i].trim();
  if (!line || !line.startsWith('|')) continue; // skip blank or non-table lines
  // Remove leading/trailing pipes and split
  let cols = line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
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

let html = fs.readFileSync(htmlPath, 'utf8');
const tbodyStart = html.indexOf('<tbody>');
const tbodyEnd = html.indexOf('</tbody>');
if (tbodyStart !== -1 && tbodyEnd !== -1) {
  const before = html.slice(0, tbodyStart + 8); // include <tbody>
  const after = html.slice(tbodyEnd); // include </tbody>
  html = before + '\n' + rows.join('\n') + '\n' + after;
  fs.writeFileSync(htmlPath, html);
  console.log('materials-html.html updated with new table rows.');
} else {
  console.error('Could not find <tbody> in materials-html.html');
}
