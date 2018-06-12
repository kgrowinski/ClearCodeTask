import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios/index';
import { connect } from 'react-redux';
import { fetchCurrentReddit, fetchMockComments, postFakeComment } from '../../../actions';

import Config from '../../../configuration';

const { mockCommentsURL } = Config;

export class ArticleDumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentBody: '',
      commentAuthor: '',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCurrentReddit(id);
    this.props.fetchMockComments(id);
  }

  async publishFakeComment(evt) {
    evt.preventDefault();
    const { commentBody, commentAuthor } = this.state;
    const { id } = this.props.match.params;

    const data = {
      data: {
        body: commentBody,
        author: commentAuthor,
        created: moment().unix(),
        postId: id,
      },
      id: this.props.mockComments.length + 1,
    };

    try {
      await axios({
        url: mockCommentsURL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });
    } catch (err) {
      console.log(err);
    }
    this.props.fetchMockComments(id);
  }

  renderComments() {
    const { id } = this.props.match.params;
    const { activeReddit, mockComments } = this.props;
    const comments = [
      ...activeReddit.comments,
      ...mockComments.filter(item => item.data.postId === id),
    ].sort(item => new moment().unix(item.data.created)).reverse();

    return comments.map((comment, index) => {
      const { body, author, created } = comment.data;
      return (
        <div key={index} className="list-group-item flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{author}</h5>
            <small>{moment.unix(created).utc().format('DD MM YYYY')}</small>
          </div>
          <p className="mb-1">{body}</p>
        </div>
      );
    });
  }

  render() {
    if (!this.props.activeReddit.data) {
      return null;
    }

    const { selftext, author, created } = this.props.activeReddit.data;
    return (
      <div className="container">
        <div className="jumbotron">
          <h3>Post:</h3>
          <p className="lead">{selftext}</p>
          <hr className="my-4" />
          <div className="container__reddit-info">
            <p><b>Author:</b><br />{author}</p>
            <p><b>Created:</b><br />{moment.unix(created).utc().format('DD MM YYYY')}</p>
          </div>
        </div>
        <div className="comments">
          <h3>Comments:</h3>
          <div className="list-group">

            {this.renderComments()}
          </div>
        </div>
        <div className="comments">
          <h3>Add Comment:</h3>
          <form onSubmit={evt => this.publishFakeComment(evt)}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Email address</label>
              <input
                onChange={e => this.setState({ commentAuthor: e.target.value })}
                value={this.state.commentAuthor}
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
              <textarea
                onChange={e => this.setState({ commentBody: e.target.value })}
                value={this.state.commentBody}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}


ArticleDumb.propTypes = {
  match: PropTypes.object,
  activeReddit: PropTypes.object,
  mockComments: PropTypes.array,
  history: PropTypes.object,
  fetchCurrentReddit: PropTypes.func,
  fetchMockComments: PropTypes.func,
  postFakeComment: PropTypes.func,
};

ArticleDumb.defaultProps = {
  match: {},
  mockComments: [],
  activeReddit: {},
  history: {},
  fetchCurrentReddit: () => true,
  fetchMockComments: () => true,
  postFakeComment: () => true,
};


function mapStateToProps(store) {
  return {
    activeReddit: store.redditArticles.currentReddit,
    mockComments: store.redditArticles.mockComments,
  };
}

const mapDispatchToProps = {
  fetchCurrentReddit,
  fetchMockComments,
  postFakeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDumb);
