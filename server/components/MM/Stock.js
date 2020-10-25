
import {Router} from 'express';
import DB from '../db.js';
const router = Router();


let TodaydateTry = new Date().toISOString().slice(0,10).toString();

router.get('/',async (req,res)=>
{
    console.log('imhere');
    DB.query(`
    SELECT Material.idMaterial,Storage.idStorage,StorageName,MaterialCode,MaterialName,sum(qty) as qty
    FROM storage inner join stock on stock.idStorage = Storage.idStorage 
    inner join material on Material.idMaterial = stock.idMaterial 
    where StockStat = 1
    group by stock.idStorage,stock.idMaterial
    order by StorageName,MaterialCode;
    `,(err,result)=>
    {
        if(err) console.log(err)
        res.json(result);
    });
})





router.get('/:id',async (req,res)=>
{
    console.log('imhere')
    DB.query(`SELECT  mmdocument.description,material.idMaterial,mmdocument.idDoc as idDoc,request_date,ValidTo,Vendors.* , MaterialCode 
    , MaterialName, documentdetails.price as price, qty , 
    Storage.idStorage ,StorageName , StorageStreet ,StoragePostalCode,StorageCity,StorageCountry,
    ORGname , ORGStreet , ORGCountry , ORGCity , ORGPostalCode
        from mmdocument inner join documentdetails on mmdocument.idDoc = documentdetails.idDoc
        inner join material on documentdetails.idMaterial = material.idMaterial
        inner join vendors on vendors.idVendors = mmdocument.idVendors
        inner join storage on storage.idStorage = mmdocument.idStorage
        inner join org on org.idORG = storage.idORG
        where mmdocument.idDoc = ${req.params.id} and DocType = 3 `,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result);
    });
})

router.post('/',async (req,res)=>
{ 
    console.log(req.params.id)
    let requestDate = new Date().toISOString().slice(0,10).toString();
    let validTo  = new Date().toISOString().slice(0,10).toString();
    console.log(requestDate)
    const {vendorsID  , description,refID,idStorage} = req.body;
    const def = null;
    DB.query(`INSERT INTO mmdocument
            values ('','${requestDate}','${validTo}','${description}',3,'${vendorsID}','${idStorage}',${refID},1,'') ;`
            ,(err,result)=>
    {
        if(err) console.log(err)
        res.json(result)
    });
})

router.get('/get/lastid',async(req,res)=>
{
    console.log('im here')
    DB.query(`SELECT idDoc  from mmdocument 
            where DocType=3
            order by idDoc desc 
             limit 1;`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})


router.post('/detail',async(req,res)=>
{
    const {Material} = req.body
    const idStorage = Material[0].idStorage;
    let Todaydate = new Date().toISOString().slice(0,10).toString();
    let sql = `INSERT INTO Stock values `
    sql += `(${idStorage},${Material[0].idMaterial},${Material[0].qty},'${Todaydate}',1)`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${idStorage},${Material[i].idMaterial},${Material[i].qty},'${Todaydate}',1)`
    }
    sql += ';'
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})

router.post('/ondelivery',async(req,res)=>
{
    const {Material,idStorage} = req.body
    let Todaydate = new Date().toISOString().slice(0,10).toString();
    let sql = `INSERT INTO Stock values `
    sql += `(${idStorage},${Material[0].idMaterial},${Material[0].qty},'${Todaydate}',2)`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${idStorage},${Material[i].idMaterial},${Material[i].qty},'${Todaydate}',2)`
    }
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });

})

router.post('/sold',async(req,res)=>
{
    const {Material,idStorage} = req.body
    let Todaydate = new Date().toISOString().slice(0,10).toString();
    let sql = `INSERT INTO Stock values `
    sql += `(${idStorage},${Material[0].idMaterial},${Material[0].qty},'${Todaydate}',3)`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${idStorage},${Material[i].idMaterial},${Material[i].qty},'${Todaydate}',3)`
    }
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });

})

router.post('/deduct',async(req,res)=>
{
    const {Material,idStorage} = req.body
    let Todaydate = new Date().toISOString().slice(0,10).toString();
    const Hold = Material.map((mat)=>{
        mat.qty = -mat.qty;
        return mat;
    })
    let sql = `INSERT INTO Stock values `
    sql += `(${idStorage},${Hold[0].idMaterial},${Hold[0].qty},'${Todaydate}',1)`
    for(let i=1 ; i<Material.length;i++)
    {
      sql += `,(${idStorage},${Hold[i].idMaterial},${Hold[i].qty},'${Todaydate}',1)`
    }
    DB.query(`${sql}`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });

})


router.post('/initial/:id/:numstorage',async(req,res)=>
{
    const {id,numstorage} = req.params;
    let Todaydate = new Date().toISOString().slice(0,10).toString
    let sql = `INSERT INTO STOCK values (1,${id},0,'${TodaydateTry}',1)`;
    for(let i=2;i<=numstorage;i++)
    {
        sql += `,(${i},${id},0,'${TodaydateTry}',1)`
    }
    DB.query(sql,(err,result)=>
    {
        if(err) console.log(err)
        console.log('initializing material into stock success')
        res.json(result);
    })
})

router.get('/summary/selling',async (req,res)=>
{
    console.log('imhere');
    DB.query(`
    SELECT Material.idMaterial,MaterialCode,MaterialName,sum(qty) as qty,stock.Date_added from stock
    inner join Material on stock.idMaterial = material.idMaterial
    where StockStat = 3
    group by Material.idMaterial,stock.Date_added
    order by Date_added asc
    `,(err,result)=>
    {
        if(err) console.log(err)
        res.json(result);
    });
})


export  {router as stock};