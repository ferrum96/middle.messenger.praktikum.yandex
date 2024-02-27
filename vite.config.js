// import { defineConfig } from 'vite';
//
// export default defineConfig({
//     build: {
//         rollupOptions: {
//             input: {
//                 main: './src/main.js' // Путь к вашему основному файлу JavaScript
//             }
//         }
//     },
//     server: {
//         // Путь к вашему HTML-файлу
//         // По умолчанию Vite будет искать файл в корне проекта с именем index.html
//         // Если ваш файл имеет другое имя или находится в другом месте, укажите его здесь
//         fs: {
//             strict: false,
//             allow: ['public'] // Разрешить доступ к родительским каталогам
//         }
//     }
// });

import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    root: resolve(__dirname, 'src/'),
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
        },
        outDir: resolve(__dirname, 'dist/'),
    },
})