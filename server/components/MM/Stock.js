
import {Router} from 'express';
import DB from '../db.js';
const router = Router();



router.get('/',async (req,res)=>
{
    console.log('imhere');
    DB.query(`
    SELECT StorageName,MaterialCode,MaterialName,sum(qty) as qty
    FROM storage inner join stock on stock.idStorage = Storage.idStorage 
    inner join material on Material.idMaterial = stock.idMaterial 
    where StockStat = 1
    group by stock.idStorage,stock.idMaterial
    order by StorageName;
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



router.put('/:id',async(req,res)=>
{   console.log(req.params.id)
    const {id} = req.params
    console.log('im here')
    DB.query(`UPDATE mmdocument SET stat = 2 WHERE idDoc = ${id} ;`
            ,(err,result)=>
    {
        if(err) console.log(err);
        res.json(result)
    });
})
export  {router as stock};