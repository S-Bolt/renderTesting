const router = require("express").Router();
const { solutions, getSolutions} = require("../soultionsControllers");

router.get("/solutions",withAuth,async(req,res)=>{
    try{
        res.render("solutions",)
    });

module.exports = router;
