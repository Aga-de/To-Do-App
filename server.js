const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

let tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
    socket.emit('updateData', tasks);
  
    socket.on('addTask', (task) => {
      console.log('New task added ');
      tasks.push(task);
      socket.broadcast.emit('addTask', task);
    });
  
    socket.on('removeTask', (id) => {
      console.log('Task' + id + ' removed');
      tasks.filter(task => task.id !== id);
      socket.broadcast.emit('removeTask', id);
    });
  });
  
  app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
  });
  