import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';


function ViewBlogDesc() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [postLink, setPostLink] = useState('');
  let { id } = useParams();
  const handleClose = () => {
    setShow(false);
    setPostLink('');
  };

  const handleShow = (link) => {
    setPostLink(link);
    setShow(true);
  };

  function fetchData() {
    fetch(`http://localhost:8080/show_images/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const copyPostLink = () => {
    navigator.clipboard.writeText(postLink)
      .then(() => {
        console.log('Link copied to clipboard');
        handleClose();
      })
      .catch((error) => {
        console.error('Error copying link to clipboard:', error);
        handleClose();
      });
  };
  console.log(data,"def")

  return (
    <div className="container">
  
     {data.map((item, index) => (
              <div className="card" key={index} style={{ width: '18rem', margin: '10px' }}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <img src={`http://localhost:8080/api/${item.image}`} className="card-img-top" alt="" />
                 
                </div>
              </div>
            ))}
    </div>
  );
}

export default ViewBlogDesc;
