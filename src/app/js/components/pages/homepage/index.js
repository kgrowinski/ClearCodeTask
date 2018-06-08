import React from 'react';
import {connect} from 'react-redux'

import {
  fetchMockComments,
  fetchRedditArticels,
} from "../../../actions";

class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMockComments();
    this.props.fetchRedditArticels();
  }

  renderMockComments() {
    return this.props.mockComments.map((comment, index) => {
      return (
        <div key={index}>
          {comment.body}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        Hello
        {this.renderMockComments()}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    mockComments: store.mockComments.mockComments,
  }
}

const mapDispatchToProps = {
  fetchMockComments,
  fetchRedditArticels
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);