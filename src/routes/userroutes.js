const {Router} = require('express');
const {Comensales,start} = require('../model/db');

class UsersRoutes{
    constructor(){
        this.router = Router();
        start();
        this.routes();
    }
    routes(){
        this.router.get('/:nombre/:deviceid',async(req,res)=>{
            try {
                const cli = await Comensales.create({nombre:req.params.nombre,idFcb:req.params.deviceid,estado:'INGRESADO'});
                const user = await Comensales.findOne({where:{idCliente:cli.dataValues.idCliente}})
                res.status(200).send({idCliente:cli.dataValues.idCliente, llegada:user.llegada})
            } catch (error) {
                res.statusMessage=error.msj;
                return res.status(error.code||500).send({rta:JSON.stringify(error.mesagge)});
            }
        })
    }
}

module.exports = UsersRoutes;