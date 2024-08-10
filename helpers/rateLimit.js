import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 *1000, //15 minutos
    max: 100 //limi each IP to 100 requests for windows
})