class MessageError extends Error{
    constructor(error){
        super(error)
        this.name="MessageError"
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
module.exports=MessageError;