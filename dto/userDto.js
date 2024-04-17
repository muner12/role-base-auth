class UserDTO{
    constructor(user){
        
        this._id=user._id;
        this.username=user.username;
        this.email=user.email;
        this.phone=user.phone;
        this.roles=user.roles
    }
}

module.exports=UserDTO