import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { Card, CardText } from 'reactstrap'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

import Block from './Block'

class Node extends Component {

  render() {

    const node = this.props.node


    const blocks = node.blocks.map((block_id, i) => {
      return <Block block_id={block_id} />
    });

    return (
      <div>
        <hr></hr>
        <Card block outline color="primary">
          <CardText>{node.title}</CardText>
        </Card>
        {blocks}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const node = state.nodes[ownProps.node_id]
  return {
    node: node
  }
}

Node.propTypes = {
  node: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps
)(Node)
