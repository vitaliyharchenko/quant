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
2. `docker-compose run web migrate`
3. ```
	docker-compose run web shell
	>>> from django.contrib.sites.models import Site
	>>> Site.objects.create(name='Localhost', domain='0.0.0.0:8000')
	>>> quit() [Enter]
	```
4. `cd frontend` && `npm i` && `gulp dev`

Для передачи команд для django:
1. `docker-compose run web [command]` - выполнит `python3 manage.py [command]`