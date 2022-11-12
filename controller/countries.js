const countryModel = require("../models/countries");

exports.country = async function (req, res) {
    try {
        let country = await countryModel.find({}, 'countryName');

        if(!country){
            return res.status(404).json({
                error: "countries not found"
            })
        }
        return res.status(200).json({
            message: "countries found", country
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: "something went wrong"
        })
    }
  };