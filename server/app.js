const express=require('express');
const app= express()
const port=3000

app.get('/',(req,res)=>{
    res.send({name: "naveen",
age: 24})
});

app.listen(port,()=>{
    console.log("app listing on port test",port)
})