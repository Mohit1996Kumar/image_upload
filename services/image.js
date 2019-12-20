let image_service = require('../models/index').image_upload;


let findImage = (criteria , projection)=>{
    return new Promise((resolve, reject)=>{
        image_service.find(criteria, projection, (err, data)=>{
            if(err)
                reject(err)
            else
                resolve(data)
        })
    })
}

let insertImage = (dataToInsert)=>{
    return new Promise((resolve, reject)=>{
        let data_to_save = new image_service(dataToInsert)
        data_to_save.save(dataToInsert, (err, data)=>{
            if(err)
                reject(err)
            else
                resolve(data)
        })
    })
}

module.exports ={
    findImage : findImage,
    insertImage : insertImage
}
