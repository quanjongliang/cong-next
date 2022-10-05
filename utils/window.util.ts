export const canHandleLocalStorage = ():boolean=>{
    const condition = typeof window !== 'undefined' && window.localStorage
    return condition ? true : false
}