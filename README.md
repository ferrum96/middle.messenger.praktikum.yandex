# Учебный проект "Мессенджер"

## Дизайн прототипа
### Дизайн можно найти по ссылке:
- Ссылка на макет [Figma](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1).
- Ссылка на деплой [Netlify](https://eclectic-haupia-dd3faf.netlify.app/login)

## Установка проекта локально
1.  Склонируйте репозиторий в любое место с помощью команды:    
    `git clone https://github.com/ferrum96/middle.messenger.praktikum.yandex.git`
2.  Перейдите в каталог проекта выполнив команду:
    `cd middle.messenger.praktikum.yandex`
3.  Установите зависимости, выполнив следующую команду:
    `npm install`

## Запуск приложения
### Запуск приложения производится из терминала корня проекта:

- Запуск проекта в режиме разработки
```bash
npm run dev
```

- Cборка проекта в виде статических файлов (в директорию dist/)
```bash
npm run build
```

- Cборка и запуск проекта
```bash
npm run start
```

### Приложение запускается на 3000 порту 
#### http://localhost:3000/

## Ссылки на страницы

#### Страница "Вход"
- [/login](http://localhost:3000/login)
#### Страница "Регистрация"
- [/sign_up](http://localhost:3000/sign_up)
#### Страница "Чат" (Заглушка)
- [/chat](http://localhost:3000/chat)
#### Страница "Профиль"
- [/profile](http://localhost:3000/profile)
#### Страница "Изменить данные"
- [/edit_profile](http://localhost:3000/edit_profile)
#### Страница "Изменить пароль"
- [/edit_password](http://localhost:3000/edit_password)
#### Страница "Не найдено"
- [/404](http://localhost:3000/404)
#### Страница "Ошибка сервера"
- [/500](http://localhost:3000/500)

## На текущем этапе разработки (спринт №2) реализовано:
- Подключение Eslint и styleint к проекту
- Переход на typescript
- В проект внедрен компонентный подход
- Обновление компонентов на основании пропсов
- В формах проекта добавлена валидация ( при отправке формы данные отображаются в console.log)
- Добавлен HTTP модуль
