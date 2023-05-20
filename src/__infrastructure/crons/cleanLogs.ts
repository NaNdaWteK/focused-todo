import cron from "node-cron";
import fs from "fs";
import path from "path";
import logger from "../_core/adapters/inUse/LoggerInUse";
import config from "../config/default";

const logsDirectory = path.join(process.cwd(), "logs");
const daysInMilliseconds =
  parseInt(config.daysToDeleteLogFiles) * 24 * 60 * 60 * 1000;

export function startCleanLogs() {
  const everyDayAt10 = "0 10 * * *";
  cron.schedule(everyDayAt10, () => {
    deleteOneMonthAgoLogs();
  });
  logger.info("Rotation logs has been started");
}

function deleteOneMonthAgoLogs() {
  logger.info("Deleting old log files");
  const currentDate = new Date();

  fs.readdirSync(logsDirectory).forEach((file) => {
    const filePath = path.join(logsDirectory, file);
    const fileCreationTime = getFileCreationTime(filePath);
    logger.info("File creation time", {
      mayor: currentDate.getTime() - fileCreationTime.getTime(),
      menor: daysInMilliseconds,
    });
    if (isForDelete()) {
      deleteFile(filePath);
    }

    function isForDelete() {
      return (
        currentDate.getTime() - fileCreationTime.getTime() > daysInMilliseconds
      );
    }
  });
}
function getFileCreationTime(filePath: string) {
  const fileStat = fs.statSync(filePath);
  const fileCreationTime = new Date(fileStat.birthtimeMs);
  return fileCreationTime;
}

function deleteFile(filePath: string) {
  fs.unlinkSync(filePath);
  logger.info(`Deleted old log file: ${filePath}`);
}
