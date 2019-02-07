var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');


var fileModel = require('./jsonmodel');
var data = null; 

var pruebaSSf = {
  '_id':'',
  'empresa':'',
  'url':'',
  'nombre':'',
  'year':null,
  'rating':null,
  'FechaIng': null 
};

// Funcion para obtener datos

router.get('/', function( req, res, next) {
  if(!data){
    fileModel.read(function(err, filedata){
      if(err){
        console.log(err);
        data = [];
        return res.status(500).json({'Error':'Error al Obtener La información'});
      }
      data = JSON.parse(filedata);
      return res.status(200).json(data);
    });
  } else {
    return res.status(200).json(data);
  }
});

router.post('/new', function(req, res, next){
  var pruebaSSfDatos = Object.assign({},pruebaSSf, req.body);
  var dateT = new Date();
  pruebaSSfDatos._id = uuidv4();
  pruebaSSfDatos.fcIng = dateT;

  if(!data){
    data = [];
  }
  data.push(pruebaSSfDatos);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ 'Error': 'Error al Obtener Información' });
    }
    return res.status(200).json(pruebaSSf);
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
