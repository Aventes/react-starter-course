Урок 1. Введение в ReactJs 

1. Установить NodeJS/Npm
2. Установить create-react-app
    npm install -g create-react-app
    флаг -g означает что установка глобальная
3. Создать новое приложение bicycle-app
    create-react-app bicycle-app
    cd bicycle-app
    npm start
    
    В этом случае будет создан костяк ReactJs приложения с подключением утилиты react-scripts. 
    Создание React App не имеет никакой серверной логики, или подключеий к базе данных, 
    а создает всего лишь фронтенд приложение. React App подключает Babel и webpack из коробки и использует их не явно 
    при сборке приложения.
4. Production build - продакшн билд можно создать с помощью команды - npm run build
5. Deploy to Dev environment - девелоперский билд можно создать командой npm run install.
    В этом случае 
    Основное отличие Dev build от Production Build - возможность дебажить код в браузере и большим размером bundle.js.
    
6.  JSX 
    Для рендеринга данных в ReactJs используется JSX.
    JSX нужен для Javascript XML - разметки в стиле XML внутри компонентов React. React может работать и без JSX. 
    Но в этом случае, компоненты становятся менее читабельными. Поэтому рекомендуется использовать его.
    с JSX:
    const Navigation = 
        <Nav color="blue">
            <Profile>click</Profile>
        </Nav>;
        
    без JSX:
    var Navigation = React.createElement(
         Nav,
         {color:"blue"},
         React.createElement(
             Profile,
             null,
             "click"
         )
    );
    
    JSX позволяет описывать структуру компонентов с помощью удобочитаемого и понятного синтаксиса, а затем, 
    на этапе комниляции встроенный в ReactJs парсер преобразует написанный JSX в цепочку JAvascript функций.
    
    В JSX можно использовать переменные, но для этого нужно использовать фигурные скобки:
    <Profile>{chosenProfile}</Profile>
    
    и функции:
    <Profile>{chooseProfile()}</Profile>
    
    и даже может иметь простейшую логику, тернарный оператор:
    <Profile>{profileChosen ? defaultProfile : profileChosen}</Profile>
    
    или так:
    <Profile>{profileChosen || defaultProfile}</Profile>
    
7. Компоненты:
    React использует компонентную модель,
    то есть все большое приложение делится на небольшие независимые компоненты, которыми гораздо легче управлять.
    Различают  Presentation Components и Container Components
    Presentation Components - не содержат логики, отвечают за рендеринг данных, содержат наборы стилей, картинки.
    Container Components - отвечают за то, КАК приложение работает, не содержат стилей, или картинок, но зато подключают Presentation Components и другие Container Components.
     
8. Обязательно подключите ReactJs в каждый компонент!
    import React from 'react';    

9. Presentation Components - эти компоненты нужно ТОЛЬКО для отображения, как правило не имеют логики и не имеют подключения к Redux.
    Эти компоненты могут подключать CSS styles, картинки, markup.
    Подобные компоненты не должны загружать данные, но они могут загружать данные через props или callbacks 
    
    const CommentList = comments => {
        <ul>
            {
                comments.map(comment => <li>{comment.body}</li>)
            }
        </ul>
    };
    
10. Container components
    Эти компоненты отвечают за то как Ваше приложение работает, то есть: 
    - загружают данные через REST Api, 
    - отвечают за работу с другими компонентами
    - рабоют с Redux
    - могут содержать как Container components так и Presentation Components
    
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

11. Простой импорт
    К примеру, имеем файл src/containers/App.js, мы хотим подкключить этот файл в index.js
    
    App.js
        import React, {Component} from 'react'; //Component - базовый класс ReactJs, нам его нужно наследовать для наших компонент   
        
        class App extends Component { ... }
        
        //Прежде всего наш компонент нужно сделать "видимым" для ReactJs приложения - нужно сделать ЭКСПОРТ :)
        
        export default App;
        
    Теперь в нашем index.js файле сделаем импорт App.js и отрисуем его на странице 
    index.js
    
    import React from 'react'    
    import ReactDOM from 'react-dom';
    
    import App from './containers/App'
                  
    ReactDOM.render(<App />, 
        document.getElementById('root'));
            
12. State
    State - это внутреннее состояние компонента, со всеми его внутреннеми свойствами. 
    Так же, как и у человека, кровь, плоть и мышцы являются исключительно Human's state
    
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
    
    Изменение состояния компонента влечет за собой полный ререндеринг компонента. 
    Поэтому изменять состояние нужно очень аккуратно и только там где это действительно необходимо!
    НИКОГДА не нужно модифицировать состояние компонента напрямую, то есть так: this.state.weight = newWeight.
     
    Как можно изменить state компонента?
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
    
13. Props aka Параметры компонента
    Каждый компонент может и должен принимать параметры из-вне. К параметрам компонента можно обращаться используя this.props.paramName
    class Person extends Component {
        render() {
            return (
                <PersonName name="Vasya" />
            )
        }
    }
    
    Props можно принимать и вытаскивать из контекста так:
    class PersonName extends Component {
        render() {
            return (
                <div>Name: {this.props.name} </div>;
            )
        }
    }
    
    или так:
    const PersonName = ({name}) => {
        return <div>{name}</div>;
    }
    
    или даже так:
    const PersonName = name => <div>{name}</div>;    
    
14. Event Handling (Обработка событий):
    Если вы хотите сделать свои компоненты динамическими, Вам не обойтись без использования событий.
    Каждое событие должно иметь producer события и listener/handler события    
    
    class HelloComponent extends Component(
      handleClick(event) {
        console.log('Hello stranger!');        
        console.log("Event Handled:" + event.type);
      },
    
      render() {
        return <button onClick={this.handleClick}> Say hello </button>;
      }
    )
    
    В ReactJS используется SyntheticEvent, по сути, это обертка (Proxy) для стандартных JavaScript events и нужна чтобы подключить кроссбраузерную поддержку.    
    Подробнее читаем здесь: https://reactjs.org/docs/events.html.  
       
   
15.  Структура проекта:

     bicycle-app      - корневая папка проекта
        /node_modules - здесь npm хранит все dependency проекта (peer-dependency в том числе)    
        /public - здесь должны лежать все "общие" файлы для всего проекта, а именно:
            /index.html
            /styles.css  - в случае если у Вас используются общий набор стилей для всего прилоежения.
            /bootstrap.min.js
            /bootstrap.min.css
            /bundle.js
         /src - в этой папке должны лежать все sources Вашего приложения
            /navigation - в этой папке должны находиться все компоненты связанные с меж-страничной навигацией
                /routers ... - в этой папке должны находиться все роутеры для навигации, например react-router
                /index.js
            /containers - в этой папке могут находиться компоненты "контейнеры". Контейнеры не имеют состояния и служат исключительно для отображения.
                          В компонентах "контейнерах" удобно загружать данные с помощью REST API    
                /App.js
                /App.css
                /HomePage.js
                /HomePage.css
                /BicycleDetailsPage.js
                /BicycleDetailsPage.css
            /actions    - Здесь должны лежать Redux Actions
                /addBicycleActions.js
                /removeBicycleActions.js
               index.js                 
            /api - в этой папке должны находиться все что связано с работой с HTTP запросами
                /addBicycleApi.js
                /removeBicycleApi.js
                /apiUtils.js                                               
            /components - All ReactJS' components should be stored in this folder
                /header ...
                /footer ...
                /notifications ...
                /modals - модальные окна и всякие прочие диаложки помещаем сюда
                    /AddBicycleModal.js
                    /AddBicycleModal.css
                /tables
                    /BicycleTable.js
                    /BicycleTable.css
                /
                /index.js  - базовая страница BicyclePage.js            
            /constants/    - В этой папке должны находиться ВСЕ константы, общие для всего приложения
            /images        - Поместите все картинки в эту папку 
                /logo.svg
            /utils ...
            /index.js      - Это файл в котором инициализируется Ваше приложение, так же здесь происходит "рендеринг"
                             Вашего приложения и вызов ReactDOM.render - так что имеет смысл поместить этот вызов на
                             самый верний уровень  