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

window.TrelloPowerUp.initialize({
  'authorization-status': function (t, options) {
    return t.get('member', 'private', 'token').then((token) => {
      if (token) {
        return { authorized: true };
      } else {
        return { authorized: false };
      }
    });
  },
  'show-settings': function (t) {
    console.log("Opening Power-Up settings");
    return t.popup({
      title: "Cài đặt Power-Up",
      url: "https://test268.vercel.app/index.html",
      height: 184
    });
  }
}, {
  appKey: "3eb15437bed89d6ea2f9155cfdf684a8", 
  oauthSecret: "8750d2e257fb42fbcfdd4a27709a45705fac0987316e78c36b2b33b4d63e4aa5"
});
