import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { Card, CardText, Button } from 'reactstrap';

import { nextBlock } from '../reducers'

class TextBlock extends Component {
	render() {
		return (
			<Card block>
        <CardText>{this.props.block.body}</CardText>
        <Button color="secondary" onClick={() => alert("Clock")}>Следующий блок</Button>
      </Card>
		);
	}
}

class ChoiceBlock extends Component {
	render() {
	  let block = this.props.block;
		return (
			<Card block>
        <CardText>
        	{block.question_text}
      	</CardText>
      </Card>
		);
	}
}

class FloatBlock extends Component {
	render() {
	  let block = this.props.block;
		return (
			<Card block>
        <CardText>
        	{block.question_text}
        	{block.answer}
      	</CardText>
      </Card>
		);
	}
}

function Block(props) {
	switch (props.block.block_type) {
    case 'textblock':
      return <TextBlock block={props.block} />
    case 'floatblock':
      return <FloatBlock block={props.block} />
    case 'choiceblock':
      return <ChoiceBlock block={props.block} />
    default:
      return <div className="card card-block"><b>Неизвестный тип блока</b></div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const block = state.blocks[ownProps.block_id]
  return {
    block: block,
    ui: state.ui
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNextClick: () => {
      dispatch(nextBlock())
    }
  }
}

Block.propTypes = {
  block: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block)