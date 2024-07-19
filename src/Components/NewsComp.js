import React, { Component } from 'react';
import NewsItem from './NewsItem';
import "./style.css";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

export class NewsComp extends Component {
  static defaultProps = {
    query: "general",
    pageSize: 50,
  };

  static propTypes = {
    query: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loader: true,
      page: 1,
      query: this.props.query,
      totalResults: 0,
      loadingMore: false // added flag to prevent multiple calls
    };
  }

  componentDidMount() {
    this.fetchArticles(this.props.query, this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loader: true, page: 1, articles: [] });
      this.fetchArticles(this.props.query, 1);
    }
  }

  titles = (query) => {
    let lower = query.toLowerCase();
    let up = lower.charAt(0).toUpperCase();
    let word = up + lower.slice(1);
    return `${word} news here.`
  }

  fetchArticles(query, page) {
    this.setState({ loadingMore: true }); // set loadingMore flag
    this.props.setProgress(0);
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${this.props.api_key}&page=${page}`)
      .then((response)=>{
        this.props.setProgress(50);
          return response.json();
   
      })
      
      .then(data => {
        this.props.setProgress(70);
        this.setState(prevState => ({
          articles: prevState.articles.concat(data.articles),
          loader: false,
          totalResults: data.totalResults,
          loadingMore: false // reset loadingMore flag
        }));
        this.props.setProgress(100);
      })
      .catch((error, data) => {
        console.error("Error fetching articles:", error);
        this.setState({ loader: false, loadingMore: false }); // reset loadingMore flag
        alert(data.message)
      });
  }

  loadFunc = () => {
    if (this.state.loadingMore || this.state.page > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      return;
    }
    this.setState(prevState => ({
      page: prevState.page + 1,
      loader: true,
    }), () => {
      this.fetchArticles(this.props.query, this.state.page);
    });
  }

  render() {
    return (
      <>
        <div>
          <div className="container mt-3">
            <h4 className='text-center fw-bold'>NewsMonkey - Top Headlines of {this.titles(this.props.query)} </h4>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadFunc}
              hasMore={this.state.page * this.props.pageSize < this.state.totalResults}
              loader={<div className='d-flex justify-content-center'>
                <div className='loaders'></div>
              </div>}
            >
              <div className="row mt-4 gy-4">
                {this.state.articles.filter(article => article && article.title).map((item, index) => (
                  <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                    <NewsItem
                      title={item.title}
                      urlToImage={item.urlToImage}
                      pubAt={item.publishedAt}
                      url={item.url}
                      source={item.source}
                      author={item.author}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }
}

export default NewsComp;
