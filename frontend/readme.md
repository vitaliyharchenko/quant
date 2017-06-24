# Gulp

## Как установить и наладить все

1. Install NodeJS
2. `npm install -g gulp gulp-cli` - устанавливаем глобально основные зависимости
3. `npm install` - устанавиливаем остальные зависимости из package.json
4. Добавить путь до Node в PATH
	* На OSX - `export PATH=./node_modules/.bin:../node_modules/.bin:../../node_modules/.bin:$PATH`

## Как запустить сборку фронтенда

1. `npm run dev` - запустится gulp, webpack, browsersync и откроется страница, которая берет данные от django через proxy
	* не забудьте запустить docker - контейнеры
2. Turn off browser cache
3. Magic

## Осваиваем React

1. https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html
	* Webpack dev server: `webpack-dev-server --content-base react/ --progress --colors`
	* Create bundle `./node_modules/.bin/webpack` or `npm run webpack`
2. [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
	* Создаем иерархию компонентов. Можно начать с готовой схемы, а можно начать с самых простых элементов
	* Наш план:
		* BlockComponent - TextBlockComponent - ContentComponent + ButtonComponent
