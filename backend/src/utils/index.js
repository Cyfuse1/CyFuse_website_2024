
import app from './app.js';

app.get('/', (req, res) => {
    res.send('Hello, World!');
})


const port = 1000; 

app.listen(port , (req , res) => {
    console.log(`Server is running at http://localhost:${port}`)
})