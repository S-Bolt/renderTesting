const router = require("express").Router();
const { solutions, getSolutions} = require("../soultionsControllers");

router.get("/solutions",withAuth,async(req,res)=>{
    try{
        res.render("solutions",)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
