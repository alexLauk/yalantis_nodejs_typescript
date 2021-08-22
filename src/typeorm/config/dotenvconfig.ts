import * as path from 'path';

const env = process.env.NODE_ENV || 'dev';
const p = path.join(process.cwd(), `env/${env}.env`);
console.log(`Loading environment from ${p}`);
const dotEnvOptions = { path: p };

export default dotEnvOptions;
