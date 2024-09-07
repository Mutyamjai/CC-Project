const Item = require("../../Models/Canteen/Item");
const {upload_image} = require("../../Utils/upload_image");

exports.create_item = async (req, res) => {

    try{
        const {item_name, category, price} = req.body;
        const old_item = await Item.findOne({item_name: item_name});

        if(old_item){
            return res.status(500).json({
                success: false,
                message: "ITEM IS ALREADY EXISTING.",
            })
        }
        
        const image = await upload_image(req.files.image , process.env.IMAGE_FOLDER_NAME, 100, 100);

        const new_item = await Item.create({
            item_name: item_name,
            category: category,
            price: price,
            image: image.secure_url
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

exports.get_all_items = async (req, res) => {

    try{
        const all_items = await Item.find({});

        return res.status(200).json({
            success: true,
            all_items: all_items,
            message: "ALL ITEMS FETCHED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING ALL ITEMS.",
        })
    }
}

exports.alter_item_status = async (req, res) => {

    try{
        const {new_status, item_id} = req.body;

        const updated_item = await Item.findByIdAndUpdate(
            item_id,
            {
                status: new_status
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            updated_item: updated_item,
            message: "STATUS UPDATED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE STATUS OF AN ITEM.",
        })
    }
}

exports.get_menu = async (req, res) => {
    try{
        const menu = await Item.find({});

        return res.status(200).json({
            success: true,
            menu: menu,
            message: "MENU FETCHED SUCCESSFULLY."
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING MENU.",
        })
    }
}