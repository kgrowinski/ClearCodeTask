import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRedditArticles } from '../../../actions';

export class HomePageDumb extends React.Component {
  componentDidMount() {
    const { dist } = this.props.paginationData;
    const { id } = this.props.match.params;
    this.props.fetchRedditArticles(dist, id || null);
  }

  componentDidUpdate() {
    const { dist, after, before } = this.props.paginationData;
    const { id } = this.props.match.params;
    if (id === before) {
      this.props.fetchRedditArticles(dist, null, id);
    }
    if (id === after) {
      this.props.fetchRedditArticles(dist, id, null);
    }
  }

  changePagination(operator) {
    const { after, before } = this.props.paginationData;

    switch (operator) {
      case 'next':
        this.props.history.push(after);
        break;
      case 'prev':
        this.props.history.push(before);
        break;
      default:
        break;
    }
  }

  renderRedditArticles() {
    const { redditArticles } = this.props;
    return Object.keys(redditArticles).map((article) => {
      const { data } = redditArticles[article];

      return (
        <Link to={`/articles/${data.id}`} key={data.id} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{data.author}</h5>
            <small>{moment.unix(data.created).utc().format('DD MM YYYY')}</small>
          </div>
          <p className="mb-1">{data.title}</p>
        </Link>
      );
    });
  }

  render() {
    const { id } = this.props.match.params;
    const { dist, before } = this.props.paginationData;

    if (!dist) {
      return (
        <div className="container container__flex">
          <h2>Paginated List of New Redditdev Posts</h2>
          <div className="list__full">
            <h4>There is no data</h4>
          </div>
        </div>
      );
    }
    return (
      <div className="container container__flex">
        <h2>Paginated List of New Redditdev Posts</h2>
        <ul className="list-group list__full">
          {this.renderRedditArticles()}
        </ul>
        <div className="pagination__main">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {(id && before) &&
              <li className="page-item previous" onClick={() => this.changePagination('prev')}>
                <div className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo; Previous</span>
                  <span className="sr-only">Previous</span>
                </div>
              </li>
              }
              <li className="page-item next" onClick={() => this.changePagination('next')}>
                <div className="page-link" aria-label="Next">
                  <span aria-hidden="true">Next &raquo;</span>
                  <span className="sr-only">Next</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

HomePageDumb.propTypes = {
  redditArticles: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  paginationData: PropTypes.object,
  fetchRedditArticles: PropTypes.func,
  history: PropTypes.object,
};

HomePageDumb.defaultProps = {
  match: {},
  redditArticles: [],
  paginationData: {},
  fetchRedditArticles: () => true,
  history: {},
};

function mapStateToProps(store) {
  return {
    redditArticles: store.redditArticles.articles,
    paginationData: store.redditArticles.paginationData,
  };
}

const mapDispatchToProps = {
  fetchRedditArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageDumb);
