export const formatCurrencyVN = (price:number):string=>{
    return price.toLocaleString("it-IT", { style: "currency", currency: "VND" }).replace("VND","đ");
}