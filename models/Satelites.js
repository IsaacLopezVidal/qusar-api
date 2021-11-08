const Satelite = require('./Satelite')
class Satelites {
    satellites=new Array(new Satelite());
    constructor(data){
        Object.assign(this.satellites,data)
    }
}
module.exports=Satelites