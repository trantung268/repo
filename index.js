const TrelloPowerUp = require("trello-power-up");

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "3eb15437bed89d6ea2f9155cfdf684a8";
const TOKEN = "ATTA2bc1f4314f7b179d027e1513c27294e30d90fda0153a049f1ca488c513d8773307414528";

// Endpoint xử lý khi người dùng thêm link vào thẻ
app.get("/getCardInfo", async (req, res) => {
  const { cardUrl } = req.query;

  try {
    const cardId = cardUrl.split("/").pop(); // Lấy ID từ URL
    const response = await axios.get(
      `https://api.trello.com/1/cards/${cardId}?fields=name,labels,idMembers,badges&attachments=true&key=${API_KEY}&token=${TOKEN}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Không lấy được thông tin thẻ." });
  }
});

// Endpoint xử lý Trello Power-Up
app.get("/", (req, res) => {
  res.send("Trello Power-Up Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
