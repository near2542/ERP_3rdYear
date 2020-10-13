import express from 'express';
import dotenv from 'dotenv' ;
import DB from './components/db.js';
import cors from 'cors';
const app = express()   
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
dotenv.config();

DB.connect((err)=>
{
    if(err) {
        console.log('error connecting DB' + err.stack );
        return;
    }
    console.log('connection success');
});
const PORT = process.env.PORT || 6969;

function testMiddleware(req,res,next)
{
    next()
    if(req.params.id === '2') {console.log('yes');}
    else console.log('no');
    
}

function loginMiddleware(req,res,next)
{
    if(req.body.id === 'near' && req.body.password === 'lol') {
        req.class = 'admin';
        next()
    }
    res.send('fk you');
}

/*            FOR MM                                        */
import {Material} from './components/MM/MaterialRouter.js';
import { MMhead } from './components/MM/MMhead.js';
import {Vendors} from './components/MM/Vendors.js'
app.use('/api/material',Material);
app.use('/api/vendors',Vendors)
app.use('/api/mmhead',MMhead)


/* FOR SD */
app.listen(PORT,()=>
{
    console.log(`hello from PORT: ${PORT}` );
})
