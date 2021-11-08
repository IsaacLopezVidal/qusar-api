class ValidationError extends Error{
    constructor(error){
        super(error)
        this.name="ValidationError"
        this.status=404
    }
    getErrorJson(){
        return{
            name:this.name,
            status:this.status,
            message:this.message,
        }
    }
}
module.exports=ValidationError;