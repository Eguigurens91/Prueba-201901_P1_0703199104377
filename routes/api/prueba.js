var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

var fileModel = require('./jsonmodel');
var data = null;

var Pruebadata={
    '_id':'',
    'empresa':'',
    'url':'',
    'nombre':'',
    'year':null,
    'rating':null,
    'fecha':null
};

router.get('/', function(req,res,next){
    if(!data){
        fileModel.read(function(err,filedata){
            if(err){
                console.log(err),
                data=[];
                return res.status(500).json({'error':'Error en la Data!'})
            }
            data = JSON.parse(filedata);
            return res.status(200).json(data);
        });
    }else{
        return res.status(200).json(data);
    }
});


router.post('/new',function(req,res,next){
    var _Pruebadata = Object.assign({},Pruebadata,req.body);
    var dateInicial = new Date();
    _Pruebadata._id = uuidv4();
    _Pruebadata.fecha = dateInicial;

    if(!data){
        data =[];
    }
    data.push(_Pruebadata);
    fileModel.write(data, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error':'Error en la DATA!'});
        }
        return res.status(200).json(_Pruebadata);
    });
});



fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});

module.exports = router;