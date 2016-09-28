var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/read',function(req,res){
  res.sendFile(__dirname + '/read.html');
});
app.get('/write',function(req,res){
  res.sendFile(__dirname + '/write.html');
});
app.get('/bootstrap/css',function(req,res){
  res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css');
});
app.get('/P5/js',function(req,res){
  res.sendFile(__dirname + '/node_modules/p5/lib/p5.js');
})
//io.emit('some event', { for: 'everyone' });
io.on('connection',function(socket){
  socket.on('changed',function(data){
    io.emit('data',data);
  });
  socket.on('disconnect',function(){
  });
});

http.listen(3000,function(){
  console.log("Started on port 3000");
});