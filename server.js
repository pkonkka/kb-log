const express = require('express');

const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/www'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

