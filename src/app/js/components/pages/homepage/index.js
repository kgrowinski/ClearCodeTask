import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRedditArticles } from '../../../actions';

export class HomePageDumb extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRedditArticles();
  }

  renderRedditArticles() {
    const { redditArticles } = this.props;
    return Object.keys(redditArticles).map((article) => {
      const { data } = redditArticles[article];

      return (
        <li className="list-group-item" key={data.id}>
          <Link to={`/article/${data.id}`}>
            {data.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={"container"}>
        Hello
        <ul className="list-group">
          {this.renderRedditArticles()}
        </ul>
        <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
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
  fetchRedditArticles: PropTypes.func,
};

HomePageDumb.defaultProps = {
  redditArticles: [],
  fetchRedditArticles: () => true,
};

function mapStateToProps(store) {
  return {
    redditArticles: store.redditArticles.redditArticles,
  };
}

const mapDispatchToProps = {
  fetchRedditArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageDumb);
