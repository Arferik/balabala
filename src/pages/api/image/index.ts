import { randomUUID } from "crypto";
import { type NextApiRequest, type NextApiHandler } from "next";
import formidable, { type Options, type Files } from "formidable";
import path, { join } from "path";
import { mkdir, readdir } from "fs/promises";
/**
 * 处理图片请求
 * @param req
 * @param res
 */

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "1mb",
  },
};

const readFile = (
  req: NextApiRequest,
  imageSavePath: string
): Promise<Files> => {
  const options: Options = {};
  options.encoding = "utf-8";
  options.uploadDir = imageSavePath;
  options.filename = (name, ext, path) =>
    `${randomUUID()}_${path.originalFilename}`;
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
  const { id, type } = req.query;
  if (!id || !type) {
    res.status(400).json({
      success: false,
      message: "参数错误",
    });
    return;
  }
  const imageSavePath = path.join(
    process.cwd(),
    "public",
    "images",
    id as string,
    type as string
  );
  try {
    await readdir(imageSavePath);
  } catch (err) {
    await mkdir(imageSavePath, { recursive: true });
  }
  const files = await readFile(req, imageSavePath);
  const file = files["file"] as formidable.File;
  console.log(file);
  res.json({
    success: true,
    image: join("/", "images", id as string, type as string, file.newFilename),
  });
};

export default handler;
