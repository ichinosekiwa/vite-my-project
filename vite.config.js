import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import viteImagemin from 'vite-plugin-imagemin';
import fs from 'fs';
import path from 'path';

const files = [];
function readDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      if (item === 'components') {
        continue;
      }

      readDirectory(itemPath);
    } else {
      if (path.extname(itemPath) !== '.html') {
        continue;
      }

      let name;
      if (dirPath === path.resolve(__dirname, 'src')) {
        name = path.parse(itemPath).name;
      } else {
        const relativePath = path.relative(path.resolve(__dirname, 'src'), dirPath);
        const dirName = relativePath.replace(/\//g, '_');
        name = `${dirName}_${path.parse(itemPath).name}`;
      }

      const relativePath = path.relative(path.resolve(__dirname, 'src'), itemPath);
      const filePath = `/${relativePath}`;

      files.push({ name, path: filePath });
    }
  }
}
readDirectory(path.resolve(__dirname, 'src'));
const inputFiles = {};
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  inputFiles[file.name] = resolve(__dirname, './src' + file.path);
}

const pageData = {
  '/index.html': {
    isHome: true,
    title: 'Main Page',
  },
  '/list.html': {
    isHome: false,
    title: 'List Page',
  },
};

export default defineConfig({
  server: {
    host: true,
  },
  base: './',
  root: './src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: inputFiles,
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          if (extType === 'css') {
            return `assets/css/style.css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 75,
      },
    }),
  ],
});
