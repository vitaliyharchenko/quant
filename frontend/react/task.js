import React from 'react';
import ReactDOM from 'react-dom';

class TextBlockComponent extends React.Component {
	render() {
		var example = 
		<div>
			<h1 className="mt-0">Основное утверждение динамики</h1>
			<h2>Базовые вещи</h2>
			<p className="card-text">Динамика рассматривает ваимное действие тел друг на друга, являющееся причиной изменения их движения.</p>
			<p className="card-text">Так как движение рассматривается относительно других тел, то выбор системы отсчета является важным вопросом динамики.</p>
			<blockquote className="blockquote">Наблюдение за природой говорит нам о том, что изменение скорости тела всегда вызывается воздействием других тел.
			</blockquote>
			<h3>Еще более базовые вещи</h3>
			<p className="card-text">Приведем пример из жизни. Пусть вы захотите резко побежать. Что позволяет вам резко ускориться? Если бы вы находились на гладком льду, вряд ли у вас получилось бы быстро набрать скорость, скорее вы бы упали. Так что ходим и бегаем мы благодаря взаимодействию с дорогой, трению подошвы обуви о поверхность контакта.</p>
			<figure className="figure">
				<img className="figure-img img-fluid rounded" src="http://static.probusiness.by/n/0a/c/e-gorlovka_com_ua_1.jpg" />
				<figcaption className="figure-caption text-right">На улице бывает охренеть как скользко.</figcaption>
			</figure>
			<p className="card-text">В древней Греции ученые считали, что для поддержания скорости тела необходимо, чтобы кто-то или что-то постоянно воздействовало на него. Таким образом, единственным естественным состоянием тела считался покой. </p>
			<p className="card-text">В действительности же <strong>свободное тело</strong> (тело, которое не взаимодействует с другими телами) может сохранять свою скорость сколь угодно долго, подобно кометам, рассекающим космическое пространство, или же оставаться в покое.</p>
			<div className="embed-responsive embed-responsive-16by9 rounded">
				<iframe className="embed-responsive-item" src="https://www.youtube.com/embed/E6VIH5_H1yo?feature=oembed" allowfullscreen=""></iframe>
			</div>
			<p className="card-text">Автомобиль, набравший скорость и выключивший двигатель останавливается лишь благодаря воздействию сопротивления воздуха и трению механизмов трансмиссии друг о друга. Без трения скорость автомобиля оставалась бы постоянной.</p>
		</div>;
				
		var content = (this.props.block.id == "1") ? example : this.props.block.content;
		return (
			<div className="card">
				<div className="card-block">
					{content}
				</div>
				<div className="card-footer text-muted">
					<button id="read-action" className="btn btn-primary btn-block">Я прочитал</button>
				</div>
			</div>
		);
	}
}

class BlockComponent extends React.Component {
	render() {
		if (this.props.block.type == "text") {
			return (
				<div>
					<TextBlockComponent block={this.props.block} />
					<hr></hr>
				</div>
			);
		}
	}
}

class NodeComponent extends React.Component {
	render() {
		var node = this.props.node;
		var blocks = [];
		node.blocks.forEach(function(block) {
			blocks.push(<BlockComponent block={block}/>);
	    });
		return (
			<div>
				<div className="card card-block">
					<p className="lead">Тема: {node.title}</p>
					<p>{blocks}</p>
				</div>
				<hr></hr>
			</div>
		);
	}
}

class LessonComponent extends React.Component {
	render() {
		var lesson = this.props.lesson;
		var nodes = [];
		lesson.nodes.forEach(function(node) {
			nodes.push(<NodeComponent node={node}/>);
	    });
		return (
			<div>
				<p className="h2">Это домашнее задание перед уроком</p>
				<p>Тема урока: {lesson.name}</p>
				<p>Где проходит: {lesson.where}</p>
				<p>{nodes}</p>
			</div>
		);
	}
}

class TaskComponent extends React.Component {
	render() {
		var task = this.props.task;
		var lessons = [];
		task.lessons.forEach(function(lesson) {
			lessons.push(<LessonComponent lesson={lesson}/>);
	    });
		return (
			<div className="row">
				<div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
					<p className="h1">Домашнее задание</p>
					<p>Сделать до: {task.date_until}</p>
					<p>Учитель: {task.teacher.name}</p>
					<p>Группа: {task.group.name}</p>
					<hr></hr>
					{lessons}
				</div>
			</div>
		);
	}
}

var RESPONCE = {
    "api": {
        "version": "1.0"
    },
    "data": {
        "task": {
            "id": "1",
            "date_until": "21.12.2092",
            "student": {
                "name": "Awesome student",
                "id": "1"
            },
            "teacher": {
                "name": "Awesome teacher",
                "id": "2",
            },
            "group": {
                "name": "Awesome group on Mondays",
                "id": "1"
            },
            "lessons": [
	            {
	            	"name": "Awesome lesson",
	                "id": "1",
	                "where": "Second Audithory, Lenina st. 2",
		            "nodes": [
		                {
		                    "id": "1",
		                    "title": "Gauss theoreme",
		                    "blocks": [
		                        {
		                            "id": "1",
		                            "type": "text",
		                            "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis harum, officiis quas ab tempora corporis. Repudiandae maiores, ducimus debitis minima."
		                        },
		                        {
		                            "id": "2",
		                            "type": "text",
		                            "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, porro."
		                        },
		                        {
		                            "id": "3",
		                            "type": "text",
		                            "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat minus, impedit sit culpa, consectetur ducimus!"
		                        }
		                    ]
		                },
		                {
		                    "id": "2",
		                    "title": "Physics and plyometrics",
		                    "blocks": [
		                        {
		                            "id": "4",
		                            "type": "text",
		                            "content": "Lorem ipsum dolor."
		                        },
		                        {
		                            "id": "5",
		                            "type": "text",
		                            "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, assumenda facere nemo."
		                        },
		                        {
		                            "id": "6",
		                            "type": "text",
		                            "content": "Lorem ipsum dolor sit amet, consectetur adipisicing."
		                        }
		                    ]
		                }
		            ]
	            }
            ]
        }
    }
};

ReactDOM.render(
	<div>
		<TaskComponent task={RESPONCE.data.task} />
	</div>,
	document.getElementById('react')
);