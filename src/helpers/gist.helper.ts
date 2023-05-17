import githubApi from "config/axios";
import Logger from "config/logger";

export class GistHelper {
  
  static async updateGist(filename: string, content: string): Promise<void> {
    const log = Logger.getInstance().log;
    const body = {
      public: false,
      files: {
        
      }
      
    }
  
    body.files[`${filename}`] = {
      content,
    }
    try {

      await githubApi.post(`/${process.env.GITHUB_GIST_ID}`,JSON.stringify(body))
      log.info(`Gist updated with file ${filename} content`)
    }catch(err) {
      throw err
    }

  }
}