module.exports = (sequelize, datatype) =>{
    return sequelize.define('Category' , {
        id:{
            type:datatype.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:datatype.STRING,
            allowNull:false
        }
    })
}