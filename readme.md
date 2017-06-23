Структура проекта

```
quant
├─ django
│  ├─ apps (custom django apps)
│  ├─ conf (настройки проекта)
│  ├─ static (собраная статика всех приложений)
│  ├─ templates (базовые шаблоны html)
│  ├─ manage.py (точка входа в django)
│  ├─ requirements.txt (python-зависимости)
│  ├─ urls.py (все url проекта)
│  └─ wsgi.py (правила для uwsgi)
├─ docker
│  ├─ development
│  └─ production
├─ docs (документация проекта)
├─ frontend
│  ├─ django_assets (custom django apps)
│  │  ├─ dist (сборка)
│  │  └─ src (исходники)
│  ├─ node_modules (сторонние модули)
│  ├─ gulpfile.js (все правила сборки фронтенда)
│  └─ package.json (список npm зависимостей)
├─ logs
└─ docker-compose.py (сборка и запуск docker-контейнеров)
```

Для начала работы запустить в разных консолях:
1. `docker-compose up`
2. `cd frontend/django_assets` && `gulp dev`

Для передачи команд для django:
1. `docker-compose run web [command]` - выполнит `python3 manage.py [command]`