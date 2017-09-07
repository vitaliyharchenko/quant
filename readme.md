Структура проекта

```
quant
├─ django
│  ├─ apps (custom django apps)
│  ├─ assets (сюда прилетают собранные gulp'ом файлы)
│  ├─ conf (настройки проекта)
│  ├─ static (собраная статика всех приложений)
│  ├─ templates (базовые шаблоны html)
│  ├─ manage.py (точка входа в django)
│  ├─ requirements.txt (python-зависимости)
│  ├─ urls.py (все url проекта)
│  └─ wsgi.py (правила для uwsgi)
├─ docker
│  ├─ dev
│  └─ prod
├─ docs (документация проекта)
├─ frontend
│  ├─ src (исходники для django)
│  ├─ node_modules (сторонние модули)
│  ├─ gulpfile.js (все правила сборки фронтенда)
│  ├─ package.json (список npm зависимостей)
│  └─ webpack.config.js (настройки webpack)
└─ docker-compose.py (сборка и запуск docker-контейнеров)
```

Для начала работы запустить в разных консолях:
1. `docker-compose up`
2. `docker-compose run web makemigrations blocks lessons nodes results tags tasks users`
3. `docker-compose run web migrate`
4. `cd frontend` && `npm i` && `gulp dev`

Для передачи команд для django:
1. `docker-compose run web [command]` - выполнит `python3 manage.py [command]`

Для заполнения БД данными

1. `docker-compose run web dumpdata --natural-foreign -e contenttypes -e auth.Permission -e authtoken.token -e admin.logentry --indent 4 > django/fixtures.json`
2. `docker-compose run web flush` - удалить все данные из БД
3. `docker-compose run web loaddata fixtures.json`

Deployment

1. Узнать IP сервера (например 188.127.237.245)
2. Узнать пароль для доступа к серверу по SSH (root - 8NpVJcrNl84X)
3. Подключаемся и накатываем docker