# Прелоадеры и диаграммы
Это тестовое задание, которое я нашел на какой-то вакансии в хабре и решил сделать. Кстати, я так и не нашел эту вакансию, после выполнения, но мне было интересно снова поработать с Vue.js.

Было всего 2 задания их суть такова:
## Задание 1
Нужно было реализовать на Vue 3 (composition api) компонент кругового прогресс бара. В реализации нужно было использовать SVG, не canvas.

![](https://paper-attachments.dropboxusercontent.com/s_356B145618ED7D0C787C02E500462811E8310465EF5F720477688A144E025E5C_1730277283597_PixelSnap+2024-10-30+at+11.34.392x.png)
Прогрессбар имеет 4 состояния - in progress, success, warning, error.
При изменении значения прогресс бара анимация увеличения должна быть плавной. Изменения статуса так же должно быть плавным.
По мере увеличения значения прогресс бара цвет заполненного сектора окружности меняется от красного к зеленому.
Так же должна быть возможность изменить тип прогресс бара на dashboard, в таком случае он должен изменить форму на следующую:

![](https://paper-attachments.dropboxusercontent.com/s_356B145618ED7D0C787C02E500462811E8310465EF5F720477688A144E025E5C_1730278320639_PixelSnap+2024-10-30+at+11.51.182x.png)

## Задача 2
Нужно было делать в том же проекте, отдельная страница, так же vue, так же composition api.
Реализовать круговую диаграмму используя библиотеку chartjs. Так же реализовать форму, состоящую из полей: наименование, значение, цвет. Для выбора цвета можно было использовать ![color picker](https://www.npmjs.com/package/vue-colour-picker)
Элементы должно быть можно удалять и редактировать. Реализовать в соответствии с ![дизайном](https://www.figma.com/design/wlwVRFgUH1BYsAOKgylnzY/Untitled?node-id=0-1&t=a2W3WL18kEtD7ZI3-1)


## Результат
Я выполнил лоадер так как показано на картинках и добавил возможность просмотреть как будет выглядить ошибка и предупреждение. Сделал все плавно и с анимациями. Использовал только SVG. Сделал кнопку для переключения темы на дашборд.
Столкнулся с проблемой, когда реализовывал кнопку переключения темы: во время работы лоадера, кнопка была неактивна, на неё вообще нельзя было нажать. Я думал что это дело в асинхронности кода: пока выполняется лоадер, то отключается всё остальное, поэтому копал в этом направлении. Оказалось всё намного проще: когда элементы активны и с ними что-то происходит, то их специфичность выше чем у неактивных элементов и может быть такое, что активный элемент может перекрывать неактивные. Я этого не знал и у меня как раз блок с лоадером растянут на весь экран, а кнопка и блок имеют абсолютное позиционирование, что и привело к проблеме. Решил проблему поставив z-index у кнопки выше чем у блока.

Диаграммы реализовывал через chartjs. Тоже всё работает плавно и с анимациями, благодаря vue transition. 
Можно вводить любое число и проценты рудут расчитаны автоматически. 
Можно менять цвет через color-picker.
