import env from "./dotEnvConfig/dotEnvConfig";
import { storage } from "../uploads/storage";
import apiError from "./api/apiError";
import { format } from "util";

const bucket = storage.bucket(env.GCLOUD_STORAGE_BUCKET);

export default async function storeImages(files: Array<Express.Multer.File>) {
  let images: string[] = [];
  if (!files) throw new apiError(400, "No image uploaded!");
  for (const image of files) {
    const blob = bucket.file(image.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (error) => {
      throw error;
    });
    blobStream.on("finish", () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      images.push(publicUrl);
      console.log(images);

    });
    blobStream.end(image.buffer);
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    images.push(publicUrl);
  }
  return images;
};