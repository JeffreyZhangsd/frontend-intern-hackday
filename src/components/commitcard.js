import React from "react";
import PropTypes from "prop-types";

const CommitCard = ({ message, author, hash, date }) => {
  const time = new Date(date);
  // appears to be sorted by recent already
  return (
    <span id="commitcard">
      <h3> Message: {message} </h3>
      <p className="card_desc">
        {/* not 100% sure if this is the hash */}
        User: {author}, Hash: {hash}, Created at: {time.toLocaleString()}
      </p>
    </span>
  );
};

export default CommitCard;
CommitCard.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
