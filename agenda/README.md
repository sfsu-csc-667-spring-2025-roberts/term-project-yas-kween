### Announcements

Team leads please send me a DM on Discord with a status update for the week, and please include your group number!

### Agenda Week 14 (4/28, 5/1)

- Finish game creation
  - add cards to game
  - deal cards
  - let players know game has started
- Play a card
  - Client: click on a card
  - Server: POST /games/:gameId/play-card
  - Server: Validation (is the game active, is the user in game, is it the user's turn, does the user own this card, is this valid play)
  - Server: Update game state
  - Server: Broadcast relevant game state to users
  - Client: Listening for game state update (socket.on("game-updated:2342"))

### Agenda Week 13 (4/21, 4/24)

- Implement game creation
  - ~~Client: Do something (fill out a form to create a game)~~
  - ~~Server: Implement endpoint to receive that something (POST /games)~~
  - ~~Server: Do something with it (update state) (Create game instance, update database)~~
  - Server: Broadcast update (Special event/message "new-game-created" { id, numberOfPlayers, ... })
  - Client: Listening for the update (socket.on("new-game-created") => Update the UI, adding a row to a "available games table", with a button for joining)
- Implement game joining

### Agenda Week 12 (4/14, 4/17)

- ~~Add web sockets~~
- ~~Lobby chat~~
  - ~~Client: Send a message to the server using POST /chat/0~~
  - ~~Server: Implement endpoint POST /chat/:gameId~~
  - ~~Server: Read the message from the body and broadcast to all users~~
  - ~~Client: Listen for the chat:roomId and update some div to display the message~~

### Agenda Week 11 (4/7, 4/10)

- ~~Set up front end build process~~
  - ~~Monday section used webpack, Thursday section will (try to) use Parcel (no config)~~
- ~~live reload~~
- Add authentication
  - ~~Data handling (how/where does the code go to manage DB interactions for auth)~~
  - ~~UI~~
  - ~~Logic to connect UI to data handling~~
- ~~Add sessions~~
