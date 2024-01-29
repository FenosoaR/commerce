module.exports = (sequelize , datatype) =>{
    return sequelize.define('Commande' , {
        id : {
            type:datatype.INTEGER,
            primaryKey : true,
            autoIncrement :true
        },
        UserId :{
            type :datatype.INTEGER,
            allowNull :false
        },
        ProductId : {
            type:datatype.INTEGER,
            allowNull:false
        },
        quantite:{
            type:datatype.INTEGER,
            allowNull :false
        },
        addresse_livraison : {
            type : datatype.STRING,
            allowNull : true
        },
        date_livraison : {
            type:datatype.DATE,
            allowNull : true,
        },
        statut: {
            type:datatype.STRING,
            allowNull:true,
        }
    })
}