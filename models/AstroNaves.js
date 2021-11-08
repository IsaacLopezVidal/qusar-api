const AstroNave = require('./SatelitesView')
class AstroNaves{
    astroNaves=new Array(AstroNave);
    constructor(data){
        Object.assign(this.astroNaves,data);
    }
}
module.exports=AstroNaves