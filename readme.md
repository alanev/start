## **npm** commands
### `npm run install`
Инициализация проекта
### `npm run build`
Команда для сборки
### `npm run dev`
Собирает проект, запускает сервер и следит за измением, после чего пересобирает измененные файлы.
### `npm run test`
Тестирует собранный css, js, html

## **gulp** commands
### main
### `gulp build`
Аналог `npm run build`
### `gulp dev`
Аналог `npm run dev`
### `gulp watch`
Запускает сервер и следит за изменениями
### `gulp test`
Аналог `npm run test`

### utils
### `gulp sprite`
Создвает спрайт из изображений с префиксом i- из всех папок.
Созданный спрайт и стили копирует в папку i-icons
### `gulp img`
Копирует и минифицирует изображения из модулей.
### `gulp fonts`
Копирует шрифты из модуля g-fonts
### `gulp css`
Собирает css по файлам в папке `src`
### `gulp js`
Собирает js по файлам в папке `src`
### `gulp html`
Собирает html по файлам в папке `src`