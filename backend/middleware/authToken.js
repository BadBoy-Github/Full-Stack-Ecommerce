const { jwtVerify } = require('jose')

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token

    console.log("token",token)
    if(!token){
        return res.status(200).json({
            message: "Please Login...!",
            error: true,
            success: false,
        })
    }

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY)
    
    try {
      const { payload } = await jwtVerify(token, secret)
      req.userId = payload._id
      next()
    } catch (err) {
      console.log("Authentication error", err)
      next()
    }

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
