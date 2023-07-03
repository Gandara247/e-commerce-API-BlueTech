import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { Storage } from '@google-cloud/storage';

async function getSecret() {
    const client = new SecretManagerServiceClient();
    const name = 'projects/third-zephyr-391506/secrets/gandarasecret/versions/latest';
    const [version] = await client.accessSecretVersion({ name });
    if (version.payload && version.payload.data) {
        const secretValue = version.payload.data.toString();
        const credentials = JSON.parse(secretValue);
        const storage = new Storage({ credentials });

        async function listBuckets() {
            const [buckets] = await storage.getBuckets();
            console.log('Buckets:');
            buckets.forEach(bucket => {
                console.log(bucket.name);
            });
        }

        listBuckets();

    } else {
        console.log('Não foi possível acessar o valor do segredo');
    }
}

getSecret();



