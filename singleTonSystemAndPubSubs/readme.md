# 🕹️ Game Manager (Singleton Pattern Example)

This project is a simple example of a **Game Manager** written in TypeScript.  
It follows the **Singleton Design Pattern**, which means only **one instance** of the manager exists across the whole app.

---

## 📦 What It Does

- Adds new games with two players (white and black)
- Stores moves for each game
- Returns the list of all games
- Logs all game data to the console

---

## 🔧 How It Works

### ✅ Singleton Pattern

The GameManager uses a Singleton pattern.  
This means:
- Only **one instance** of GameManager is created
- Same instance is used everywhere in the app

### ✅ Important Parts

- `private constructor()` → prevents creating multiple objects  
- `static getInstance()` → returns the same instance every time

---

## 🧠 Example Code

```ts
// Add a game
gameManager.addGame("game1");

// Add moves
gameManager.addMove("game1", "e4");
gameManager.addMove("game1", "e5");

// Log current state
gameManager.logState();


### PUB SUB 
  # run a redis contain using 
     `docker run --name redis -d -p 6379:6379 redis`
     `docker exec -it redis /bin/bash`
     `redis-cli`
     # make these to in two difference clis
     `SUBSCRIBE APPL`
     `PUBLISH APPL 200.2`
     # Above is to for check how subcribe and publish works