const register = {
      add: (data)=>{
    return `INSERT INTO users
    (id, nom, email, password) VALUES
    (NULL,'${data.nom}', '${data.email}', '${data.password}')`
}
}
module.exports = register;

