const { Router } = require("express")

const router = Router();

router.get("/dashboard", (req, res)=>{
    res.status(200).json({message: "You're viewing Dashboard!"});
});

module.exports = router;