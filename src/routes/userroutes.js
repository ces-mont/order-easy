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
            console.log('UserRoutees--nombre: '+req.params.nombre+' deviceId: '+req.params.deviceid)
            try {
                console.log('init')
                const cli = await Comensales.create({nombre:req.params.nombre,idFcb:req.params.deviceid,estado:'INGRESADO'});
                //console.log('cli: ',cli)
                const user = await Comensales.findOne({where:{idCliente:cli.dataValues.idCliente}})
                let data={idCliente:cli.dataValues.idCliente, llegada:user.llegada}
                console.log('rta: '+JSON.stringify(data))
                res.status(200).send(data)
            } catch (error) {
                console.log('Error: ',error)
                res.statusMessage=error.msj;
                return res.status(error.code||500).send({rta:JSON.stringify(error.mesagge)});
            }
        })
    }
}

module.exports = UsersRoutes;