import fs from 'node:fs';
import path from 'node:path';

interface LogCleanerOptions {
  maxFiles: number;
  logDir: string;
  filePattern: RegExp;
}

class LogCleaner {
  private options: LogCleanerOptions;

  constructor(options: LogCleanerOptions) {
    this.options = options;
  }

  /**
   * 清理超出数量限制的旧日志文件
   */
  async cleanupOldFiles(): Promise<void> {
    try {
      const files = await this.getLogFiles();
      if (files.length <= this.options.maxFiles) {
        return;
      }

      const filesToDelete = files.slice(this.options.maxFiles);
      console.log('filesToDelete:', filesToDelete);
      for (const file of filesToDelete) {
        await this.deleteFile(file);
      }

      console.log(`Cleaned up ${filesToDelete.length} old log files`);
    } catch (error) {
      console.error('Failed to cleanup log files:', error);
    }
  }

  /**
   * 获取所有日志文件并按修改时间排序（最新的在前）
   */
  private async getLogFiles(): Promise<string[]> {
    if (!fs.existsSync(this.options.logDir)) {
      return [];
    }

    const files = fs.readdirSync(this.options.logDir);
    const logFiles = files.filter(
      (file) =>
        this.options.filePattern.test(file) &&
        fs.statSync(path.join(this.options.logDir, file)).isFile(),
    );

    // 按修改时间降序排列（最新的在前）
    return logFiles
      .map((file) => ({
        name: file,
        mtime: fs
          .statSync(path.join(this.options.logDir, file))
          .mtime.getTime(),
      }))
      .sort((a, b) => b.mtime - a.mtime)
      .map((file) => file.name);
  }

  /**
   * 删除单个文件
   */
  private async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(this.options.logDir, filename);
    fs.unlinkSync(filePath);
  }
}

export { LogCleaner };
