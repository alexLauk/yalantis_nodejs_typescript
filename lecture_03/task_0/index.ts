import * as path from 'path';
import * as fs from 'fs';
import fetch from 'node-fetch';

(async () => {
  try {
    const [filePath] = process.argv.slice(2);
    const dirName = `${path.basename(filePath).replace(/.json/, '')}_pages`;
    const dirPath = path.join(path.resolve(), './task_0', dirName);
    const txtFile = path.join(dirPath, 'file.txt');
    
    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, {});
    }

    await fs.promises.writeFile(txtFile,'');

    const links = JSON.parse(await fs.promises.readFile(filePath, 'utf8')) as [];
    
    links.forEach( async (link: string) => {
      const res = await fetch(link);
      if (res.status !== 200) {
        throw new Error('Data couldn\'t be retrieved');
      }
      const txt = await res.text();
      await fs.promises.appendFile(txtFile, txt)
    });
  } catch (error) {
    console.log(error);
  }
})();
  

