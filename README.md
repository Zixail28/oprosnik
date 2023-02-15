# Oprosnik

## Описание проекта
Oprosnik - это NodeJs приложение в котором пользователь отвечает на вопросы посредством выбора подходящего его варианта.

<kbd>![screenshot](images/1.png)</kbd>

## Стек технологий:
  `NodeJS, ExpressJs, MongoDB, EJS`

## Функциональность:
- пользователь может отвечать на вопросы путём выбора подходящего ему варианта:
  ![](images/1.png)  
- после отправки формы, на указаную в переменных окружения почту, придут данные формы в виде:
  ![](images/2.png)  
- все формы сохраняются в базе данных, что позволяет смотреть статистику по всем отправленным формам:
  ![](images/3.png)
- также есть возможность удалить все данные форм в базе данных нажатием одной кнопки в просмотре статистики
  ![](images/4.png)

## Переменные окружения:
//В корневой директории в файле .env указываем следующие переменные:  
  
DOMEN="127.0.0.1" #`Указываем IP или домен сайта`  
PORT=3001 #`Указываем порт сайта`  
EMAIL="email@email.email" #`Указываем почту с которой будут присылаться письма с данными формы`  
PASS="9zTz1c4NzDqwydFktEE1" #`Указываем пароль с почты с которой будут присылаться письма с данными формы`  
TO_MAIL="email2@email2.email2" #`Указываем почту на которую будут приходить данные формы`  
DB_LINK="mongodb://username:password@host:port/database?options..." #`Указываем URI MongoDB для подключения базы данных`  

## Запуск сайта:
1. Открываем терминал
2. Установить все пакеты командой **`npm install`**
3. Указываем переменные окружение в файле **.env**
4. Запускает сайт командой **`node index`** в терминале
