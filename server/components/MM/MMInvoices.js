import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    
    DB.query(`select * from Sources 
            where deleted = 0`,(err,result)=>
    {
        if(err) throw err;
        console.log('success');
        res.json(result);
    });
})


router.post('/',async (req,res)=>
{   
   const todaydate = new Date().toISOString().slice(0,10).toString();
    console.log(todaydate);
    DB.query(`INSERT INTO Sources
            values ('','${req.body.code}','${req.body.name}','${req.body.description}',${req.body.price},'${todaydate}','') ;`
            ,(err,result)=>
    {
        if(err) res.json({error:'error on adding'});
        console.log('success');
        res.json({success:'add success'});
    });
})


router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log(id);
    DB.query(`UPDATE Sources SET deleted = 1 WHERE idSources = ${id} ;`
            ,(err,result)=>
    {
        if(err) res.json({error:'error on adding'});
        console.log('success');
        res.json({success:'add success'});
    });
})
export  {router as MMInvoices};