const { parseString } = require("fast-csv");
const stockdata = require("../models/stockdata");


exports.stockdata = async function (req, res) {
let name= req.params.id;
console.log(name);
    try {
        let stock = await stockdata.find({Name:name});

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
      exports.stockdatagraph = async function (req, res) {
        let id= req.params.id;
        console.log('-----',id);
            try {
                let stock = await stockdata.find({Name:id}).limit(100);
                let x=[];
                let y=[];
                

                for (let i=0 ; i<stock.length;i++){
                    x[i]=stock[i].High
                    y[i]=stock[i].Date

                }
        
                if(!stock){
                    return res.status(404).json({
                        error: "stock not found"
                    })
                }
                return res.status(200).json({
                    message: "stock found", stock,x,y   
                })
            } catch (err) {
                console.log(err);
                return res.status(401).json({
                    error: "something went wrong"
                })
            }
          };