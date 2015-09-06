
###Command
####sprite
Создвает спрайт из изображений с префиксом i- из всех папок.
Созданный спрайт и стили копирует в папку i-icons
####dev
Команда для разработки с открытием в firefox и explorer
####watch
Команда для разработки без открытием в firefox и explorer
####build
Команда для сборки
+ copy minify images
+ make and minify css
+ make and minify js
####ftp
Команда для загрузки файлов по ftp
Конфигурационный файл fpt.json в формате
```json
{
	"host": "hostname",
	"user": "username",
	"pass": "password"
}
```
####zip
Создает два архива (с собранными файлами и с разрабатываевыми) и отправляет на серевер по ftp с настройками из ftp.json

###Postcss
####css syntax
+ css variables https://github.com/MadLittleMods/postcss-css-variables
+ media variables https://github.com/postcss/postcss-custom-media
+ color funcion https://github.com/postcss/postcss-color-function
+ not selector https://github.com/postcss/postcss-selector-not
####css shortcuts
+ nested https://github.com/postcss/postcss-nested
+ short https://github.com/jonathantneal/postcss-short
+ focus https://github.com/postcss/postcss-focus
####css optimization