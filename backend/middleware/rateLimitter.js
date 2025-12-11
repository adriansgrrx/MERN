import ratelimit from "../src/config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit();

        if(!success) {
            return res.status(429).send({
                message: "Too many request. Please try again later"
            })
        } 
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;