import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let user = '';
let avatarUser = '';
let messages = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body
    user = username
    avatarUser = avatar
    
    res.status(201);
});

app.post('/messages', (req, res) => {
    messages.push(
        {
            username: user,
            avatar: avatarUser, 
            message: '' 
        }
    );
    res.status(201);
});
  
 app.get('/messages', (req, res) => {
    res.send(pessoas);
});


app.listen(5000);
