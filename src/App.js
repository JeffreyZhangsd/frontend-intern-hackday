import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card";
// import "dotenv/config";

function App() {
  const [search, setSearch] = useState("Netflix");
  const [repoList, setRepoList] = useState([]);
  // using a usestate for commit list sets commitlist for every single card
  const [commitList, setCommitList] = useState([]);
  const [selected, setSelected] = useState(null);

  // search handler for searching other github organizations
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  // search on submit, not as we type into search
  const submitHandler = (event) => {
    event.preventDefault();
    getRepoData();
  };

  // checking for successful data response
  const checkData = (res) => {
    if (res.status >= 200 && res.status <= 299) {
      return res.json();
    } else {
      throw Error(res.statusText);
    }
  };
  const options = {
    headers: new Headers({
      // 'Authorization': 'Token INSERT_GITHUB_TOKEN_HERE'
    }),
  };
  // fetch all repository data
  const getRepoData = () => {
    fetch(`https://api.github.com/orgs/${search}/repos`, options)
      // checking for error first
      .then((res) => checkData(res))
      .then((data) => {
        console.log("repo data recieved: ", data);
        // sort by descending star count
        data.sort((a, b) => (b.stargazers_count > a.stargazers_count ? 1 : -1));
        setRepoList(data);
      })
      .catch((err) => console.error("error fetching repo data: ", err));
  };

  const getCommitData = (url) => {
    fetch(url, options)
      .then((res) => checkData(res))
      .then((data) => {
        console.log("commit data recieved: ", data);
        // sort by most recent changes
        setCommitList(data);
      })
      .catch((err) => console.error("error fetching commit data: ", err));
  };

  // on page load, get data
  useEffect(() => {
    getRepoData();
  }, []);

  // clickHandler for showing commits
  const clickHandler = (url) => {
    console.log(selected);
    if (selected === url) {
      setCommitList([]);
      setSelected(null);
    } else {
      setSelected(url);
      url = url.replace("{/sha}", "");
      getCommitData(url);
    }

    if (selected === url) {
      console.log("selected");
    }
  };

  return (
    <div>
      <h1 id="title">Search for a GitHub organization!</h1>
      <div className="searchbar">
        <div>
          <form onSubmit={(e) => submitHandler(e)}>
            <div>
              <label htmlFor="githubOrgSearch" hidden>
                Search for GitHub organization!
              </label>
              <input
                value={search}
                onChange={(e) => searchHandler(e)}
                type="text"
                className="form-control"
                id="githubOrgSearch"
                aria-describedby="githubOrgSearch"
                placeholder="Search for a GitHub Organization"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
      <span className="repos">
        {repoList.map((repo) => {
          return (
            <>
              <Card
                commitList={commitList}
                clickHandler={clickHandler}
                repo={repo}
                key={repo.id}
                name={repo.name}
                language={repo.language}
                description={repo.description}
                stargazers_count={repo.stargazers_count}
                forks_count={repo.forks_count}
                created_at={repo.created_at}
                commits_url={repo.commits_url}
              />
            </>
          );
        })}
      </span>
    </div>
  );
}

export default App;
