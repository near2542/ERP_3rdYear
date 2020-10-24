import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    
    DB.query(`select * from sdDoc left join SDtype on sdDoc.Type = SDtype.Type 
    left join Customer on SDDoc.idCustomer = Customer.idCustomer
    where sdDoc.Type= 4
    order by idDoc DESC    `,(err,result)=>
    {
        if(err) throw err;
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
   where SDDoc.idDoc = ${req.params.id} and SDDoc.Type = 4 ; `,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result);
    });
})

router.post('/',async (req,res)=>
{   
   const todaydate = new Date().toISOString().slice(0,10).toString();
   const {idDoc,valid_to,description,idDiscount,idCustomer,customerPO,idStorage} = req.body
    console.log('------------------------------this was in SDDoc Quotation------------------------------')
    DB.query(`INSERT INTO SDDoc values  
    ('','${todaydate}','${valid_to}','${description}','${idDiscount}',4,1,'${idDoc}','${customerPO}',${idCustomer},${idStorage}) ;`
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
            where Type=4
            order by idDoc desc 
             limit 1;`
            ,(err,result)=>
    {
        if(err) console.log(err);
        console.log(result + '\n ------------------------------hereeee');
        res.json(result)
    });
})

router.get('/totalNeed/:id',async(req,res)=>
{
    DB.query(`select SdDocDetails.*,sum(qty) as qty from SdDocDetails left join Material on sdDocDetails.matID = idMaterial
    where idDoc = ${req.params.id}
    group by matID 
    `,(err,result)=>
    {
        if(err) console.log(err);
        console.log('success');
        res.json(result);
    });
})

router.get('/get/storage',async(req,res)=>
{
    DB.query(`select count(*) as num from storage`
    ,(err,result)=>
    {
        if (err) console.log(err);
        res.json(result);
    })
})

router.put('/:id',async(req,res)=>
{   const {id} =  req.params
console.log(id);
    DB.query(`UPDATE customer SET deleted = 1 WHERE idCustomer = ${id} ;`
            ,(err,result)=>
    {
        if(err) res.json({error:'error on adding'});
        console.log('update Customer success');
        res.send('success');
    });
})






export  {router as pick};