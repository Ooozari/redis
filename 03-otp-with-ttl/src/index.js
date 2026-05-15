import Express from "express";
import Redis from "ioredis";

const app = Express();

const PORT = 3000;
const URL = "redis://localhost:6379";
const redis = new Redis(URL);

app.use(Express.json());

const ANNOUNCEMENT_KEY = "app:announcement";
const OTP_EXPIRE = 30;

// helper
function otpKey(phone) {
  return `otp:${phone}`;
}

app.post("/otp", async (req, res) => {
  try {
    const { phone } = req.body;
  const otp = Math.floor(1000000 + Math.random() * 900000).toString();

  // set this in redis
  const redisOTP = await redis.set(otpKey(phone), otp, "EX", OTP_EXPIRE);

  res.json({
    success: true,
    message: `OTP send to ${phone} and expires in ${OTP_EXPIRE}`,
    otp,
  });
  } catch (error) {
    console.error(error);
  }
  
});

app.post("/otp/verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const isKeyExist = await redis.exists(otpKey(phone));

    if(!isKeyExist) {
      return res.json({ success: false, message: "Key does not exist" });
    }

    const savedOTP = await redis.get(otpKey(phone));


    if(savedOTP !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // delete after verification from redis
    await redis.del(otpKey(phone));

    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
  }
});

// get otp ttl - (time to live)
app.get("/otp/:phone/ttl", async (req, res) => {
  try {
    const ttl = await redis.ttl(otpKey(req.params.phone));
    res.json({ ttl });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
