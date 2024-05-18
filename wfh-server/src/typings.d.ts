declare namespace NodeJS {
    interface ProcessEnv {
      URI: string;
    }
  }
  

type obj = {
  name: String;
  age: Number;
}

interface apiResponse {
  code: number,
  data:{
    error: any,
    response: any
  }
}