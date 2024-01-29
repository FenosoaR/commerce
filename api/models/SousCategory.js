module.exports = (sequelize , datatype) =>{
    return sequelize.define('SousCategory' , {
        id : {
            type:datatype.INTEGER,
            autoIncrement : true, 
            primaryKey  :true
        },
        name : {
            type:datatype.STRING,
            allowNull : false
        },
        CategoryId : {
            type:datatype.INTEGER,
            allowNull:false
        }
    })
}