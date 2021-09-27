import si from 'systeminformation';

class SystemInfo {
  private sysInfo

  constructor() {
    this.sysInfo = si;
  }

  private async getOs() {
    const { platform, arch } = await this.sysInfo.osInfo();
    return { os: { platform, arch } };
  }
  
  private async getUsers() {
    const data = await this.sysInfo.users();
    const users = data.map((user) => {
      return Object.fromEntries(
        Object.entries(user).filter(([key,]) => /user|date|time/.test(key))
      )
    });
    return { users }
  }

  private async getCPU() {
    const { manufacturer, brand, model, cores } = await this.sysInfo.cpu()
    return { cpu: { manufacturer, brand, model, cores }}
  }

  private async getCpuTemp() {
    const { main } = await this.sysInfo.cpuTemperature();
    return { cpuTemperature: main }
  }

  private async getGrafics() {
    const data = await this.sysInfo.graphics();
    const grafics =  data.controllers.map((controller) => {
      return Object.fromEntries(
        Object.entries(controller).filter(([key,]) => /vendor|model/.test(key))
      )
    });
    return { grafics };
  }

  private async getBattery() {
    const { isCharging, percent, timeRemaining } = await this.sysInfo.battery();
    return { battery: { isCharging, percent, timeRemaining } };
  }

  private async getMemory() {
    const mem = await this.sysInfo.mem();
    const memory = Object.fromEntries(
        Object.entries(mem)
          .filter(([key,]) => /^(total|free|used)/.test(key))
          .map(([key, value]) => [key, (+value / (1000 * 1000 * 1000)).toFixed(2)])
      );
    return { memory };
  }

  public async print() {
    const result = { 
      ...await this.getOs(),
      ...await this.getUsers(),
      ...await this.getCPU(),
      ...await this.getCpuTemp(),
      ...await this.getGrafics(),
      ...await this.getBattery(),
      ...await this.getMemory()
    }
    console.log(result);
  } 
}

try {
  const systemInfo = new SystemInfo();
  (async () => {
    const [takt] = process.argv.slice(2).length ? process.argv.slice(2) : [1] ; 
    await systemInfo.print();
    await new Promise(resolve => setInterval(() => resolve(systemInfo.print()), +takt*1000));
  })()
} catch (error) {
  console.log(error);
}
