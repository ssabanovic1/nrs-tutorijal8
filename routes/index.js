const express = require('express');
const path = require('path');
const fs =  require("fs");
const parse = require("node-html-parser").parse;

const db = require("../db/gradovi");

const router = express.Router();

var prom = "<h4>Lista gradova:</h4>";

async function update(){
  const rezultat = await db.getAllGradovi();
  var sve = "<h4>Lista gradova:</h4>" + "<ul>";
  for(var i=0; i<rezultat.length; i++){
    sve = sve + `<li>${rezultat[i].naziv}</li>`;
  }
  sve = sve + "</ul>"
  return sve;
}

router.get("/", async(req,res,next)=>{
  
  await update().then((rezultat)=>{
    fs.readFile(path.join(__dirname + "/index.html"), 'utf8', (err,html)=>{
      if(err) throw err;

      var result = html.replace(prom, String(rezultat));
      prom = rezultat;
      fs.writeFile(path.join(__dirname + "/index.html"), result, 'utf8', function (err) {
        if (err) return err;
      });
    });
  });
  var options = {
    root: path.join(__dirname)
  }
    res.sendFile('index.html',options);
});

router.post("/grad", async(req,res,next)=>{
  const rezultat = await db.createGrad(req.body);
  res.status(200).json({id: rezultat[0]});
});

router.get("/gradovi", async(req,res,next)=>{
  const rezultat = await db.getAllGradovi();
  res.status(200).json(rezultat);
});

router.get("/gradovi/:id", async(req,res,next)=>{
  const rezultat = await db.getGrad(req.params.id);
  res.status(200).json(rezultat);
});

router.put("/gradovi:id", async(req,res, next)=>{
  const rezultat = await db.updateGrad(req.params.id, req.body);
  res.status(200).json({id : req.params.id});
});

router.delete("/gradovi/:id", async(req,res,next)=>{
  const rezultat = await db.deleteGrad(req.params.id);
  res.status(200).json({success: true});
});

router.delete("/deleteAll", async(req,res,next)=>{
  const rezultat = await db.deleteAll();
  res.status(200).json({poruka : "Sve obrisano!"});
});

module.exports = router;