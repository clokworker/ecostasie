const express = require('express');
const router = express.Router();
const mysql  = require('mysql');
const B = require('body-parser');
/* GET api listing. */
router.post('/', B.urlencoded({extended:false}), B.json() ,(req,res)=>{
  console.log(req.body.id);
  let C = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'S4kur4-777',
    database : 'EcostaSIE'
  });
  C.connect();
  if (req.body.id){
      C.query('SELECT * FROM Users WHERE Usr=?', [req.body.id], (E, R, F)=>{
      if(R){
        if(R[0]){
          console.log(R[0].Usr);
          res.json(R[0]);
        } else {
          res.json({Fucktard: 'Usuario y/o contraseña   equivocados'});
        }
      } else {
        console.log(E);
        res.json({DatabaseErr: 'Error interno contacte a su     administrador de sistema.'})
      }
    });
  }
  if(req.body.Maker){
    C.query('SELECT * FROM Users WHERE id=?', [req.body.Maker], (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.Cots){
    C.query('SELECT max(id) as N FROM coots', (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.CotsUp){
    C.query('insert into coots(Nom, Emp, Contact, Coin, ChanTy, Cont) values(?, ?, ?, ?, ?, ?)', [req.body.Nom,req.body.Emp,req.body.Contact,req.body.Coin,req.body.Nom],(E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.CatLst){
    C.query('SELECT * FROM Cats', (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.CatIns){
    C.query('INSERT INTO cats (name) VALUES (?)',[req.body.Name],(E,R,F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    })
  }
  if(req.body.CatDel){
    C.query('DELETE FROM cats WHERE id=?',[req.body.ID],(E,R,F)=>{
      if(R){
        console.log(R)
        res.json(R);
      } else {
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su     administrador de sistema.'})
      }
    })
  }
  if(req.body.CatUpd){
    C.query('UPDATE cats SET Name=? where id=?',[req.body.Name, req.body.ID], (E,R,F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    })
  }
  if(req.body.ProdLst){
    C.query('SELECT * FROM Prod', (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.ProdIns){
    C.query('INSERT INTO prod(PartNo, ShortD, LongD, Cat) VALUES (?, ?, ?, ?)', [req.body.Part, req.body.Short, req.body.Long, req.body.Cat],(E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.ProdDel){
    C.query('DELETE FROM prod WHERE id=?',[req.body.ID],(E,R,F)=>{
      if(R){
        console.log(R)
        res.json(R);
      } else {
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.ProdUpd){
    C.query('UPDATE prod SET PartNo=?, ShortD=?, LongD=?, Cat=? WHERE id=?', [req.body.Part, req.body.Short, req.body.Long, req.body.Cat, req.body.ID], (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.ProLst){
    C.query('SELECT * FROM Prov', (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.ProIns){
    C.query('INSERT INTO prov (Alias, Razon, Direccion, Ciudad, Estado, RFC, CP, Contactos) values(?,?, ?, ?, ?, ?, ?, ?)', [req.body.Alias, req.body.Razon, req.body.Direccion, req.body.Ciudad, req.body.Estado, req.body.RFC, req.body.CP, req.body.Cont],(E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.ProUpd){
    C.query('UPDATE prov SET Alias=?, Razon=?, Direccion=?, Ciudad=?, Estado=?, RFC=?, CP=?, Contactos=? WHERE id=?', [req.body.Alias, req.body.Razon, req.body.Direccion, req.body.Ciudad, req.body.Estado, req.body.RFC, req.body.CP, req.body.Contactos, req.body.ID],(E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.ProDel){
    C.query('DELETE FROM prov WHERE id=?',[req.body.ID],(E,R,F)=>{
      if(R){
        console.log(R)
        res.json(R);
      } else {
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su     administrador de sistema.'})
      }
    })
  }
  if(req.body.CliLst){
    C.query('SELECT * FROM Clients', (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.CliIns){
    C.query('INSERT INTO Clients (Alias, Razon, Direccion, Ciudad, Estado, RFC, CP, Contactos, Tel) values(?,?, ?, ?, ?, ?, ?, ?, ?)', [req.body.Alias, req.body.Razon, req.body.Direccion, req.body.Ciudad, req.body.Estado, req.body.RFC, req.body.CP, req.body.Contactos, req.body.Telefono],(E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.CliUpd){
    C.query('UPDATE Clients SET Alias=?, Razon=?, Direccion=?, Ciudad=?, Estado=?, RFC=?, CP=?, Contactos=?, Tel=? WHERE id=?', [req.body.Alias, req.body.Razon, req.body.Direccion, req.body.Ciudad, req.body.Estado, req.body.RFC, req.body.CP, req.body.Contactos, re.body.Telefono ,req.body.ID],(E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  if(req.body.CliDel){
    C.query('DELETE FROM Clients WHERE id=?',[req.body.ID],(E,R,F)=>{
      if(R){
        console.log(R)
        res.json(R);
      } else {
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su     administrador de sistema.'})
      }
    })
  }
  if(req.body.UsrUpd){
    C.query('UPDATE Users SET Usr= ?, Pswd=?, Name=?, Position=?, Dept=?, Dir=?, Cel=?, TelA=?, NSS=?, RFC=?, Blod=?, DateIn=?, Birth=?, Commie=?, mail=? WHERE id = ?',[req.body.User, req.body.Pwd, req.body.Name, req.body.Position, req.body.Dept, req.body.Address, req.body.Cel, req.body.TelA, req.body.NSS, req.body.RFC, req.body.Blood, req.body.FIn, req.body.Bir, req.body.Cm, req.body.Mail, req.body.ID], (E, R, F)=> {
      if(R){
        console.log(R)
        res.json(R);
      } else {
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su     administrador de sistema.'})
      }
    });
  }
  if (req.body.UsrIns){
    C.query('INSERT INTO Users (Usr, Pswd, Name, Position, Dept, Dir, Cel, TelA, NSS, RFC, Blod, DateIn, Birth, Commie, mail) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.User, req.body.Pwd, req.body.Name, req.body.Position, req.body.Dept, req.body.Address, req.body.Cel, req.body.TelA, req.body.NSS, req.body.RFC, req.body.Blood, req.body.FIn, req.body.Bir, req.body.Cm, req.body.Mail],(E, R, F) =>{
      if(R){
        console.log(R)
        res.json(R);
      } else {
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su     administrador de sistema.'})
      }
    });
  }
  if(req.body.UsrDel){
    C.query('DELETE FROM users WHERE id=?',[req.body.ID],(E,R,F)=>{
      if(R){
        console.log(R)
        res.json(R);
      } else {
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su     administrador de sistema.'})
      }
    })
  }
  if(req.body.UsrLst){
    C.query('SELECT * FROM Users where Usr <> "root"', (E, R, F)=>{
      if(R){
        res.json(R);
      } else{
        console.log(E)
        res.json({DatabaseErr: 'Error interno contacte a su administrador de sistema.'})
      }
    });
  }
  C.end();
});
module.exports = router;
