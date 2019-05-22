const app = require('./app');
const PORT = require('./config.js');

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});