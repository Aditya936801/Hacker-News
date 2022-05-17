import React, { Component } from "react";
import "./scss/list.scss";
import axios from "axios";

class List extends Component {
  state = {
    newsList: [],
    search: [],
    sort: [],
  };

  handleCLick(location) {
    window.open(location, "_blank");
  }

  async getNewsbyId(newsId) {
    const data = await axios.get(
      "https://hacker-news.firebaseio.com/v0/item/" + newsId + ".json?"
    );
    return data;
  }

  handleData(idList) {
    idList.slice(0, 50).forEach(async (newsId) => {
      const x = await axios.get(
        "https://hacker-news.firebaseio.com/v0/item/" + newsId + ".json?"
      );
      this.setState({
        newsList: [...this.state.newsList, x.data],
      });
    });
  }

  async componentDidMount() {
    const res = await axios.get(
      " https://hacker-news.firebaseio.com/v0/newstories.json?"
    );
    this.handleData(res.data);
  }

  

  search = (e) => {
    if (e.target.value === "") {
      this.setState({
        search: [],
      });
    } else {
      const list = (this.state.sort.length === 0?this.state.newsList:this.state.sort).filter((el) => {
        return el.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      if (list.length === 0) {
        this.setState({
          search: null,
        });
      }
       else {
        this.setState({
          search: list,
        });
      }
    }
  };

  sorting = (e) => {
    let sortedArray = this.state.newsList
    if(this.state.search?.length !== 0)
    {
      sortedArray = this.state.search
    }
      if (e.target.value === "date") {
        sortedArray.sort((a, b) => {
          return b.time - a.time;
        });
      } else {
        sortedArray.sort((a, b) => {
          return b.score - a.score;
        });
      }
    
        this.setState({
          search: sortedArray,
        });
      
     
  };

  render() {
    const Newslist = (data) => {
      return data?.map((el) => {
        const unixDate = new Date(el?.time * 1000);
        if (el === null) return null;
        return (
          <div className="list-component" key={el.id}>
            <div
              className="title"
              onClick={() => {
                this.handleCLick(el.url);
              }}
            >
              {el.title}
            </div>
            <div className="info">
              <div>by {el.by}</div>
              <div>
                Comments : {el?.kids?.length || 0} | Points : {el.score} |
                Created At :{unixDate.toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="list_Search">
        <input
          type="text"
          placeholder="Search..."
          id="search"
          onChange={this.search}
        />
        <div id="sort" onChange={this.sorting}>
          <label htmlFor="sort">Sort By:</label>
          <select name="sort">
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        {this.state.newsList.length === 0 && (
          <div className="list"> Loading.... </div>
        )}
        {this.state.search !== null && this.state.search.length === 0 && this.state.sort.length === 0 &&(
          <div className="list">{Newslist(this.state.newsList)}</div>
        )}
      
        {this.state.search !== null && this.state.search.length > 0  &&(
          <div className="list">{Newslist(this.state.search)}</div>
        )}
        {this.state.search === null && (
          <div className="list">No Result Found</div>
        )}
      </div>
    );
  }
}

export default List;
