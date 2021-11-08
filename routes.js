const topSecretRoute = require('./routes/topsecretRoute')
const topsecretSplitRoute = require('./routes/topsecretSplitRoute')
const topSecretMiddleware = require('./middleware/topSecret/topsecretMiddleware')
const routes=[
    {
        path:"/topsecret",
        route:topSecretRoute,
        middleware:topSecretMiddleware
    },
    {
        path:"/topsecret_split",
        route:topsecretSplitRoute,
        middleware:topSecretMiddleware
    }
]
module.exports=routes;