import React, { useEffect, useState } from "react";
import "./Style.css"
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";

function Detail(props) {
  const [book, setBook] = useState({})

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams()
  useEffect(() => {
    API.getBook(id)
      .then(res => setBook(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <Container fluid>
        <div className="row">
          <div className="detail col-2">
            <img src={book.image} className="bookImg" alt=""></img>
          </div>
          <div className="detail col-6">
            <h3>{book.title}</h3><strong> Created by </strong>{book.authors}<br />
            <h4>Description: </h4> {book.description}
          </div>
        </div>
      <Row>
        <Col size="md-2">
          <Link to="/">← Back to Authors</Link>
        </Col>
      </Row>
    </Container>
  );
}


export default Detail;
