import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Changed 'img' to 'image'

  function handleAdd(e) {
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
        } else {
          alert("Failed to add content. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again.");
      });
  }
  
  return (
    <>
      <div className='container-fluid  py-4'>
        <div className='row'>
          <div className="col-sm-3"></div>

          <div className='col-sm-4 py-5'>
            <img src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-4480.jpg?w=1060&t=st=1687179733~exp=1687180333~hmac=1f4a16781ceae33fdb25c5d084b4b0f941e77ca41f5c19446a23c0250eb2f493" style={{ height: '500px', width: '500px' }} />
          </div>
          <div className='col-sm-4 blo'>
            <center className='py-3'><h3 style={{ color: 'black' }}>Add<u style={{ color: '#fdc700' }}>Blog</u></h3></center>
            <form onSubmit={handleAdd}>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control w-100 ' placeholder='Enter Your FirstName' /><br />
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='form-control w-100 ' placeholder='Enter Your LastName' /><br />

              <input type="file" onChange={(e) => setImage(e.target.files[0])} className='form-control w-100 ' placeholder='Enter Your profile' /><br />
              <input type="submit" className='form-control' value="Submit" style={{ background: '#fdc700' }} /><br />

            </form>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </>
  )
}
