var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();


var fileModel = require('./jsonmodel');
var data = null; 

var pruebaSSf = {
  '_id':'',
  'empresa':'',
  'url':'',
  'nombre':'',
  'year':'',
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
  var pruebaSSfDatos = Object.assign({} , InfoPrueba, req.body);
  var dateT = new Date();
  var dateD = new Date();
  dateD.setDate(dateT.getDate()+ 3);
  pruebaSSfDatos.fcIng = dateT;
  pruebaSSfDatos.due = dateD;
  pruebaSSfDatos._id = uuidv4();
  if(!data){
    data = [];
  }
  data.push(pruebaSSfDatos);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ 'Error': 'Error al Obtener Información' });
    }
    return res.status(200).json(_thingsData);
  });
});




router.put('/done/:PruebaId', function(req, res, next){
  var _PruebaId = req.params.thingId;
  var _PruebaUpds = req.body;
  var _PruebaUpdated = null;
  var newData = data.map(
    function(doc, i){
      if (doc._id == _PruebaId){
        _PruebaUpdated = Object.assign(
          {},
          doc,
          {"done":true},
          _PruebaUpds
          );
        return _PruebaUpdated;
      }
      return doc;
    }
  );
  data = newData;
  fileModel.write(data, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ 'Error': 'Error al Guardar Información' });
    }
    return res.status(200).json(_PruebaUpdated);
  });
});


router.delete('/delete/:PruebaId', function(req, res, next){
  var _PruebaId = req.params._PruebaId;
  var newData = data.filter(
    function (doc, i) {
      if (doc._id == _PruebaId) {
        return false;
      }
      return true;
    }
  );

  data = newData;
  fileModel.write(data, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ 'Error': 'Error al Guardar Información' });
    }
    return res.status(200).json({"delete": _PruebaId});
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
