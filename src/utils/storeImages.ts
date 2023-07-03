import env from "./dotEnvConfig/dotEnvConfig";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import apiError from "./api/apiError";
import { Storage } from '@google-cloud/storage';
import { format } from 'util';


let storage: Storage;
let bucket: any;

async function getSecret() {
  const client = new SecretManagerServiceClient();
  const name = 'projects/third-zephyr-391506/secrets/gandarasecret/versions/latest';
  const [version] = await client.accessSecretVersion({ name });
  if (version.payload && version.payload.data) {
    const secretValue = version.payload.data.toString();
    const credentials = JSON.parse(secretValue);
    storage = new Storage({ credentials });
    bucket = storage.bucket(env.GCLOUD_STORAGE_BUCKET);
  } else {
    console.log('Não foi possível acessar o valor do segredo');
  }
}

export default async function storeImages(files: Array<Express.Multer.File>) {
  let images: string[] = [];
  if (!files) throw new apiError(400, "No image uploaded!");
  for (const image of files) {
    const blob = bucket.file(image.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', (error: Error) => {
      throw error;
    });
    blobStream.on('finish', () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      images.push(publicUrl);
      console.log(images);
    });
    blobStream.end(image.buffer);
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    images.push(publicUrl);
  }
  return images;
}

getSecret();