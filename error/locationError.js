class LocationError extends Error{
    constructor(error){
        super(error.message)
        this.name="LocationError"
        this.status=402
    }
    getErrorJson(){
        return{
            name:this.name,
            status:this.status,
            message:this.message,
        }
    }
}
module.exports=LocationError;