const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const openai = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openaiAPI = new openai(process.env.OPENAI_API_KEY);

app.get('/', (req, res) => {
    res.send('bienvenido al chatbot');
});

app.post('/message', async(req, res) => {
    const { prompt } = req.body;
    // console.log(prompt);
    // console.log(req.body)
    try {
        const aiResponse = await openaiAPI.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
        res.json({
            ai_response: aiResponse.choices[0].message,
        })
    } catch (error) {
        console.log(error);
    }
    
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log('la aplicacion esta correindo en el puerto', PORT);
})