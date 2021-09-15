import * as path from 'path';
import * as fs from 'fs/promises';
import fetch from 'node-fetch';

(async function () {
  try {
    const [filePath] = process.argv.slice(2);
    console.log(process.argv)
    const file = path.basename(filePath).replace(/(?<=.)\w+/, ''); //X(?=Y) //(?<=Y)X // /\w+(?=.)/
    console.log(file);
    
    // const file = path.join(path.resolve(),'./', file));
    // await fs.mkdir(path.join(path.resolve(), '/test'), {});
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
    console.log(data[0]);

    const res = await fetch(data[0]);
    const body = await res.text()
    // console.log(body);
    
  } catch (error) {
      console.log(error);
  }
   
})();
  

