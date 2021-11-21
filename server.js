const express = require("express");
const path = require("path");
const app = express();
const { bots, playerRecord } = require("./data");
const { shuffleArray } = require("./utils");

// include and initialize the rollbar library with your access token
let Rollbar = require("rollbar");
let rollbar = new Rollbar({
  accessToken: "ea972c2ddbd84cbab522fd0b1cb04201",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// Rollbar event
rollbar.log("Hello, someone just opened Duel Duo!");

app.use(express.json());

app.use(express.static("public"));

app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.css"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.js"));
});

app.get("/api/robots", (req, res) => {
  try {
    res.status(200).send(botsArr);

    // Rollbar event
    rollbar.log("Someone clicked the button view all available Robots");
  } catch (error) {
    console.log("ERROR GETTING BOTS", error);
    res.sendStatus(400);

    // Rollbar event
    rollbar.error(
      "Someone experienced an error trying to view available Robots after the 'See All Bots' button was clicked"
    );
  }
});

app.get("/api/robots/five", (req, res) => {
  try {
    let shuffled = shuffleArray(bots);
    let choices = shuffled.slice(0, 5);
    let compDuo = shuffled.slice(6, 8);
    res.status(200).send({ choices, compDuo });

    // Rollbar event
    rollbar.info("Player received their 5 robots to choose from.");
  } catch (error) {
    console.log("ERROR GETTING FIVE BOTS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    // getting the duos from the front end
    let { compDuo, playerDuo } = req.body;

    // Rollbar event
    rollbar.log("A duel has started!");

    // adding up the computer player's total health and attack damage
    let compHealth = compDuo[0].health + compDuo[1].health;
    let compAttack =
      compDuo[0].attacks[0].damage +
      compDuo[0].attacks[1].damage +
      compDuo[1].attacks[0].damage +
      compDuo[1].attacks[1].damage;

    // adding up the player's total health and attack damage
    let playerHealth = playerDuo[0].health + playerDuo[1].health;
    let playerAttack =
      playerDuo[0].attacks[0].damage +
      playerDuo[0].attacks[1].damage +
      playerDuo[1].attacks[0].damage +
      playerDuo[1].attacks[1].damage;

    // calculating how much health is left after the attacks on each other
    let compHealthAfterAttack = compHealth - playerAttack;
    let playerHealthAfterAttack = playerHealth - compAttack;

    // comparing the total health to determine a winner
    if (compHealthAfterAttack > playerHealthAfterAttack) {
      playerRecord.losses++;
      res.status(200).send("You lost!");
      // Rollbar event
      rollbar.log("Computer won the duel!");
    } else {
      playerRecord.losses++;
      res.status(200).send("You won!");
      // Rollbar event
      rollbar.log("Player won the duel!");
    }
  } catch (error) {
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    res.status(200).send(playerRecord);

    // Rollbar event
    rollbar.info("Player record is displayed.");
  } catch (error) {
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);

    // Rollbar event
    rollbar.error("Player record was not displayed");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
