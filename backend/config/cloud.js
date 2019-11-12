const cloudinary = require("cloudinary").v2;

const connectCloud = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    console.log("Cloudinary Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectCloud;
