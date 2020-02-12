const fetch = require("node-fetch");

module.exports = {
  search: function(searchTerm, searchLimit, sortBy) {
    return fetch(
      `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
    )
      .then(res => res.json())
      .then(data => {
        return data.data.children.map(data => data.data);
      })
      .catch(err => console.log(err));
  },

  topSubreddit: function(sub, limit = 25) {
    return fetch(`http://www.reddit.com/r/${sub}/top.json?limit=${limit}`).then(
      res =>
        res.json().then(data => {
          return data.data.children.map(data => data.data);
        })
    );
  }
};
