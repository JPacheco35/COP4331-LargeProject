import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import MovieModal from './moviemodal';

import React, { useState, useEffect, useRef } from 'react';

function CardItem(props) 
{
  const [allMovies, setAllMovies] = React.useState([]);;
  const allMoviesRef = useRef([]);
  const navigate = useNavigate()
  

  const getAllMovies = async(e) => 
  {
    // JWT exists --> Authenticate Token
    try 
    {
        // Get JWT token (if it exists)
        const token =  { token: localStorage.getItem('token') }

        // No Token --> Boot the User to Homepage
        if( token.token == null) { navigate('/home') } 


        // Send token to Express Server
        const url = "http://192.241.132.66:5000/auth";
        await axios.post(url,token).
        then(async res=>
        {
            // Case: Bad JWT --> Boot user back to the homepage
            if (res.status != 200) { navigate("/home") }

            try 
            {
              const json = { userID : res.data.data._id, } 

              // Send token to Express Server
              const url = "http://192.241.132.66:5000/" + props.type;
              await axios.post(url,json).
              then(res=>
              {
                allMoviesRef.current = res.data.data;
                setAllMovies(allMoviesRef.current);
        
                // console.log(res);
                // console.log(res.data.data);
                // allMovies = res.data.data;
                // console.log("allMovies: " + allMovies);
        
              });
            } 
            catch (error) { console.log(error); }
        })
    } 

    catch (error) { console.log(error); }


  }

  const getHomeMovies = async (e) =>
  {
    try 
      {
        const json = { userID : "abcde", } 

        // Send token to Express Server
        // var url = window.location.host;
        // console.log(url);
        const url = "http://192.241.132.66:5000/getAll";
        await axios.post(url,json).
        then(res=>
        {
          console.log(res.data.data);

          allMoviesRef.current = res.data.data;
          console.log(allMoviesRef.current);
          setAllMovies(res.data.data);
          //setAllMovies(allMoviesRef.current);
  
          // console.log(res);
          // console.log(res.data.data);
          // allMovies = res.data.data;
          // console.log("allMovies: " + allMovies);
  
        });
      } 
      catch (error) { console.log(error); }
  }

    // This is the function that is ran when the page is loaded for the first time
    useEffect(() => 
    {
      if(props.type == 'homepage') { getHomeMovies(); }

      else { getAllMovies(); }
  
    }, []); // <-- empty array means 'run once'

    // Browse Movies Lists
    if(props.type == "getAll")
    {
      return (
        <Row>
            {allMovies.map((card, index) => (
                <Card key = {index} style={{ width: '18rem' }} id = {card._id}>
                <Card.Img variant="top" src= {card.thumbnail} />
                <Card.Body>
            
                  <Card.Title>{card.title}</Card.Title>
                  
                  <Card.Title>
                    Rating: {card.numReviews == 0 ? "N/A" : parseFloat(card.avgScore).toFixed(1)} 
                  </Card.Title>
            
                  <Card.Text>
                    Genre: {card.genre.toString()}
                  </Card.Text>
            
                  <Card.Text>
                    Director: {card.director.toString()}
                  </Card.Text>
            
                  <Card.Text>
                    Year: {card.year}
                  </Card.Text>
            
                  <Button variant="primary"><MovieModal type = "browse" title = {card.title} genre = {card.genre.toString()} director = {card.director.toString()} year = {card.year} id = {card._id} /></Button>
                  </Card.Body>
                </Card>
              ))}
          </Row>
      )
    }

    if(props.type == "getUserMovies")
    {
      return (
        <Row>
            {allMovies.map((card, index) => (
                <Card key = {index} style={{ width: '18rem' }} id = {card._id}>
                <Card.Img variant="top" src= {card.thumbnail} />
                <Card.Body>
            
                  <Card.Title>{card.title}</Card.Title>
                  
                  <Card.Title>
                    My Rating: {card.rating}
                  </Card.Title>
            
                  <Card.Text>
                    Genre: {card.genre.toString()}
                  </Card.Text>
            
                  <Card.Text>
                    Director: {card.director.toString()}
                  </Card.Text>
            
                  <Card.Text>
                    Year: {card.year}
                  </Card.Text>
            
                  <Button variant="primary"><MovieModal type = "myReviews" rating = {card.rating} title = {card.title} genre = {card.genre.toString()} director = {card.director.toString()} year = {card.year} id = {card._id} /></Button>
                  </Card.Body>
                </Card>
              ))}
          </Row>
      )
    }

    if(props.type == "homepage")
    {
      return (
        <Row>
            {allMovies.map((card, index) => (
                <Card key = {index} style={{ width: '18rem' }} id = {card._id}>
                <Card.Img variant="top" src= {card.thumbnail} />
                <Card.Body>
            
                  <Card.Title>{card.title}</Card.Title>
                  
                  <Card.Title>
                    User Rating: {card.numReviews == 0 ? "N/A" : parseFloat(card.avgScore).toFixed(1)} 
                  </Card.Title>
            
                  <Card.Text>
                    Genre: {card.genre.toString()}
                  </Card.Text>
            
                  <Card.Text>
                    Director: {card.director.toString()}
                  </Card.Text>
            
                  <Card.Text>
                    Year: {card.year}
                  </Card.Text>
            
                  {/* <Button variant="primary" >Login to Make Reviews...</Button> */}
                  </Card.Body>
                </Card>
              ))}
          </Row>
      )
    }

}

export default CardItem;