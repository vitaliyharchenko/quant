# Python & Django

Внимание! Мы работаем с python3 - поэтому мы работаем не с `pip`, а с `pip3`!

## Установка python

1. Install python 3.6 from source
2. Update PATH - `export PATH=$PATH:/usr/local/bin/python3.6`

## Изолированное окружение python - [virtualenv](https://virtualenv.pypa.io/en/stable/userguide/)

1. Install venv global - `[sudo] pip3 install virtualenv`
	* on OSX - `sudo /usr/bin/easy_install virtualenv` (install in /usr/local/bin)
2. Create new venv - `virtualenv [venv_name]`
3. Activate venv
	* on OSX - `source env/bin/activate`
	* on Win - `env/Scripts/activate`
4. Deactivate venv - `deactivate`

## Как запустить Django сервер

1. Activate venv (`source venv/bin/activate`)
2. `python3 manage.py runserver`

## Как работать с зависимостями python

1. Установка - `pip3 install [pkg_name]`
2. Сохранить зависимости в файл - `pip3 freeze > requirements.txt`
3. Установить все зависимости из файла - `pip3 install -r requirements.txt`