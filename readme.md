Структура проекта

quant
├─ django
│  ├─ apps (custom django apps)
│  ├─ assets (фронтенд)
│  │  ├─ dist (готовая сборка)
│  │  ├─ node_modules (сторонние модули)
│  │  ├─ src (исходники для фронтенда)
│  │  ├─ gulpfile.js (все правила сборки фронтенда)
│  │  └─ package.json (список npm зависимостей)
│  ├─ conf (настройки проекта)
│  ├─ static (собраная статика всех приложений)
│  ├─ templates (базовые шаблоны html)
│  ├─ db.sqlite3
│  ├─ manage.py (точка входа в django)
│  ├─ requirements.txt (python-зависимости)
│  ├─ urls.py (все url проекта)
│  └─ wsgi.py (правила для uwsgi)
├─ docker
│  ├─ development
│  └─ production
├─ docs (документация проекта)
├─ logs
└─ docker-compose.py (сборка и запуск docker-контейнеров)
