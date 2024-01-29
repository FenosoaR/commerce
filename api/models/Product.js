module.exports = (sequelize, datatype) =>{
    return sequelize.define('Product' , {
        id:{
            type:datatype.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:datatype.STRING,
            allowNull:false
        }, 
        desc:{
            type:datatype.STRING,
            allowNull:false
        },
        price : {
            type:datatype.STRING,
            allowNull:false
        }, 
        image_1:{
            type:datatype.STRING,
            allowNull:false
        },
        image_2:{
            type:datatype.STRING,
            allowNull:false
        },
        image_3:{
            type:datatype.STRING,
            allowNull:false
        }, 
        color : {
            type:datatype.STRING,
            allowNull:false
        },
        stock : {
            type:datatype.INTEGER,
            allowNull:false
        },
        size:{
            type:datatype.STRING,
            allowNull:true
        },
    })
}