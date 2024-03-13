import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ViewBlog from "./ViewBlog";

export default function Home() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const[postId ,setPostId]= useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Content Added Successfully");
          navigate("/viewblog");
          window.localStorage.setItem("postId", postId);

        } else {
         
        }
      })
      .catch((err) => {
        console.log(err);
     
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <center>
          <Button   className="bnt btn-dark w-100 text-center h-100" onClick={handleShow}>
          Add The New Post
          </Button>
          </center>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add blog</Modal.Title> <br/>
              
            </Modal.Header>
            <p style={{textAlign:"center"}}>Write your post title and description and deploy image</p>
            <form onSubmit={handleAdd} className="m-3">
              <label htmlFor="title"><b>Title</b></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='form-control w-100'
                placeholder='Enter Your Title'
              /><br />

              <label htmlFor="description"><b>Description</b></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='form-control w-100'
                placeholder='Enter Your Description'
              ></textarea><br />

              <label htmlFor="image"><b>Image</b></label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className='form-control w-100'
                placeholder='Choose Image'
              /><br />

          <br />
            </form>

            <Modal.Footer>
             
              <Button variant="primary" type="submit" onClick={handleAdd}>
                Save blog
              </Button>
            </Modal.Footer>
          </Modal>
          <ViewBlog/>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  )
}
