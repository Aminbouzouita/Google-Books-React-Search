import React from "react";
import "./style.css"
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>
      <div className="col text-right">
        <a className="navbar-link" href="/">
          Saved
      </a>
        <a className="navbar-link" href="/books/search">
          Search
      </a>
      </div>
    </nav>
  );
}

export default Nav;
