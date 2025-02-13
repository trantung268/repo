const express = require("express");
const app = express();

// Cấu hình JSON cho Trello Power-Up
app.get("/power-up.json", (req, res) => {
    res.json({
        "capabilities": ["board-buttons"],
        "icon": "https://i.imgur.com/Qq6RV99.jpeg",
        "author": "Trần Thanh Tùng",
        "name": "My First Custom Power-Up",
        "description": "A simple Trello Power-Up to test capabilities",
        "homepage": "https://test268.vercel.app/",
        "permissions": {
            "board": "read"
        }
    });
});

// Lắng nghe cổng 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
