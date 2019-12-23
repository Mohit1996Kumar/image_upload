let Joi = require('joi')
let validation = require('../commonFunctions/validate-joi')
let responses = require('../commonFunctions/responses')

let insertImageSchema =async (req, res, next)=>{
    let insertImageSchema = Joi.object({
        location: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        }).required(),
        name: Joi.string().required(),
        file: Joi.any().optional(),
        address: Joi.string().optional()
    })

    try {
        let result = await validation.validateBody(req.body, insertImageSchema)
        if(result)
            next()
    } catch (error) {
        console.log(error);
        responses.sendError(res,error.message)
    }

}

module.exports={
    insertImageSchema : insertImageSchema
}