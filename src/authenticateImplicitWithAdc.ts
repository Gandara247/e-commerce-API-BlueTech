import { Storage } from "@google-cloud/storage";
import env from "./utils/dotEnvConfig/dotEnvConfig";

const projectId = (env.GCLOUD_PROJECT_ID);


async function authenticateImplicitWithAdc() {
  
  const storage = new Storage({
    projectId,
  });
  const [buckets] = await storage.getBuckets();
  console.log('Buckets:');

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log('Listed all storage buckets.');
}

authenticateImplicitWithAdc();