const {pool,createPoolAndEnsureSchema,astroNaves:AstroNaveItems} = require('../config/db')
const AstroNaves = require('../models/AstroNaves')
const LocationError = require('../error/locationError')
const Position = require('../models/Posicion')
let {astroNaves:_astroNaves}=AstroNaveItems;

function lineFromPoints(P, Q)
{
    var a = Q[1] - P[1]
    var b = P[0] - Q[0]
    var c = a*(P[0]) + b*(P[1])
 
    if (b < 0)
        console.log("The line passing through " +
                       "points P and Q is:  " + a +
                       "x - " + b + "y = " + c + "<br>")
    else
        console.log("The line passing through " +
                       "points P and Q is:  "+ a + 
                       "x + " + b + "y = " + c + "<br>")
}

// var P = [ null,null  ]
// var Q = [ 7, -3 ]
 
// lineFromPoints(P, Q)

async function GetLocation(distances=[]){
    if(!_astroNaves.length){
        pool = pool || await createPoolAndEnsureSchema();
        const result =  await pool.query(` SELECT name,x,y FROM astro_naves; `);
        console.log("",result)
        const {astroNaves} = new AstroNaves(result)
        _astroNaves=astroNaves;
    }
    console.log("_astroNaves",_astroNaves)
    return new Position(1,2)
}
module.exports=GetLocation;