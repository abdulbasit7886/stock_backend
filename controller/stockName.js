const stockName = require("../models/stockName");


exports.stock = async function (req, res) {
    try {
        let stock = await stockName.find({},'Name');
        console.log(stock);

        if(!stock){
            return res.status(404).json({
                error: "stock not found"
            })
        }
        return res.status(200).json({
            message: "stock found", stock
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: "something went wrong"
        })
    }
  };
