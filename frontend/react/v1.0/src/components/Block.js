import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class TextBlock extends Component {
	render() {
	  let html = {__html: this.props.block.body};
		return (
			<div className="card block-card">
				<div className="card-block" dangerouslySetInnerHTML={html}>
				</div>
			</div>
		);
	}
}

class ChoiceBlock extends Component {
	render() {
	  let block = this.props.block;
		return (
			<Card block>
        <CardText>
        	<p className="card-text">
        		{block.question_text}
      		</p>
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
        	<p>
        		{block.question_text}
      		</p>
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
    block: block
  }
}

Block.propTypes = {
  block: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps
)(Block)