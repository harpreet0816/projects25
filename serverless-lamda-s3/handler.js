const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const https = require("https");
const { parse } = require("url");

const s3 = new S3Client({ region: process.env.AWS_REGION });

module.exports.uploadFrameImage = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { frameId, image } = body;

    if (!frameId || !image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing frameId or image" }),
      };
    }

    const buffer = await downloadImage(image);
    const key = `${frameId}.png`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: "image/png",
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Image uploaded successfully",
        url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`,
      }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: err.message }),
    };
  }
};

module.exports.uploadFrameS3Image = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { order_number } = body;

    if (!order_number) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing order_number in payload" }),
      };
    }

    const images = [
      "https://cdn.filestackcontent.com/rotate=deg:exif/crop=d:[0,2291,7922,3343]/border=width:453,color:white/FNvCIUm2QPgUNUnF4uuI",
      "https://cdn.filestackcontent.com/rotate=deg:exif/crop=d:[1878,364,1047,1492]/border=width:176,color:white/mbl4sCkxRBWAMFocn1TQ",
      "https://cdn.filestackcontent.com/rotate=deg:exif/crop=d:[1,730,1309,783]/border=width:111,color:white/ybSpCsx7SBCmZ3rodoa5",
      "https://cdn.filestackcontent.com/rotate=deg:exif/crop=d:[0,148,3949,5629]/border=width:665,color:white/OqIASfqLTo6DldNzVU67",
      "https://cdn.filestackcontent.com/rotate=deg:exif/crop=d:[743,0,3479,4959]/border=width:586,color:white/NjNyoa4nTdqjsoEM9PIN"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const buffer = await downloadImage(randomImage);
    const key = `${order_number}.png`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: "image/png",
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Image uploaded successfully",
        url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      }),
    };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: err.message }),
    };
  }
};

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const parsed = parse(url);
    https
      .get(
        {
          hostname: parsed.hostname,
          path: parsed.path,
          headers: { "User-Agent": "Mozilla/5.0" },
        },
        (res) => {
          const data = [];
          res.on("data", (chunk) => data.push(chunk));
          res.on("end", () => {
            if (res.statusCode === 200) {
              resolve(Buffer.concat(data));
            } else {
              reject(new Error(`Failed to download image: ${res.statusCode}`));
            }
          });
        }
      )
      .on("error", reject);
  });
}