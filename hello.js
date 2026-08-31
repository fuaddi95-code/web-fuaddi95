const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send('<h1>Selamat Dateng Pak ajat!</h1><p>Ini web pertama saya di node.js</p>');
});

app.listen(port, () => {
    console.log(`Server jalan di http://localhost:${port}`);
});