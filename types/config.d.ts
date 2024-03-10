interface Window {
  autocompleteCallback: <T>(res: T) => void;
  CONFIG: Config;
}

interface Config {
  /**
   * this is the delimiter used for the path
   * normally it is a /
   * it used to separate the path
   * for example:
   * g/usernob
   * g means prefix and usernob is the path
   *
   * @type {string}
   */
  commandPathDelimiter: string;

  /**
   * this is the delimiter used for the search
   * normally it is a space
   *
   * @type {string}
   */
  commandSearchDelimiter: string;

  /**
   * this is the template used for the search
   * the format must be:
   * "protocol://hostname/path/?key={}"
   * for example:
   * "https://duckduckgo.com/?q={}"
   *
   * @type {string}
   */
  defaultSearchTemplate: string;

  /**
   * open links in new tab or not
   *
   * @type {boolean}
   */
  openLinksInNewTab: boolean;

  /**
   * limit the number of suggestions
   *
   * @type {number}
   */
  suggestionLimit: number;

  /**
   * this is the list of commands
   *
   * @type {Commands}
   */
  commands: Commands;
}

interface Commands {
  /**
   * this is the command
   * key is the prefix
   * value is the additional data for the command
   *
   * @type {Command}
   */
  [key: string]: Command;
}

interface Command {
  /**
   * this is the name of the command
   *
   * @type {string}
   */
  name: string;

  /**
   * the url of the command
   *
   * @type {string}
   */
  url: string;

  /**
   * this is the template used for the search
   * the format must be:
   * "protocol://hostname/path/?key={}"
   *
   * @type {string}
   */
  searchTemplate?: string;
}
