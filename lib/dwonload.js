const download = require("download-git-repo");
const colors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
];
module.exports.clone = async function (repo, desc) {
  // const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const spinner = ora("loading").start();
  const timer = setInterval(() => {
    spinner.color = colors[parseInt(Math.random(0, 1) * 8)];
    spinner.text = "项目初始化中";
  }, 1000);
  return new Promise((resolve, reject) => {
    download(repo, desc, { clone: true }, function (err) {
      if (err) {
        spinner.fail("初始化失败！！！", err);
        reject();
      } else {
        spinner.succeed("初始化成功！！！");
        resolve();
      }
      clearInterval(timer);
    });
  });
};
