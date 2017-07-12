import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import './index.css';

// ACTION CONST

const NEXT_BLOCK = 'NEXT_BLOCK'

// ACTION CREATORS

function nextBlock() {
  return {
    type: NEXT_BLOCK
  }
}

// const persistedState = {
//   	task: {
// 		datetime_to: "21/12/1992",
// 	    teacher: "МарьИванна",
// 	    group: "Супер группа Ф11",
// 	    blocks: ["1", "2", "3"],
// 	},
// 	currentBlockNumber: 1,
// 	blocks: {
// 	  	"1": {
// 		  	id: '1',
// 		  	type: 'text',
// 		  	content: '<h1 className="mt-0">Основное утверждение динамики</h1><h2>Базовые вещи</h2><p className="card-text">Динамика рассматривает ваимное действие тел друг на друга, являющееся причиной изменения их движения.</p><p className="card-text">Так как движение рассматривается относительно других тел, то выбор системы отсчета является важным вопросом динамики.</p><blockquote className="blockquote">Наблюдение за природой говорит нам о том, что изменение скорости тела всегда вызывается воздействием других тел.</blockquote><h3>Еще более базовые вещи</h3><p className="card-text">Приведем пример из жизни. Пусть вы захотите резко побежать. Что позволяет вам резко ускориться? Если бы вы находились на гладком льду, вряд ли у вас получилось бы быстро набрать скорость, скорее вы бы упали. Так что ходим и бегаем мы благодаря взаимодействию с дорогой, трению подошвы обуви о поверхность контакта.</p><figure className="figure"><img className="figure-img img-fluid rounded" src="http://static.probusiness.by/n/0a/c/e-gorlovka_com_ua_1.jpg" /><figcaption className="figure-caption text-right">На улице бывает охренеть как скользко.</figcaption></figure><p className="card-text">В древней Греции ученые считали, что для поддержания скорости тела необходимо, чтобы кто-то или что-то постоянно воздействовало на него. Таким образом, единственным естественным состоянием тела считался покой. </p><p className="card-text">В действительности же <strong>свободное тело</strong> (тело, которое не взаимодействует с другими телами) может сохранять свою скорость сколь угодно долго, подобно кометам, рассекающим космическое пространство, или же оставаться в покое.</p><div className="embed-responsive embed-responsive-16by9 rounded"><iframe className="embed-responsive-item" src="https://www.youtube.com/embed/E6VIH5_H1yo?feature=oembed" allowfullscreen=""></iframe></div><p className="card-text">Автомобиль, набравший скорость и выключивший двигатель останавливается лишь благодаря воздействию сопротивления воздуха и трению механизмов трансмиссии друг о друга. Без трения скорость автомобиля оставалась бы постоянной.</p>',
// 	  	},
// 	  	"2": {
// 		  	id: '2',
// 		  	type: 'text',
// 		  	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga dolorem voluptas, omnis?',
// 	  	},
// 	  	"3": {
// 		  	id: '3',
// 		  	type: 'text',
// 		  	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus provident distinctio placeat, aspernatur non alias odit vero. Tempora quod sed, doloremque optio quis cum qui atque porro dignissimos architecto sequi earum necessitatibus at quidem, ad praesentium, ducimus magnam aliquid nobis. Et, quam.',
// 	  	}
// 	},
// 	results: {

// 	}
// }

// WORK with local storage

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return Json.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

const saveState = (state) => {
	try {
		const serializedState = Json.stringify(state);
		localStorage.swetItem('state', serializedState);
	} catch (err) {
		// ignore write if errors
	}
}

const persistedState = loadState();


// REDUCERS

function taskApp(state = initialState, action) {
  switch (action.type) {
    case NEXT_BLOCK:
      return Object.assign({}, state, {
        currentBlockNumber: state.currentBlockNumber+1
      })
    default:
      return state
  }
}

// STORE

let store = createStore(taskApp, persistedState)

console.log(store.getState())

// log store every time store updated
store.subscribe(() =>
  console.log(store.getState())
) 

// save store to localStorage every time store updated
store.subscribe(() => {
	saveState(store.getState());
})

// COMPONENTS

class TextBlock extends Component {

	render() {

		let footer = null;
	    if (this.props.current) {
	    	let label = (this.props.last) ? "Закончить" : "Следующий блок";
		    footer =
		    <div className="card-footer">
		      	<button className="btn btn-primary btn-block" onClick={e => { e.preventDefault(); store.dispatch(nextBlock())}}>
		      		{label}
	      		</button>
	  		</div>;
	    }

	    let html = {__html: this.props.block.content};

		return (
			<div className="card block-card">
				<div className="card-block" dangerouslySetInnerHTML={html}>
				</div>
				{footer}
			</div>
		);
	}
}

function Block(props) {
	if (props.block.type === 'text') {
		return <TextBlock block={props.block} current={props.current} last={props.last} />
	}
	return <div className="card card-block"><b>Неизвестный тип блока</b></div>
}


const BlockList = ({ blocks, blocksById, currentBlockNumber }) => {
	const rows = blocks.map((block_pk, i) => {
		if (i < currentBlockNumber) {
			var current = (i+1 === currentBlockNumber) ? true : false;
			var last = (i+1 === blocks.length) ? true : false
			return <Block block={blocksById[block_pk]} key={i} current={current} last={last}/>
		}
		return false;
	});
	return <div>
		{rows}
	</div>
}

// container for taskinfo & blocks
class Task extends Component {

	render() {
		return (
			<div>
				<p className="p lead text-center">Домашнее задание</p>
				<p>Сделать до: { this.props.task.datetime_to }</p>
				<p>Учитель: { this.props.task.teacher }</p>
				<p>Группа: { this.props.task.group }</p>
				<p>Номер текущего блока: { this.props.currentBlockNumber }</p>
				<hr></hr>
				<BlockList blocks={this.props.task.blocks} blocksById={this.props.blocks} currentBlockNumber={this.props.currentBlockNumber} />
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
  	blocks: state.blocks,
    currentBlockNumber: state.currentBlockNumber,
    results: state.results,
    task: state.task,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNextClick: () => {
      dispatch(nextBlock())
    }
  }
}

Task = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)

class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-block">
								<Task />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('react')
);
