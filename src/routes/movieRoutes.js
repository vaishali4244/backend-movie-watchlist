const express = require('express');

 const router  = express.Router()

 router.get("/hello",(req, res)=>{
    res.json({httpMethod:"get",
        message:"hello movies"})
 })
 router.post("/hello",(req, res)=>{
    res.json({httpMethod:"post",
        message:"hello movies"})
 })
 router.put("/hello",(req, res)=>{
    res.json({httpMethod:"put",message:"hello movies"})
 })
 router.delete("/hello",(req, res)=>{
    res.json({httpMethod:"delete",
        message:"hello movies"})
 })


 module.exports = router;