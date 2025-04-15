### Announcements

Team leads please send me a DM on Discord with a status update for the week, and please include your group number!

### Agenda Week 12 (4/14, 4/17)

- ~~Add web sockets~~
- ~~Lobby chat~~
  - ~~Client: Send a message to the server using POST /chat/0~~
  - ~~Server: Implement endpoint POST /chat/:gameId~~
  - ~~Server: Read the message from the body and broadcast to all users~~
  - ~~Client: Listen for the chat:roomId and update some div to display the message~~
- Implement game creation
  - Client: Do something (fill out a form to create a game)
  - Server: Implement endpoint to receive that something (POST /games)
  - Server: Do something with it (update state) (Create game instance, update database)
  - Server: Response with a success to client (no data)
  - Server: Broadcast update (Special event/message "new-game-created" { id, numberOfPlayers, ... })
  - Client: Listening for the update (socket.on("new-game-created") => Update the UI, adding a row to a "available games table", with a button for joining)
- Play a card
  - Client: click on a card
  - Server: POST /games/:gameId/play-card
  - Server: Validation (is the game active, is the user in game, is it the user's turn, does the user own this card, is this valid play)
  - Server: Update game state
  - Server: Broadcast relevant game state to users
  - Client: Listening for game state update (socket.on("game-updated:2342"))
