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
import {Material} from './components/MM/Material.js';
import {Vendors} from './components/MM/Vendors.js'
import {Supply} from './components/MM/Supply.js'
import {requistion} from './components/MM/requistion.js'
import {purchase} from './components/MM/purchase.js'
import {goods} from './components/MM/goodreceipt.js'
import {invoices} from './components/MM/invoices.js'
import {stock} from './components/MM/Stock.js'

app.use('/api/mm/material',Material);
app.use('/api/mm/vendors',Vendors)
app.use('/api/mm/supply',Supply)
app.use('/api/mm/requistion',requistion)
app.use('/api/mm/purchase',purchase)
app.use('/api/mm/goodreceipt',goods)
app.use('/api/mm/invoices',invoices)
app.use('/api/mm/stock',stock)



/* FOR SD */
import {Customer} from './components/SD/Customer.js';
app.use('/api/sd/customer',Customer)


/* FOR ADMIN */
import {storage} from './components/Admin/Storage.js' 
app.use('/api/admin/storage',storage)

app.get('/test',(req,res)=>
{
 res.sendStatus(403)
})


app.listen(PORT,()=>
{
    console.log(`hello from PORT: ${PORT}` );
})
