const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1 style="color: green;">USAHA PAK AJAT</h1>
        <h2>Jualan Sembako & Kebutuhan Harian</h2>
        <p>Harga murah, barang lengkap, siap antar!</p>
        <hr>
        <h3>Hubungi Kami:</h3>
        <p>📱 WA: 0812-xxxx-xxxx</p>
        <p>📍 Alamat: Kranji, West Java</p>
        <p>🕘 Buka: 07.00 - 21.00</p>
      </body>
    </html>
  `);
});

server.listen(3000);
