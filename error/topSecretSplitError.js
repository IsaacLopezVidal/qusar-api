class TopSecretSplitError extends Error{
    constructor(error){
        super(error)
        this.name="TopSecretSplitError"
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
module.exports=TopSecretSplitError;