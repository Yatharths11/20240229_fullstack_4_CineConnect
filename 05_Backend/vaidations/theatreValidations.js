const Users  = require('../schema/users')

function username_exists(username){
    const user = Users.findOne( { username: username } );
   if (user){
    return true
   }else {
    return false;
   }
}

function is_admin(username){
    const user = Users.findOne( { username: username } );
    if( user.role === "admin"){
        return true
    }else{
        return false
    }
}
async function check_user_by_id(id){
    let user = await Users.findById()
    if(!user){
        return false
    }else {
        return true
    }
}

module.exports = {username_exists,is_admin,check_user_by_id}