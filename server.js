import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/chat', async(req, res)=>{
    const question = req.body.question;
    console.log(question);

    try{ 
       const response = await fetch('https://api.openai.com/v1/chat/completions',{
        mthod: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({})
       });
    }catch(error){

    }
    
    if(question){   
        res.json({question:`User Said ${question}`})
    }else{       
        res.status(400).json({error:'Question missing.'})
    }

});

app.listen(port,() =>{
    console.log(`Server running at http://localhost:${port}`);
});