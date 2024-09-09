import express from "express"
import { Book } from "../models/bookmodel.js"

const router=express.Router()

router.get("/",async(req,res)=>{
    try {
        const readbook=await Book.find()
        return res.status(200).json({
            count:readbook.length,
            data:readbook
        })
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
})
router.get("/:id",async(req,res)=>{
    const bookid= await Book.findById({_id:req.params.id})
    if(bookid==null){
        return res.status(404).json({message:"No book where found"}) 
    }
    else{
        return res.status(200).json(bookid)
    }
})
router.post("/",async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({message:"send all required fields:Title,Author,PublishYear"})
        }
        const newbook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        const book=await Book.create(newbook)
        return res.status(200).json(book)
    } 
    catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.put("/:id",async(req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(404).send({message:"Send all required feilds:Title,Author,Publish Year"})
        }
        const {id}=req.params
        const result=await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:"Book has been updated"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.delete("/:id",async(req,res)=>{
    try {
        const deletebook= await Book.deleteOne({_id:req.params.id})
        return res.status(200).json({message:"Deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default router