import React from 'react';
import ReactDOM from 'react-dom';

class TextBlockComponent extends React.Component {
	render() {
		return (
			<div>
				<p>{this.props.block.content}</p>
			</div>
		);
	}
}

class BlockComponent extends React.Component {
	render() {
		if (this.props.block.type == "text") {
			return (
				<div className="card card-block">
					<p className="lead">BlockComponent Heading</p>
					<TextBlockComponent block={this.props.block} />
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
			<div className="card card-block">
				<p className="lead">NodeComponent Heading</p>
				<p>Node id: {node.id}</p>
				<p>{blocks}</p>
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
			<div className="card card-block">
				<p className="lead">LessonComponent Heading</p>
				<p>Lesson name: {lesson.name}</p>
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
			<div className="card card-block">
				<p className="lead">TaskComponent Heading</p>
				<p>Task id/until: {task.id}/{task.date_until}</p>
				<p>Task teacher: {task.teacher.name}</p>
				<p>Task group: {task.group.name}</p>
				{lessons}
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
		            "nodes": [
		                {
		                    "id": "1",
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