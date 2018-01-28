#Урок 1. Введение в ReactJs 

### Шаг 1. Установить NodeJS/Npm [[nodeJs]](https://nodejs.org/en/download/)
### Шаг 2. Установить [[create-react-app]](https://reactjs.org/docs/add-react-to-a-new-app.html) 
    **_npm install -g create-react-app_**
    флаг -g означает что установка глобальная
### Шаг 3. Создать новое приложение bicycle-app

    _**create-react-app bicycle-app
    cd bicycle-app
    npm start**_
    
    В этом случае будет создан костяк ReactJs приложения с подключением утилиты **react-scripts**. 
    Создание React App не имеет никакой серверной логики, или подключеий к базе данных, 
    а создает всего лишь фронтенд приложение. React App подключает Babel и webpack из коробки и использует их неявно 
    при сборке приложения.
    
### Шаг 4. Production build 
    Production билд можно создать с помощью команды - **npm run build**

### Шаг 5. Deploy to Dev environment 
    Dev build можно создать командой **npm run install**.
    Основное отличие Dev build от Production Build - возможность дебажить код в браузере и большим размером bundle.js.
    
###JSX 
    Для рендеринга данных в ReactJs используется JSX.
    JSX нужен для Javascript XML - разметки в стиле XML внутри компонентов React. React может работать и без JSX. 
    Но в этом случае, компоненты становятся менее читабельными. Поэтому рекомендуется использовать JSX.
    **_с JSX:_**
```jsx harmony
    const Navigation = 
        <Nav color="blue">
            <Profile>click</Profile>
        </Nav>;
 ```       
    **_без JSX:_**
```javascript
    var Navigation = React.createElement(
         Nav,
         {color:"blue"},
         React.createElement(
             Profile,
             null,
             "click"
         )
    );
```    
    JSX позволяет описывать структуру компонентов с помощью удобочитаемого и понятного синтаксиса, а затем, 
    на этапе комниляции встроенный в ReactJs парсер преобразует написанный JSX в цепочку Javascript функций.
    
    В JSX можно использовать переменные, но для этого нужно использовать фигурные скобки:
```jsx harmony
    <Profile>{chosenProfile}</Profile>
```
    
    и функции:
```jsx harmony
    <Profile>{chooseProfile()}</Profile>
```    
    и даже может иметь простейшую логику, тернарный оператор:
```jsx harmony
    <Profile>{profileChosen ? defaultProfile : profileChosen}</Profile>
```    
    или так:
```jsx harmony
    <Profile>{profileChosen || defaultProfile}</Profile>
```

###Компоненты:
    React использует компонентную модель,
    то есть все большое приложение делится на небольшие независимые компоненты, которыми гораздо легче управлять.
    Различают  Presentation Components и Container Components
    Presentation Components - не содержат логики, отвечают за рендеринг данных, содержат наборы стилей, картинки.
    Container Components - отвечают за то, КАК приложение работает, не содержат стилей, или картинок, но зато подключают Presentation Components и другие Container Components.
    
    Больше информации: [[Containers vs Presentational Components]](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
     
####Presentation Components - эти компоненты нужно ТОЛЬКО для отображения, как правило не имеют логики и не имеют подключения к Redux.
    Эти компоненты могут подключать CSS styles, картинки, markup.
    Подобные компоненты не должны загружать данные, но они могут загружать данные через props или callbacks 
   
```jsx harmony 
    const CommentList = comments => {
        <ul>
            {
                comments.map(comment => <li>{comment.body}</li>)
            }
        </ul>
    };
```
    
####Container components
    Эти компоненты отвечают за то как Ваше приложение работает, то есть: 
    - загружают данные через REST Api, 
    - отвечают за работу с другими компонентами
    - рабоют с Redux
    - могут содержать как Container components так и Presentation Components
    
```jsx harmony
    import React, {Component} from 'react';
    import {loadComments} from './actions';
    import {CommentList} from './CommentList';
    
    class CommentListContainer extends Component{
        constructor(props) {
            super(props);
            this.state = {comments: []};
        }
        
        componentDidMount() {
            loadComments()
                .then(comments => this.setState({comments}));            
        }   
                 
        render() {
            return(
                <CommentList comments={this.state.comments} />
            );
        } 
    }  
```
      
###Обязательно подключите ReactJs в каждый компонент!
    **import React from 'react';**  

###Простой импорт 
    Немного базового сиктаксиса: [[ES6 Import]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), [[ES6 Export]](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)
    
    К примеру, имеем файл src/containers/App.js, мы хотим подкключить этот файл в index.js
```jsx harmony
    App.js
        import React, {Component} from 'react'; //Component - базовый класс ReactJs, нам его нужно наследовать для наших компонент   
        
        class App extends Component { ... }
        
        //Прежде всего наш компонент нужно сделать "видимым" для ReactJs приложения - нужно сделать ЭКСПОРТ :)
        
        export default App;
```
        
    Теперь в нашем index.js файле сделаем импорт App.js и отрисуем его на странице 
    index.js
```jsx harmony    
    import React from 'react'    
    import ReactDOM from 'react-dom';
    
    import App from './containers/App'
                  
    ReactDOM.render(<App />, 
        document.getElementById('root'));
```        
    Больше информации можно подчерпнуть здесь: [[ES6 Modules — Imports and exports]](https://medium.com/craft-academy/es6-modules-imports-and-exports-1e5b552ddca9)     
            
###State - [[State and Lifecycle]](https://reactjs.org/docs/state-and-lifecycle.html)
    State - это внутреннее состояние компонента, со всеми его внутреннеми свойствами. 
    Так же, как и у человека, кровь, плоть и мышцы являются исключительно Human's state
```jsx harmony
    class Human extends Component {
        constructor(props) {
            super(props);
            
            this.state = {
                blood: props.blood,
                weight: 200 /*lbs*/,
                height: 6.7 /*ft*/
            }
        }
    }
```
    
    Изменение состояния компонента влечет за собой полный ререндеринг компонента. 
    Поэтому изменять состояние нужно очень аккуратно и только там где это действительно необходимо!
    НИКОГДА не нужно модифицировать состояние компонента напрямую, то есть так: this.state.weight = newWeight.
     
    Как можно изменить state компонента?
```jsx harmony
        this.state.weight = newWeight - так НЕПРАВИЛЬНО.
        Human.state.weight - так тоже НЕПРАВИЛЬНО.       
        this.setState({ weight: newWeight }) - Так тоже НЕПРАВИЛЬНО
        
        Так ПРАВИЛЬНО:
        this.setState((prevState, props) => ({
            weight: prevState.weight
        }))
        
        Так тоже ПРАВИЛЬНО:
        this.setState((prevState, props) => ({
            weight: props.weight
        }))
```
    
###Props aka Параметры компонента - [[Components and Props]](https://reactjs.org/docs/components-and-props.html)
    Каждый компонент может и должен принимать параметры из-вне. К параметрам компонента можно обращаться используя this.props.paramName
```jsx harmony
    class Person extends Component {
        render() {
            return (
                <PersonName name="Vasya" />
            )
        }
    }
```
    
    Props можно принимать и вытаскивать из контекста так:
```jsx harmony
    class PersonName extends Component {
        render() {
            return (
                <div>Name: {this.props.name} </div>;
            )
        }
    }
```    
    или так:
```jsx harmony
    const PersonName = ({name}) => {
        return <div>{name}</div>;
    }
```
    
    или даже так:
```jsx harmony
    const PersonName = name => <div>{name}</div>;
```
    
###Event Handling (Обработка событий) [[link]](https://reactjs.org/docs/events.html):
    Если вы хотите сделать свои компоненты динамическими, Вам не обойтись без использования событий.
    Каждое событие должно иметь producer события и listener/handler события    
```jsx harmony
    class HelloComponent extends Component(
      handleClick(event) {
        console.log('Hello stranger!');        
        console.log("Event Handled:" + event.type);
      },
    
      render() {
        return <button onClick={this.handleClick}> Say hello </button>;
      }
    )
```
    
    В ReactJS используется SyntheticEvent, по сути, это обертка (Proxy) для стандартных JavaScript events и нужна чтобы подключить кроссбраузерную поддержку.    
    Подробнее читаем здесь: [[ReactJs Events]](https://reactjs.org/docs/events.html).  
       
   
##Структура проекта:
```
     bicycle-app      _- корневая папка проекта_
        /node_modules _- здесь npm хранит все dependency проекта (peer-dependency в том числе)_    
        /public - _здесь должны лежать все "общие" файлы для всего проекта, а именно:_
            /index.html
            /styles.css  - _в случае если у Вас используются общий набор стилей для всего прилоежения._
            /bootstrap.min.js
            /bootstrap.min.css
            /bundle.js
         /src - _в этой папке должны лежать все sources Вашего приложения_
            /navigation - _в этой папке должны находиться все компоненты связанные с меж-страничной навигацией_
                /routers ... - _в этой папке должны находиться все роутеры для навигации, например react-router_
                /index.js
            /containers - _в этой папке могут находиться компоненты "контейнеры". Контейнеры не имеют состояния и служат исключительно для отображения._
                          _В компонентах "контейнерах" удобно загружать данные с помощью REST API_    
                /App.js
                /App.css
                /HomePage.js
                /HomePage.css
                /BicycleDetailsPage.js
                /BicycleDetailsPage.css
            /actions    - _Здесь должны лежать Redux Actions_
                /addBicycleActions.js
                /removeBicycleActions.js
               index.js                 
            /api - _в этой папке должны находиться все что связано с работой с HTTP запросами_
                /addBicycleApi.js
                /removeBicycleApi.js
                /apiUtils.js                                               
            /components - _All ReactJS' components should be stored in this folder_
                /header ...
                /footer ...
                /notifications ...
                /modals - _модальные окна и всякие прочие диаложки помещаем сюда_
                    /AddBicycleModal.js
                    /AddBicycleModal.css
                /tables
                    /BicycleTable.js
                    /BicycleTable.css
                /
                /index.js  - _базовая страница BicyclePage.js_
            /constants/    - _В этой папке должны находиться ВСЕ константы, общие для всего приложения_
            /images        - _Поместите все картинки в эту папку_
                /logo.svg
            /utils ...
            /index.js      - _Это файл в котором инициализируется Ваше приложение, так же здесь происходит "рендеринг"_
                             _Вашего приложения и вызов ReactDOM.render - так что имеет смысл поместить этот вызов на_
                             _самый верний уровень_
``` 