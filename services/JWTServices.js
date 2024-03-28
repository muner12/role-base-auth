const jwt = require("jsonwebtoken");

const {
  REFRESH_SECRET_KEY,
  ACCESS_SECRET_KEY,
} = require("../config/constants");

class JWTServices {
  //sign access token
  static refreshToken(payload, expiry) {
    return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: expiry });
  }
  //sign refresh token
  static accessToken(payload, expiry) {
    return jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: expiry });
  }
  //verify access token
  static verifyAccessToken(token){
    return jwt.verify(token,ACCESS_SECRET_KEY)
  }

  //verify refresh token

  static verifyRefreshToken(token){

    return jwt.verify(token,REFRESH_SECRET_KEY)
  }
}

module.exports=JWTServices