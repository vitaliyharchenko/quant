import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { Card, CardText } from 'reactstrap'

import Block from './Block'

class Node extends Component {

  render() {
    const blocks = []
    for (var i in this.props.node.blocks){
      const block_id = this.props.node.blocks[i]
      blocks.push(<Block block_id={block_id} key={block_id} />)
      if (this.props.node_id === this.props.ui.currentNode && block_id === this.props.ui.currentBlock) {break} 
    }

    // const blocks = this.props.node.blocks.map((block_id, i) => {
    //   return <Block block_id={block_id} key={block_id} />
    // });


    return (
      <div>
        <hr></hr>
        <Card block outline color="primary">
          <CardText>{this.props.node.title}</CardText>
        </Card>
        {blocks}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const node = state.nodes[ownProps.node_id]
  return {
    node: node,
    ui: state.ui
  }
}

Node.propTypes = {
  node: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps
)(Node)
