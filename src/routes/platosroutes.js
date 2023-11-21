const {Router} = require('express');
const {Platos,start} = require('../model/db');

class PlatosRoutes{
    constructor(){
        this.router = Router();
        start();
        this.routes();
    }
    routes(){
        this.router.get('/',async(req,res)=>{
            try {
                let platos = await Platos.findAll();
                res.status(200).json({platos})
            } catch (error) {
                res.statusMessage=error.msj;
                return res.status(error.code||500).send();
            }
        })
    }
}

module.exports = PlatosRoutes;