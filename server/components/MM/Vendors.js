import {Router} from 'express';
import DB from '../db.js';
const router = Router();


router.get('/',async (req,res)=>
{
    
    DB.query(`select * from employee`,(err,result)=>
    {
        if(err) throw err;
        console.log(result);
    });
})

router.get('/:id',async(req,res)=>
{
    res.send(`${req.params.id}`)
})

router.post('/',async (req,res)=>
{
    DB.query(`INSERT into employee (idemployee,employeeName) values ('','${req.query.name}') `,(err,result)=>
    {
        if(err) throw err;
        console.log(result);
        res.send('ok');
    });
})




export  {router as Vendors};