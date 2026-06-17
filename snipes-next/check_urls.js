const fs = require('fs');
const path = require('path');
const https = require('https');

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles('./src');
const urls = new Set();
const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[^\"\'\s\)]+/g;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    urls.add(match[0]);
  }
});

const urlArray = Array.from(urls);
console.log('Total URLs found:', urlArray.length);

let notFound = [];
let errors = [];

function checkUrl(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      if (res.statusCode !== 200) {
        notFound.push({url, status: res.statusCode});
      }
      resolve();
    }).on('error', () => {
      errors.push(url);
      resolve();
    });
  });
}

async function run() {
  const batchSize = 10;
  for (let i = 0; i < urlArray.length; i += batchSize) {
    const batch = urlArray.slice(i, i + batchSize);
    await Promise.all(batch.map(checkUrl));
  }
  console.log('Not Found URLs:', JSON.stringify(notFound, null, 2));
  console.log('Error URLs:', errors);
}

run();
