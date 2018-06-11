import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchCurrentReddit } from '../../../actions';

export class ArticleDumb extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCurrentReddit(id);
  }

  renderComments() {
    return this.props.activeReddit.comments.map((comment, index) => {
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
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Email address</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
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
  history: PropTypes.object,
  fetchCurrentReddit: PropTypes.func,
};

ArticleDumb.defaultProps = {
  match: {},
  activeReddit: {},
  history: {},
  fetchCurrentReddit: () => true,
};


function mapStateToProps(store) {
  return {
    activeReddit: store.redditArticles.currentReddit,
  };
}

export default connect(mapStateToProps, { fetchCurrentReddit })(ArticleDumb);
