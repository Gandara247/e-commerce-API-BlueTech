import env from "./dotEnvConfig/dotEnvConfig";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import apiError from "./api/apiError";
import { Storage } from '@google-cloud/storage';
import { format } from 'util';

const credentials = JSON.parse(env.GOOGLE_CREDENTIALS);
const client = new SecretManagerServiceClient({ credentials });
const storage = new Storage({ credentials });
let bucket: any;

async function getSecret() {
  const name = 'projects/311537062777/secrets/gandarasecret/versions/latest';
  const [version] = await client.accessSecretVersion({ name });
  if (version.payload && version.payload.data) {
    const secretValue = version.payload.data.toString();
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

async function main() {
  await getSecret();
  // call storeImages function here
}

main();

export { storage };

