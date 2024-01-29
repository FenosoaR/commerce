//passport jwt :miverifier hoe ilay user connecter ve tena izy am alalany verification anle token
//maka anle donnee ao am le payold amle token hoe miexiste ve ilay email ao anaty bdd

const {User} = require('../models')
const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy 
const ExtractJwt = require('passport-jwt').ExtractJwt //classe ao anty jwt (ahafana maka data ao anaty payload ao anaty token)


//aiza ny toerana ahngalana ilay payload , dia ilay secret kely iny
//ao anaty requete http : data , headers , statuscode,
//ao am partie headers no misy anle token
//extractena ilay token ao am headers
//mila mitovy tsara ao amle login sy register ilay secret

let option = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}

//accessible am alalany ilay payload ilay data napidirina tary am register sy login
//payload mamerina objet
 
passport.use(new JwtStrategy(option , async(payload , done) =>{
    try {
        //payload = {id ,email}
        const user = await User.findOne({where:{email : payload.email}})

        if(user)
           return done(null,user)
            
        return done(null,false)

    } catch (error) {
        console.log(error);

        return done(null,false)
        
    }

}))

// let option = {}
// option.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// option.secretOrKey = 'secret'

// req = data ,status,code,headers = info