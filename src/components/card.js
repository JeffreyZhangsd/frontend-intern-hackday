import React from "react";
import PropTypes from "prop-types";
import CommitCard from "./commitcard";

const Card = ({
  name,
  language,
  description,
  stargazers_count,
  forks_count,
  created_at,
  clickHandler,
  commits_url,
  commitList,
  selected,
}) => {
  // get date
  const date = new Date(created_at);
  return (
    <div onClick={() => clickHandler(commits_url)} className="card">
      <>
        <h3 className="repo_name">{name}</h3>
        <p className="card_desc">
          Language: {language} Star count: {stargazers_count} Forks:{" "}
          {forks_count} Created at: {date.toLocaleString()}
        </p>
        <p className="card_desc">{description}</p>
      </>
      <div className="commitlist">
        {commitList.map((commit) => {
          // conditional rendering to only show selected
          if (selected !== commits_url) {
            return;
          }
          return (
            <CommitCard
              commit={commit}
              key={commit.node_id}
              message={commit.commit.message}
              author={commit.commit.author.name}
              hash={commit.commit.tree.sha}
              date={commit.commit.author.date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Card;
Card.propTypes = {
  name: PropTypes.string.isRequired,
  language: PropTypes.string,
  description: PropTypes.string,
  stargazers_count: PropTypes.number.isRequired,
  forks_count: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  commits_url: PropTypes.string.isRequired,
  commitList: PropTypes.arrayOf(PropTypes.shape()),
  selected: PropTypes.string,
};
