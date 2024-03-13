import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewBlog() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [postLink, setPostLink] = useState('');

  const handleClose = () => {
    setShow(false);
    setPostLink('');
  };

  const handleShow = (link) => {
    setPostLink(link);
    setShow(true);
  };

  function fetchData() {
    fetch('http://localhost:8080/show_images', {
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

  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-4'></div>
        <div className='col-sm-4' >

          <div className="card-container">
            {data.map((item, index) => (
              <div className="card" key={index} style={{ width: '25rem', margin: '10px', marginLeft:"-120px" }}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <img src={`http://localhost:8080/api/${item.image}`} className="card-img-top" alt="" />
                  <Button variant="primary mt-3 w-100" onClick={() => handleShow(`http://localhost:3000/link/${item.link}`)}>
                    Copy Post Link{item.link}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-sm-4'></div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Copy Post Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Click the button below to copy the post link:</p>
          <input type="text" className="form-control mb-2" value={postLink} readOnly />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={copyPostLink}>
            Copy Link
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewBlog;
