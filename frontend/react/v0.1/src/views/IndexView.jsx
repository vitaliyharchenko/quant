import React       from 'react';
import { connect } from 'react-redux';


export class IndexView extends React.Component {

  render () {
    return (
      <h1>Hello</h1>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(IndexView);