import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import viteImagemin from 'vite-plugin-imagemin';
import fs from 'fs';
import path from 'path';
import imageminWebp from 'imagemin-webp'; // WebP変換用のプラグインをインポート
import imagemin from 'imagemin';

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
    title: 'Main page',
  },
  '/archive.html': {
    isHome: false,
    title: 'News Page',
  },
  '/single.html': {
    isHome: false,
    title: 'News Single Page',
  },
  '/outline.html': {
    isHome: false,
    title: 'Outline Page',
  },
  '/privacypolicy.html': {
    isHome: false,
    title: 'Privacypolicy Page',
  },
  '/features.html': {
    isHome: false,
    title: 'Features Page',
  },
  '/consulting.html': {
    isHome: false,
    title: 'Consulting Page',
  },
  '/seminar.html': {
    isHome: false,
    title: 'Seminar Page',
  },
  '/adovisor.html': {
    isHome: false,
    title: 'Adovisor Page',
  },
  '/profile.html': {
    isHome: false,
    title: 'Profile Page',
  },
  '/ourmarketing.html': {
    isHome: false,
    title: 'Our Marketing Page',
  },
  '/works.html': {
    isHome: false,
    title: 'Works Page',
  },
  '/faq.html': {
    isHome: false,
    title: 'Faq Page',
  },
  '/contact.html': {
    isHome: false,
    title: 'Contact Page',
  },
  // 他のページ情報もここに追加する
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
      input: inputFiles, // 複数のHTMLファイルの入力設定
      output: {
        assetFileNames: (assetInfo) => {
          let extType = path.extname(assetInfo.name).slice(1);
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          } else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (extType === 'css') {
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
        quality: 75,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false }, // SVGファイルの設定を変更
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      webp: {
        quality: 75,
      },
    }),
    {
      name: 'imagemin-webp',
      apply: 'build',
      async closeBundle() {
        await imagemin(['src/public/assets/images/*.{jpg,png}'], {
          // パスを修正
          destination: 'dist/images', // 出力先を修正
          plugins: [imageminWebp({ quality: 50 })],
        });
      },
    },
  ],
});
