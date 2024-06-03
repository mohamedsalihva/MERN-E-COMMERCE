const { default: SummaryApi } = require("../common")

const getcategorywiseproduct =async (category)=>{
    const response = await fetch(SummaryApi.categorywiseproduct.url,{
        method:SummaryApi.categorywiseproduct.method,
        headers:{
            "content-type":"application/json"
        },

        body:JSON.stringify({
            category:category
        })
    })
    const dataResponse = await response.json()
    return dataResponse
}
export default getcategorywiseproduct