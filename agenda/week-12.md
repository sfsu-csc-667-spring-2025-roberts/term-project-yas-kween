### Announcements

Team leads please send me a DM on Discord with a status update for the week, and please include your group number!

### Agenda Week 12 (4/14, 4/17)

- ~~Add web sockets~~
- Lobby chat
  - Client: Send a message to the server using POST /chat/0
  - Server: Implement endpoint POST /chat/:gameId
  - Server: Read the message from the body and broadcast to all users
  - Client: Listen for the chat:roomId and update some div to display the message
- Implement game creation
