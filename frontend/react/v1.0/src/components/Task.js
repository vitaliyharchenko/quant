import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

class Task extends Component {

  render() {

    const task = this.props.task

    var content 

    if (task) {
      content = (
        <div>
          <p className="p lead text-center">Домашнее задание</p>
          <p>Сделать до: { task.datetime_to }</p>
          <p>Учитель: { task.teacher }</p>
          <p>Группа: { task.group }</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks[ownProps.match.params.task_id]
  }
}

Task = connect(
  mapStateToProps
)(Task)

export default Task
