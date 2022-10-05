export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum CONTENT_TYPE {
  APPLICATION_JSON = "application/json",
  FORM_DATA = "multipart/form-data",
}

export const getErrorMessage = (error:any):string=>{
  return  error?.response?.data?.message || "Có lỗi xảy ra";

}