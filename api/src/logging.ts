import * as colours from "colors";

const LEVEL_FORMATS: { [level: string]: string } = {
  info: colours.cyan("[INFO]"),
  error: colours.red("[ERROR]"),
  warn: colours.yellow("[WARN]")
};

type Loggable = string | Array<string | Error> | Error;

function log(level: string, content: Loggable): void {
  if (content instanceof Array) {
    for (let c of content)
      log(level, c);

    return;
  }

  console.log(`${level} ${content}`);
}

export function logInfo(content: Loggable): void {
  log(LEVEL_FORMATS.info, content);
}

export function logError(content: Loggable): void {
  log(LEVEL_FORMATS.error, content);
}

export function logWarn(content: Loggable): void {
  log(LEVEL_FORMATS.warn, content);
}
