const express = require("express")
const os = require("os")
const app = express()
app.set('view engine', 'pug')
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.get('/', async function (req, res) {
  const platform = process.platform
  const userOS = platform === "darwin"
    ? "MacOS" : platform === "win32" || platform === "win64"
      ? "Windows" : platform === "linux"
        ? "Linux" : "Unknown"
  const processor = os.cpus()[0].model
  const memory = os.totalmem
  const ip = req.ip === "::1" ? "127.0.0.1" : req.ip
  res.render('index', {
    title: 'NodeJS PC Specs',
    header: 'Dumb NodeJS PC Specs by Thanapong Angkha',
    os: userOS,
    deviceName: os.hostname(),
    processor: processor,
    ram: Math.round(memory / 1024 / 1024 / 1024),
    isIntel: processor.toLowerCase().includes("intel"),
    ip: ip,
    uptime: (os.uptime / 60 / 60).toFixed(2)
  })
})

app.listen(PORT, () => console.log(`The app is up and running at http://localhost:${PORT}`))