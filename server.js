const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const router = require("./server/routes/weatherRoutes");
app.use(cors());
const port = 5000;


app.use(express.json());
app.use("/api", router);
if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
app.listen(process.env.PORT || port , () =>{
    console.log(`Server started on port ${port}`)
});
