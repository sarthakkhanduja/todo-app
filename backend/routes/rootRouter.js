const { Router } = require('express')
const rootRouter = Router()
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')

rootRouter.use('/user', userRouter)
rootRouter.use('/project', projectRouter)

rootRouter.all("*", (req, res) => {
    res.status(200).json({
        message: "This might not be the page you're looking for",
    });
});


module.exports = rootRouter