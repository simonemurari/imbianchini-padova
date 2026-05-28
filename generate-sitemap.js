const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://imbianchinipadova.it';

// Helper to find all HTML files
function walkSync(dir, filelist = []) {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        if (fs.statSync(dirFile).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                filelist = walkSync(dirFile, filelist);
            }
        } else {
            if (dirFile.endsWith('.html')) {
                filelist.push(dirFile);
            }
        }
    });
    return filelist;
}

const htmlFiles = walkSync(__dirname);

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Current Date in ISO format for lastmod
const lastmod = new Date().toISOString().split('T')[0];

htmlFiles.forEach(file => {
    let relativePath = path.relative(__dirname, file).replace(/\\/g, '/');
    
    // Exclude maintenance or other auxiliary pages from indexing
    if (relativePath === 'manutenzione.html') {
        return;
    }

    let url = DOMAIN + '/';
    let priority = '0.8';

    if (relativePath === 'index.html') {
        priority = '1.0';
    } else {
        if (relativePath.endsWith('index.html')) {
            // e.g. imbiancature-interne-padova/index.html -> imbiancature-interne-padova/
            let folder = relativePath.substring(0, relativePath.length - 10);
            url += folder;
        } else {
            url += relativePath.replace('.html', '');
        }

        if (relativePath.startsWith('imbiancature-interne-padova') || relativePath.startsWith('tinteggiature-esterne-padova') || relativePath.startsWith('verniciatura-legno-padova')) {
            priority = '0.9';
        } else if (relativePath.startsWith('blog')) {
            priority = '0.8';
        } else if (relativePath.startsWith('privacy') || relativePath.startsWith('cookie')) {
            priority = '0.3';
        }
    }

    sitemapContent += `    <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>\n`;
});

sitemapContent += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent, 'utf8');
console.log('sitemap.xml generated successfully!');
