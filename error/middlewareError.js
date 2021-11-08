class MiddlewareError extends Error{
    constructor(){
        super("Ocuurio un error al procesar datos")
        this.name="MiddlewareError"
        this.status=500
    }
    getErrorJson(){
        return{
            name:this.name,
            status:this.status,
            message:this.message,
        }
    }
}
module.exports=MiddlewareError;