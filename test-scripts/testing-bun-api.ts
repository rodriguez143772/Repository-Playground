import type { Path } from "typescript";

const testFilePath = "test-outputs/test-script.json"
const dataToWrite = {  name: "topic", value: "Test"  };

async function writeJsonFile(path: string, data: unknown): Promise<void> {
    // TODO: Implement using Bun.write()
    // Hint: Use JSON.stringify(data, null, 2) for pretty formatting

     
    Bun.write(testFilePath, JSON.stringify(dataToWrite)); 
    
  }

await writeJsonFile(testFilePath, dataToWrite);
