import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Node from '../components/Node'

class Task extends Component {

  render() {

    const task = this.props.task
    const lesson = this.props.lesson


    const nodes = lesson.nodes.map((node_id, i) => {
      return <Node node_id={node_id}/>
    });

    var content
    if (task) {
      content = (
        <div>
          <p className="p lead text-center">Домашнее задание</p>
          <p>Сделать до: { task.datetime_to }</p>
          <p>Учитель: { task.teacher }</p>
          <p>Группа: { task.group }</p>
          <p>Урок: { lesson.title }</p>

        </div>
      )
    } else {
      content = (
        <div>
          <p>Таск еще не загружен</p>
          <Spinner name='double-bounce' />
        </div>
      )
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-block">
                {content}
                {nodes}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const task = state.tasks[ownProps.match.params.task_id]
  return {
    task: task,
    lesson: state.lessons[task.lesson]
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  lesson: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps
)(Task)
