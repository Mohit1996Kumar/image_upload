let Joi = require('joi')

let validateBody = (ObjectToValidate, Schema)=>{
    return new Promise((resolve, reject)=>{
        Joi.validate(ObjectToValidate, Schema, (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

module.exports ={
    validateBody : validateBody
}