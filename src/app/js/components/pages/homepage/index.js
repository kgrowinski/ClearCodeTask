import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRedditArticles, setPaginationData } from '../../../actions';

export class HomePageDumb extends React.Component {
  componentDidMount() {
    const { paginationData } = this.props;
    this.props.fetchRedditArticles(paginationData);
  }

  changePagination(operator) {
    const {
      limit, paginationSize, currentPagination, firstPagination, nextAfter,
    } = this.props.paginationData;
    const newPaginationData = {
      limit,
      nextAfter,
      firstPagination,
      paginationSize,
    };

    switch (operator) {
      case 'add':
        newPaginationData.currentPagination = currentPagination + 1;
        break;
      case 'subtract':
        newPaginationData.currentPagination = currentPagination - 1;
        break;
      default:
        return;
    }

    if (newPaginationData.currentPagination >= firstPagination &&
      newPaginationData.currentPagination <= paginationSize - limit) {
      this.props.setPaginationData(newPaginationData);
    }
  }

  renderPagination() {
    const {
      limit, paginationSize, currentPagination, firstPagination,
    } = this.props.paginationData;

    return [...Array(5)].map((item, index) => {
      const newPaginationData = {
        limit,
        nextAfter: (currentPagination + index) * limit,
        firstPagination,
        currentPagination,
        paginationSize,
      };

      return (
        <li
          className="page-item"
          key={index}
          onClick={() => this.props.setPaginationData(newPaginationData)}
        >
          <div className="page-link">
            {currentPagination + index}
          </div>
        </li>
      );
    });
  }

  renderRedditArticles() {
    const { redditArticles, paginationData } = this.props;
    const { nextAfter, limit } = paginationData;
    return _.slice(Object.keys(redditArticles), nextAfter, nextAfter + limit).map((article) => {
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
    return (
      <div className="container container__flex">
        <h2>Paginated List of New SubReddits</h2>
        <ul className="list-group list__full">
          {this.renderRedditArticles()}
        </ul>
        <div className="pagination__main">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" onClick={() => this.changePagination('subtract')}>
                <div className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </div>
              </li>
              {this.renderPagination()}
              <li className="page-item" onClick={() => this.changePagination('add')}>
                <div className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
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
  paginationData: PropTypes.object,
  setPaginationData: PropTypes.func,
  fetchRedditArticles: PropTypes.func,
};

HomePageDumb.defaultProps = {
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
