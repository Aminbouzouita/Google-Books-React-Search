import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import "./Style.css"
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";


function SearchBooks() {
  // Setting our component's initial state
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
  }, [])

  const handleInputChange = event => {
    setSearch(event.target.value)
  }
  const history = useHistory();
  const handleBookSave = event => {

    books.map(book => {
      if (book.id === event.target.name) {
        API.saveBook({
          googleId: book.id,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          link: book.volumeInfo.infoLink,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks.thumbnail
        }).then(()=>{
           alert("Successfully added");
            history.push('/');
        })
          // alert("incorrect")
      }
       
    });
  };
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      if (search) {
        await API.SearchBook(search)
          .then(res => {
            if (res.data.hasOwnProperty("items")) {
              setBooks(res.data.items);
            } else {
              setBooks([]);
            }
          })
      }
    } catch (error) {
      console.log(error)
    }
  };
  console.log(books)


  return (
    <Container fluid>
      <Row>
        <Col size="6">
          <form>
            <h4 id="inputName">Search</h4>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn
              disabled={!(search)}
              onClick={handleFormSubmit}
            >
              Submit Book
          </FormBtn>
          </form>
        </Col>
      </Row>
      <Row>
        <Col size="12">
          {books ? (
            <List>
              { books.map(book => (
                <ListItem
                  key={book.id}>
                  <div className="row">
                    <div className="col-2">
                      <button name={book.id} onClick={handleBookSave}>Save</button>
                      <a href={book.volumeInfo.infoLink}><button>View</button></a><br />
                      <img src={book.volumeInfo.imageLinks.thumbnail} alt=""></img>
                    </div>
                    <div className="col-10">
                      <h3>{book.volumeInfo.title}</h3><strong> Created by </strong>{book.volumeInfo.authors}<br />
                      <h4>Description: </h4> {book.volumeInfo.description}
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
    </Container >
  );
}


export default SearchBooks;

