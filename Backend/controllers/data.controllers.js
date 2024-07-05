const Record = require("../schema/data");


const adddata = async (req, res) => {
    try {

        const data = new Record(req.body);
        await data.save();
        res.json(data);
    } catch (error) {
        res.status("Unable to crete");
    }
};

const getdata = async (req, res) => {
    try {
        const data = await Record.find({});
        res.json(data);
    } catch (error) {
        res.status("Unable to fetch data");
    }
};

const update = async (req, res) => {
    try {
        const updatedData = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedData);
    } catch (error) {
        res.status("Unable to update data");
    }
};

const delet=async (req, res) => {
    try {
        const deletedData = await Record.findByIdAndDelete(req.params.id);
        res.json(deletedData);
    } catch (error) {
        res.status("Unable to delete data");
    }
};

module.exports={
    adddata,
    getdata,
    update,
    delet,
 };

