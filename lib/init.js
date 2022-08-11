const clear = require("clear");
const chalk = require("chalk");

const inquirer = require("inquirer");

const pg = require("../package.json");
const { clone } = require("../lib/dwonload.js");
const log = (content) => console.log(chalk.green(content));

// 输出流可以引入到主进程输出流
const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  clear();
  log(`${pg.name}: ${pg.version}`);
  console.log(
    chalk.gray(`
    欢迎使用${pg.name}脚手架
    ${chalk.red("开发不易，帮忙点个start吧")}
  `)
  );
  try {
    const answer = await inquirer.prompt({
      type: "rawlist",
      name: "db",
      message: "请选择数据库类型",
      choices: ["mySql", "mongo"],
    });
    log("创建项目", name);
    if (answer.db === "mySql") {
      await clone(
        "direct:https://gitee.com/yeshaojun/koa-service-template.git#main",
        name
      );
    } else {
      await clone(
        "direct:https://gitee.com/yeshaojun/koa-service-template.git#mongodb",
        name
      );
    }

    log("安装依赖中，请稍后");
    const cmd = process.platform === "win32" ? "npm.cmd" : "npm";
    await spawn(cmd, ["install"], { cwd: `./${name}` });

    log(
      chalk.green(`
        安装完成：
        ==============
        cd ${name}
        npm run serve
    `)
    );
  } catch (error) {}
};
