
//either allow the user to continue or give error message regarding fai
export const validateRequest = (schema) =>{
return (req,res,next)=>{
    const result = schema.safeParse(req.body);

    if(!result.success){
        const formatted = result.error.format();
        console.log(formatted) //{
//   _errors: [],
//   status: {
//     _errors: [ 'Status must be one of PLANNED, COMPLETED, WATCHING, DROPPED' ]
//   }
// }

const flatErrors = Object.values(formatted)
.flat()
.filter(Boolean)
.map((err)=>err._errors)
.flat();
        // const errorMessages = result.error?.errors?.map((err)=>err.message)
        // console.log(errorMessages)
         const error = flatErrors?.join(", ")
        return res.status(400).json({message:error})
    }

    next();
}
}