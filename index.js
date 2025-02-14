require("dotenv").config();
const TrelloPowerUp = require("trello-power-up");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.TRELLO_API_KEY;
const TOKEN = process.env.TRELLO_API_TOKEN;

// Endpoint xử lý khi người dùng thêm link vào thẻ
app.get("/getCardInfo", async (req, res) => {
  const { cardUrl } = req.query;

  if (!cardUrl) {
    return res.status(400).json({ error: "Thiếu cardUrl" });
  }

  const cardId = cardUrl.split("/").pop();
  if (!cardId) {
    return res.status(400).json({ error: "URL không hợp lệ" });
  }

  try {
    const response = await axios.get(
      `https://api.trello.com/1/cards/${cardId}?fields=name,labels,idMembers,badges&attachments=true&key=${API_KEY}&token=${TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Không lấy được thông tin thẻ." });
  }
});

// Endpoint kiểm tra trạng thái xác thực với Trello API
app.get("/authorization-status", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.json({ authorized: false });
  }

  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me?key=${API_KEY}&token=${token}`
    );

    if (response.data && response.data.id) {
      return res.json({ authorized: true });
    }
  } catch (error) {
    return res.json({ authorized: false });
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
