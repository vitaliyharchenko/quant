import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { connect } from 'react-redux'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// action
const NEXT_BLOCK = 'NEXT_BLOCK'

// action creator
function nextBlock() {
  return {
    type: NEXT_BLOCK
  }
}

const initialState = {
  	task: {
		datetime_to: "21/12/1992",
	    teacher: "МарьИванна",
	    group: "Супер группа Ф11",
	    blocks: ["1", "2"],
	},
	currentBlockNumber: 1,
	blocks: {
	  	"1": {
		  	id: '1',
		  	type: 'text',
		  	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem maiores odit, accusantium minima tempora asperiores. Mollitia error officiis impedit quis quam magni est alias illo culpa nemo. Excepturi odio accusantium officia non, earum, natus id, itaque cum dolor perferendis vitae sapiente. Distinctio veniam commodi libero velit minus aperiam itaque eaque?',
	  	},
	  	"2": {
		  	id: '2',
		  	type: 'text',
		  	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga dolorem voluptas, omnis?',
	  	}
	},
}

// reducer
function todoApp(state = initialState, action) {
  switch (action.type) {
    case NEXT_BLOCK:
      return Object.assign({}, state, {
        blockNumber: state.blockNumber + 1
      })
    default:
      return state
  }
}

// create store
let store = createStore(todoApp)

class TextBlock extends Component {

	handleClick() {
		store.dispatch(nextBlock());
	}

	render() {
		return (
			<div className="card block-card">
				<div className="card-block">
					{this.props.block.content}
				</div>
			    <div className="card-footer">
					<button className="btn btn-primary btn-block" onClick={this.handleClick}>
						Я прочитал
				    </button>
				</div>
			</div>
		);
	}
}

function Block(props) {
	if (props.block.type === 'text') {
		return <TextBlock block={props.block} />
	}
	return <div className="card card-block"><b>Неизвестный тип блока</b></div>
}

class Task extends Component {

	render() {

		var rows = [];
		this.props.task.blocks.forEach(function(block_pk, i) {
			if (i < API.blockNumber) {
				rows.push(<Block block={API.blocks[block_pk]} key={i}/>);
			}
		});

		return (
			<div>
				<p className="p lead text-center">Домашнее задание</p>
				<p>Сделать до: { this.props.task.datetime_to }</p>
				<p>Учитель: { this.props.task.teacher }</p>
				<p>Группа: { this.props.task.group }</p>
				<hr></hr>
				{rows}
			</div>
		);
	}
}

class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-block">
								<Task task={API.task} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var API = {
	task: {
		datetime_to: "21/12/1992",
	    teacher: "МарьИванна",
	    group: "Супер группа Ф11",
	    blocks: ["1", "2"],
	},
	blockNumber: 1,
	blocks: {
	  	"1": {
		  	id: '1',
		  	type: 'text',
		  	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem maiores odit, accusantium minima tempora asperiores. Mollitia error officiis impedit quis quam magni est alias illo culpa nemo. Excepturi odio accusantium officia non, earum, natus id, itaque cum dolor perferendis vitae sapiente. Distinctio veniam commodi libero velit minus aperiam itaque eaque?',
	  	},
	  	"2": {
		  	id: '2',
		  	type: 'text',
		  	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga dolorem voluptas, omnis?',
	  	}
	},
}

ReactDOM.render(<App />, document.getElementById('root'));
