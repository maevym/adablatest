const db = require('./conn');

module.exports = http => {
  const io = require('socket.io')(http);
  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
    let connectedRoomId;

    socket.on('join_room', roomId => {
      socket.join(roomId);
      connectedRoomId = roomId;
      console.log('a user connected to room #' + roomId);
    });

    socket.on('history', (data) => {
      const queryq = "SELECT message FROM t_session_log WHERE session_id = ?";
      db.run(queryq, [connectedRoomId]);
      io.to(connectedRoomId).emit('history',data.message);
    });

    socket.on('message', msg => {
      io.to(connectedRoomId).emit('message', msg);

      const query =
        "UPDATE t_session_log SET message = message || ? || ' ' WHERE session_id = ?";
      db.run(query, [msg, connectedRoomId]);
    });

    socket.on('edit', msg => {
      io.to(connectedRoomId).emit('edit', msg);

      const query = 'UPDATE t_session_log SET message = ? WHERE session_id = ?';
      db.run(query, [msg, connectedRoomId]);
    });

    socket.on('start_talking', () => {
      io.to(connectedRoomId).emit('start_talking');
    });

    socket.on('stop_talking', () => {
      io.to(connectedRoomId).emit('stop_talking');
    });

    socket.on('disconnect_room', () => {
      socket.leave(connectedRoomId, () => {
        connectedRoomId = null;
      });
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });
  });
};
