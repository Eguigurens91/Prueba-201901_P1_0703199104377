
//Middleware
var express = require("express");
var router = express.Router();  


// METODO POST (NUEVO)
router.post ('/new', function(req,res, next){
    var _uData = req.body;
    console.log(_uData);
    res.json({"mensaje":"okay"});
});


// METODO POST (PARA LOGIN)
 router.post('/login',function(req, res, next){
    var _uData= req.body;
    console.log(_uData);
    res.json({"mensaje":"okay"});
 });

 module.exports = router;
 