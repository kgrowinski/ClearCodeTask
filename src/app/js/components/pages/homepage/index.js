import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRedditArticles, setPaginationData } from '../../../actions';

export class HomePageDumb extends React.Component {
  componentDidMount() {
    const { dist } = this.props.paginationData;
    const { id } = this.props.match.params;
    this.props.fetchRedditArticles(dist, id || null);
  }

  componentDidUpdate(prevProps) {
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
    const { id } = this.props.match.params;

    switch (operator) {
      case 'next':
        this.props.history.push(after);
        break;
      case 'prev':
        if (id) {
          this.props.history.push(before);
        }
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
        // <Link to={`/article/${data.id}`} key={data.id}>
        <li className="list-group-item" key={data.id}>
          {data.title}
        </li>
        // </Link>
      );
    });
  }


  render() {
    const { id } = this.props.match.params;
    return (
      <div className="container container__flex">
        <h2>Paginated List of New Reddits</h2>
        <ul className="list-group list__full">
          {this.renderRedditArticles()}
        </ul>
        <div className="pagination__main">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {id &&
              <li className="page-item" onClick={() => this.changePagination('prev')}>
                <div className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo; Previous</span>
                  <span className="sr-only">Previous</span>
                </div>
              </li>
              }
              <li className="page-item" onClick={() => this.changePagination('next')}>
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
  setPaginationData: PropTypes.func,
  fetchRedditArticles: PropTypes.func,
};

HomePageDumb.defaultProps = {
  match: {},
  redditArticles: [],
  paginationData: {},
  setPaginationData: () => true,
  fetchRedditArticles: () => true,
};

function mapStateToProps(store) {
  return {
    redditArticles: store.redditArticles.articles,
    paginationData: store.redditArticles.paginationData,
  };
}

const mapDispatchToProps = {
  fetchRedditArticles,
  setPaginationData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageDumb);
