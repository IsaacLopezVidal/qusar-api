let {pool,createPoolAndEnsureSchema} = require('../config/db')
const AstroNaves = require('../models/AstroNaves')
const LocationError = require('../error/locationError')
const Position = require('../models/Posicion')


const GetDistanceTwoDots =({x:x1,y:y1}, {x:x2,y:y2}) => (Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)).toFixed(2))


async function GetLocation(distances=[]){
    if(!distances.length) throw(new LocationError("No hay distancias a evaluar"))
    const astroNaves = await GetAstroNaves()
    const Nave = astroNaves.find(e=>e.name === "nave")
    let NumeroConcidencias=0;
    astroNaves.filter(e=>e.name !== Nave.name ).forEach(e=>{
        let distancia=GetDistanceTwoDots(Nave,e)
        if(distances.findIndex(e=>e === distancia)!==-1){
            NumeroConcidencias++;
        }
    });
    if(NumeroConcidencias!==distances.length)throw (new LocationError("No es posible encontrar la posición"))
    return new Position(Nave.x,Nave.y)
}
async function GetAstroNaves(){
    pool = pool || (await createPoolAndEnsureSchema());
    const result =  await pool.query(` SELECT name,x,y FROM astro_naves; `);
    const strJson=JSON.stringify(result);
    const {astroNaves} = new AstroNaves(JSON.parse(strJson))
    return astroNaves;
}
module.exports=GetLocation;