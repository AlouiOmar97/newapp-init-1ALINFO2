const yup = require('yup')
const validate = async (req,res,next)=>{
try {
    const schema = yup.object().shape({
        pseudo: yup.string().min(3).required(),
        //email: yup.string().email().required()
    })
    await schema.validate(req.body, { abortEarly: false})
    next()
} catch (error) {
    res.json({
        error : error.errors
    })
}
}

module.exports = validate