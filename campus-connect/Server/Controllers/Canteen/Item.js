const Item = require("../../Models/Canteen/Item");

exports.create_item = async (req, res) => {

    try{

        const {item_name, category,price} = req.body;

        const old_item = await Item.findOne({item_name: item_name});

        if(old_item){
            return res.status(500).json({
                success: false,
                message: "ITEM IS ALREADY EXISTING.",
            })
        }

        const new_item = await Item.create({
            item_name: item_name,
            category: category,
            price: price
        });

        return res.status(200).json({
            success: true,
            message: "ITEM CREATED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CREATING AN ITEM.",
        })
    }
}