const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
const path = require("path");
const tc = require("@actions/tool-cache");

async function downloadAndExtractPremake(target_folder) {
  const version = core.getInput("version", { required: true });
  const baseDlPath = `https://github.com/premake/premake-core/releases/download/v${version}`;

  const nodejs_platform = process.platform
  if (nodejs_platform === "win32") {
    const premakeDl = await tc.downloadTool(`${baseDlPath}/premake-${version}-windows.zip`);
    await tc.extractZip(premakeDl, target_folder);
  }
  else if (nodejs_platform === "darwin") {
    const premakeDl = await tc.downloadTool(`${baseDlPath}/premake-${version}-macosx.tar.gz`);
    await tc.extractTar(premakeDl, target_folder);
  }
  else if (nodejs_platform === "linux") {
    console.log(`${baseDlPath}/premake-${version}-linux.tar.gz`);
    const premakeDl = await tc.downloadTool(`${baseDlPath}/premake-${version}-linux.tar.gz`);
    await tc.extractTar(premakeDl, target_folder);
  }
}

async function main() {
  try {
    console.log(`Downloading premake...`);
    const premakePath = path.join(process.env.GITHUB_WORKSPACE, ".premake")
    await downloadAndExtractPremake(premakePath);

    const action = core.getInput("action", { required: true });
    const options = core.getInput("options", { required: false });
    const arguments = core.getInput("args", { required: false });

    const allArgs = [];
    if(options !== '') allArgs.push(options);
    allArgs.push(action);
    if(arguments !== '') allArgs.push(arguments);

    await exec.exec(`${premakePath}/premake5`, allArgs);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main()
