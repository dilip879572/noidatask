const express = require('express')
const PORT = process.env.PORT || 8080
require('./database/config')
const User = require('./database/user');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


app.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body
    if (!name  || !password ) {
      res.send({ message: "Plz fill Ful details" })
    }
    let user_data = new User(req.body)
    let result = await user_data.save()
    result = result.toObject()
    if (result) {
      let myToken = await user_data.getAuthToken()
      if (myToken) {
          res.send({
          result,
          message: "Token Was Generated Successfully",
          token: myToken
        })
      } else {
        res.send({ message: "Token was not generated" })
      }
    } else {
      res.send({ message: "User was not Found" })
    }
  } catch (error) {
    res.send({
      message: "Server Error"
    })
  }
})


app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ name });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return res.json({
          user,
          message: "Login was successful",
        });
      } else {
        return res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});


app.get('/user', async (req, res) => {
  try {
    const student = await User.find()
    res.send({ student, message: "Data get Successfully", status: (200) })
  } catch (error) {
    res.status(400).send({ error: "No Record Found" })
  }
})


app.delete('/user/:id', async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.send({ message: 'Record deleted successfully' });
    } else {
      res.status(404).send({ error: 'Record not found' });
    }
  } catch (error) {
    console.error('Error deleting data:', error.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.get('/user/:id', async (req, res) => {
  const result = await User.findOne({ _id: req.params.id })
  if (result) {
    res.send(result)
  } else {
    res.send('undefind')
  }
})


app.put('/user/:id', async (req, res) => {
  const result = await User.updateOne({ _id: req.params.id }, { $set: req.body })
  res.send(result)
})






//----------------------------   Contact get api        ---------------------------//

const multer = require('multer');
const path = require('path');
const ImagesModel = require('./database/images'); 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage: storage }).single('image'); 

function generateUniqueToken(length) {
  const chars = '0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      token += chars[randomIndex];
  }
  return token;
}

 

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occurred during file upload.' });
    }
 
    const uniqueToken = generateUniqueToken(6);
    
    const newImage = new ImagesModel({
      title: req.body.title,
      description: req.body.description,
      link :uniqueToken,
      image: req.file.filename, 
    });

    newImage
      .save()
      .then(() => res.send('Successfully uploaded'))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Failed to save the image.' });
      });
  });
});




app.get('/show_images', async (req, res) => {
  try {
    const result = await ImagesModel.find();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching images.' });
  }
});

app.use("/api/", express.static("./uploads")); 
app.get('/show_images/:link', async (req, res) => {
  try {
    const {link}=req.params;
    const result = await ImagesModel.find({link:link});
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching images.' });
  }
});



app.listen(PORT, () => {
  console.log('server started')
})