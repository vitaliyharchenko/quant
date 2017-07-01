# Learning React

It is sufficient to use React + Redux + API Normalizer

1. React provides tree structure of components. This is only about view.
2. Redux provides:
	* access to app store in any place in the code by [getState()](https://stackoverflow.com/questions/38332912/how-do-i-access-store-state-in-react-redux) method
	* only one place for store data, "place of truth"
	* view - actions - reducers - store - view
3. Normalizr - normalize data (all entities at the same level)
	* [github thread](https://github.com/reactjs/redux/issues/994)
	* [json-api-normalizer](https://habrahabr.ru/post/318958/)

Ресурсы:

1. [Nice presentation about React](https://www.slideshare.net/bigsassy/django-rest-framework-and-react-and-redux-oh-my)

2. [Django-react-redux-base](https://github.com/Seedstars/django-react-redux-base)

3. ☆ [Руководство по Redux для React](https://habrahabr.ru/company/mailru/blog/303456/)

4. На очереди [Leveling Up with React: Redux](https://css-tricks.com/learning-react-redux/)

5. [Awesome React](https://github.com/xgrommx/awesome-redux)

Попытки:

1. v0.1 - попытка объединить react-quiz-app, react-examples/real-world+react-examples/async - закончилась неудачей

2. v0.2 - начинаем исключительно с представления
	* folowing [official tutorial by FB](https://facebook.github.io/react/tutorial/tutorial.html)

3. v0.3 - попытака сделать статическую версию task