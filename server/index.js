
const express = require("express");
const cors =  require('cors');
const server = express();
server.use(cors());
console.log("Server starting. importing node modules ...");
const PORT = 4300;
const ADDRESS = "127.0.0.1";
server.listen(PORT, ADDRESS, () => {
    console.log('Node server listening at', ADDRESS+":"+PORT);
});
server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error('requires elevated privileges');
      break;
    case 'EADDRINUSE':
      console.error('Server port is already in use');
      break;
    default:
      throw error;
  }
  process.exit(1);
});

server.get('/posts', (req, res) => {

  var posts = [{ 
    "id": 1, 
    "location": "San Francisco", 
    "time": "1552657573", 
    "author": "Happy User", 
    "text": "Proper PDF conversion ensures that every element of your document remains just as you left it."
  },{ 
    "id": 2,
    "location": "San Francisco", 
    "time": "1552571173", 
    "author": "Happy User", 
    "text": "The modern workplace is increasingly digital, and workflows are constantly evolving. "
  },{ 
    "id": 3, 
    "location": "San Francisco", 
    "time": "1552571174", 
    "author": "Happy Developer", 
    "text": "Digital transformation isn’t just a buzzword"
  },{ 
    "id": 4, 
    "location": "Sydney", 
    "time": "1552563973", 
    "author": "Happy Developer",
    "text": "An expectation of digital efficiency has become the norm in our daily lives"
  },{ 
    "id": 5, 
    "location": "Dublin", 
    "time": "1553080742", 
    "author": "Happy Manager", 
    "text": "A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need."
  },{ 
    "id": 6,
    "location": "Dublin", 
    "time": "1553099742", 
    "author": "Happy Manager", 
    "text": "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time."
  },{ 
    "id": 7, 
    "location": "San Francisco", 
    "time": "1552657573", 
    "author": "Happy Tester", 
    "text": "Test post from san francisco"
  },
  { 
    "id": 8, 
    "location": "Dublin", 
    "time": "1553080742", 
    "author": "Happy Tester", 
    "text": "Another test from Dublin"
  },
  { 
    "id": 9, 
    "location": "Dublin", 
    "time": "1553090742", 
    "author": "Happy Tester", 
    "text": "Another test from Dublin"
  },
  { 
    "id": 10, 
    "location": "Dublin", 
    "time": "1553090742", 
    "author": "Happy Recruiter", 
    "text": "Hire this dev plz"
  }];

  //this should arrive from a database call or a cache layer of course
  res.send(posts);
})