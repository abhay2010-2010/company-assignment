const express = require('express');
const Record = require('../schema/data');

const dataRoutes = express.Router();

dataRoutes.post("/", async (req, res) => {
    try {
        const data = new Record(req.body);
        await data.save();
    } catch (error) {
        res.status("Unable to crete");
    }
});

// dataRoutes.post("/",async(req,res)=>{



// })

dataRoutes.get("/", async (req, res) => {
    try {
        const data = await Record.find({});
        res.json(data);
    } catch (error) {
        res.status("Unable to fetch data");
    }
});

dataRoutes.put("/:id",async(req,res)=>{
    try {
        const updatedData = await Record.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedData);
    } catch (error) {
        res.status("Unable to update data");
    }
});

dataRoutes.delete("/:id",async(req,res)=>{
    try {
        const deletedData = await Record.findByIdAndDelete(req.params.id);
        res.json(deletedData);
    } catch (error) {
        res.status("Unable to delete data");
    }
});

module.exports = dataRoutes;