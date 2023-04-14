/**
 * 处理图片请求
 * @param req
 * @param res
 */
import { type NextApiRequest, type NextApiHandler } from "next";
import formidable, { type Options } from "formidable";
import path from "path";
import { mkdir, readdir } from "fs/promises";
export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "1mb",
  },
};

const readFile = (req: NextApiRequest) => {
  const options: Options = {};
  options.encoding = "utf-8";
  options.uploadDir = path.join(process.cwd(), "public", "images");
  options.filename = (name, ext, path) =>
    `${Date.now().toString()}_${path.originalFilename}`;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
};
const handler: NextApiHandler = async (req, res) => {
  try {
    console.log("req.body=====>", req.query);
    await readdir(path.join(process.cwd(), "public", "images"));
  } catch (err) {
    await mkdir(path.join(process.cwd(), "public", "images"));
  }
  await readFile(req);
  res.json({
    success: true,
  });
};

export default handler;
