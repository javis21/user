const login = {
    user: (data)=>{
        return `SELECT email , password FROM users WHERE password='${data.password}' AND email='${data.email}'`
    },

}
module.exports = login;

