const express = require("express");
const socket = require("socket.io");
const PlatosRoutes = require('./routes/platosroutes')
const MesasRoutes = require('./routes/mesasroutes')
const UsersRoutes = require("./routes/userroutes")

class Aplicacion {
    constructor(){
        this.app = express();
        this.setPort();
        this.setMiddlewares();
        this.enrutar();
        //this.escuchar = null;
        this.io = null;
    }
    setPort = ()=>{        
        this.app.set('port',process.env.PORT||5000);
    }
    enrutar = ()=>{
        const rutasPlatos = new PlatosRoutes();
        const rutasMesas = new MesasRoutes();
        const rutasUsers = new UsersRoutes()
        this.app.use('/platos',rutasPlatos.router);
        this.app.use('/mesas',rutasMesas.router);
        this.app.use('/clientes',rutasUsers.router)
    }
    setMiddlewares = ()=>{
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json())
        //this.app.use(this.handleCors)
    }
    handleCors = (req,res,next)=>{
        res.set('Access-Control-Allow-Origin','*')
        if(req.method==='OPTIONS' && req.headers['origin'] && req.headers['access-control-request-method']){
            res.set('Access-Control-Allow-Methods','POST,DELETE,UPDATE');
            res.set('Access-Control-Allow-Headers','Content-Type, Authorization');
            res.status(200).send();  
            return;        
        }else{
            next(); 
        }
    }
    /*startServer = ()=>{
        this.escuchar = this.app.listen(this.app.get('port'),()=>{console.log('Escuchando en el puerto->',this.app.get('port'))})
    }*/
    startSocket = ()=>{
        //console.log("socket lanzado")
        this.io = socket(this.app.listen(this.app.get('port'),()=>{
            //console.log('Escuchando en el puerto->',this.app.get('port'))
        }))
        this.io.on('connection', (socket)=>{
            //console.log('Nueva conexion')
        })
    }
}

module.exports = Aplicacion