import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let messages = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body
    if(username.length === 0 || avatar.length === 0) {
        return res.sendStatus(400).send("Todos os campos são necessários")
    }

    users.push({
        username: username,
        avatar: avatar
    })
    
    res.status(201).send("OK");
});

app.post('/messages', (req, res) => {
    const {message, username} = req.body
    if(message.length === 0 || username.length === 0) {
        return res.sendStatus(400).send("Todos os campos são necessários")
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
    let widthMessages = 0
    if(messages.length >= 10) {
        widthMessages = messages.length-10        
    }

    res.send(messages.slice(widthMessages));
    
});

app.get('/messages/:username', (req, res) => {
    const name = req.params.username;
    let messagesOfUser = messages.filter(element => element.username === name)
    res.send(messagesOfUser);
});


app.listen(5000);
