import React from "react";
import PropTypes from "prop-types";

const CommitCard = ({ message, author, hash, date }) => {
  const time = new Date(date);

  return (
    <>
      <h3> Message: {message} </h3>
      <p>
        {" "}
        User: {author}, Hash: {hash}, Created at: {time.toLocaleString()}
      </p>
    </>
  );
};

export default CommitCard;
CommitCard.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
