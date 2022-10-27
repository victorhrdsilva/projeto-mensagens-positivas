import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let messages = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body
    if(!username || !avatar) {
        return res.status(400).send("Todos os campos são necessários")
    }

    users.push({
        username: username,
        avatar: avatar
    })
    
    res.status(201).send("OK");
});

app.post('/messages', (req, res) => {
    const {message, username} = req.body
    if(!message || !username) {
        return res.status(400).send("Todos os campos são necessários")
    }

    let avatar = users.find(element => element.username === username);
    avatar = avatar.avatar;

    messages.push(
        {
            username: username,
            avatar: avatar, 
            message: message 
        }
    );
    res.status(201).send("OK");
});
  
app.get('/messages', (req, res) => {

    res.send(messages.slice(-10));
    
});

app.get('/messages/:username', (req, res) => {
    const name = req.params.username;
    let messagesOfUser = messages.filter(element => element.username === name)
    res.send(messagesOfUser);
});


app.listen(5000);
