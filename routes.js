const topSecretRoute = require('./routes/topsecretRoute')
const {topSecretMiddleware} = require('./middleware/topsecretMiddleware')
const routes=[
    {
        path:"/topsecret",
        route:topSecretRoute,
        middleware:topSecretMiddleware
    }
]
module.exports=routes;