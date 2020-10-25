import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    
    DB.query(`select * from sdDoc left join SDtype on sdDoc.Type = SDtype.Type 
    left join Customer on SDDoc.idCustomer = Customer.idCustomer
    where sdDoc.Type= 6
    order by idDoc DESC    `,(err,result)=>
    {
        if(err) console.log(err);
        console.log('success');
        res.json(result);
    });
})
router.get('/:id',async (req,res)=>
{
    console.log('imhere')
    DB.query(`SELECT  SDDoc.* , idMaterial , MaterialCode , MaterialName , MaterialDes ,Price ,weight ,qty, customer.*,SDType.Name,cusPO
    from SDDoc left join SdDocDetails on SDDoc.idDoc = SdDocDetails.idDoc
   left join Material on idMaterial = matID
   left join customer on customer.idCustomer = SDDoc.idCustomer
   left join SDtype on Sdtype.type = SDDoc.type
   where SDDoc.idDoc = ${req.params.id} and SDDoc.Type = 6 ; `,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result);
    });
})

router.post('/',async (req,res)=>
{   
   const todaydate = new Date().toISOString().slice(0,10).toString();
   const {idDoc,request_date,description,idDiscount,idCustomer,customerPO,idStorage} = req.body
    console.log(req.body);
    console.log('------------------------------this was in SDDoc Quotation------------------------------')
    DB.query(`INSERT INTO SDDoc values  
    ('','${todaydate}','${request_date}','${description}','${idDiscount}',6,2,'${idDoc}',${customerPO},${idCustomer},${idStorage}) ;`
            ,(err,result)=>
    {
        if(err) console.log(err)
        console.log(result);
        console.log('create SDDoc success')
        res.json(result);
    });
})

router.post('/detail',async(req,res)=>
{
    console.log('imhere');
    console.log(req.body);
    const {Material,refID} = req.body
    console.log(refID);
    let sql = `INSERT INTO SdDocDetails values `
    sql += `(${refID},${Material[0].idMaterial},${Material[0].qty})`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${refID},${Material[i].idMaterial},${Material[i].qty})`
    }
    sql += ';'
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        console.log('success posting quotation details')
        res.json(result)
    });
})


router.get('/get/lastid',async(req,res)=>
{
    console.log('im here')
    DB.query(`SELECT idDoc  from SDDoc 
            where Type=6
            order by idDoc desc 
             limit 1;`
            ,(err,result)=>
    {
        if(err) console.log(err);
        console.log(result + '\n ------------------------------hereeee');
        res.json(result)
    });
})

router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log(id);
    DB.query(`UPDATE SDDoc SET Stat = 2 WHERE idDoc = ${id} ;`
            ,(err,result)=>
    {
        if(err) res.json({error:'error on adding'});
        console.log('update Customer success');
        res.json(result);
    });
})






export  {router as billing};