import express from 'express';
const app = express()
import dotenv from 'dotenv' ;   
dotenv.config();

 PORT = process.env.PORT || 6969;





function testMiddleware(res,req,next)
{
    console.log('hello')
    next()
}

app.get('/:id',testMiddleware,(req,res)=>
{
    res.send(`${req.id}`);
})

app.get('/sad',testMiddleware,(req,res)=>
{
    res.send('sad');
})

app.listen(PORT,()=>
{
    console.log(`hello from PORT: ${PORT}` );
})
