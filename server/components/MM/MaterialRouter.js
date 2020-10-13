import {Router} from 'express';
import DB from '../db.js';
const router = Router();


router.get('/',async (req,res)=>
{
    
    DB.query(`select * from employee`,(err,result)=>
    {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
})

router.get('/:id',async(req,res)=>
{
    DB.query(`select * from employee where idemployee = ${req.params.id};`,(err,result)=>
    {
        console.log(req.params.id);
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
})
router.post('/',async (req,res)=>
{
    DB.query(`INSERT into employee (idemployee,employeeName) values ('','${req.body.email}') ;`,(err,result)=>
    {
        if(err) throw err;
        console.log(result);
        res.send('ok');
    });

router.post('/:id',async(req,res)=>
{
    DB.query(`UPDATE TABLE employee set deleted = 1  WHERE id = ${req.params.id} `)
    {
        
    }
})
})




export  {router as Material};