import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import NotFoundError from '../exceptions/notFoundError.js';

const errorHandler = (error:{status:string,message:string},req:Request,res:Response,next:NextFunction) =>{
  try{
      console.log(error.status);
      
      if(error instanceof ZodError){
        const validationErrors = error.errors.map(err => err.message);
        let errorMessages = ""
        validationErrors.forEach(element => {
          errorMessages = errorMessages + `${element}, `
        });

        return res.status(501).send({
          code:501,
          data:{error:errorMessages}
        })
      }

      else if (error instanceof NotFoundError) {
        return res.status(404).send({
          code: 404,
          data:{error:error.message}
        });
      }

      else return res.status(500).send({
        code: 500,
       data:{error: "Something went wrong!"}
      })
  }catch(error){
    res.status(501).send({
      code: 500,
      data:{error:  "Something Went Wrong!"}
    });
  }
}

export default errorHandler;