const stockdata = require("../models/stockdata");


exports.stockdata = async function (req, res) {
let name= req.params.id;
console.log(name);
    try {
        let stock = await stockdata.find({Name:name});
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


  exports.stockdataid = async function (req, res) {
    let id= req.params.id;
    console.log('-----',id);
        try {
            let stock = await stockdata.find({Name:id});
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