var appInstance;
var unsubscribeEvent;

var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");

var buildUrl = "Build";
var loaderUrl = buildUrl + "/BearcoinBuild.loader.js";
var config = {
  dataUrl: buildUrl + "/BearcoinBuild.data.br",
  frameworkUrl: buildUrl + "/BearcoinBuild.framework.js.br",
  codeUrl: buildUrl + "/BearcoinBuild.wasm.br",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Bear Clicker",
  productVersion: "1.0"
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
{
  var meta = document.createElement('meta');
    
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    
  document.getElementsByTagName('head')[0].appendChild(meta);
}
  
canvas.style.background = "url('" + buildUrl + "/BearcoinBuild.jpg') center / cover";
loadingBar.style.display = "block";
  
var script = document.createElement("script");
script.src = loaderUrl;
  
script.onload = () => 
{
    createUnityInstance(canvas, config, (progress) => 
    {
      progressBarFull.style.width = 100 * progress + "%";
    }
    ).then((unityInstance) => 
    {
      appInstance = unityInstance;
      
      loadingBar.style.display = "none";
    }
    ).catch((message) => 
    {
      alert(message);
    });
};
  
document.body.appendChild(script);
  
window.addEventListener('load', function ()
{
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  
  console.log("Telegram Web App has been expanded to full screen");
  
  var version = Telegram.WebApp.version;
  var versionFloat = parseFloat(version);
  
  if (versionFloat >= 7.7)
  {
      Telegram.WebApp.disableVerticalSwipes();
          
      console.log('Activating vertical swipe disable');
  }
  
  console.log(`Telegram Web App opened with version: ${version}`);
  console.log(`Telegram Web App checked latest version status with `+
      `result: ${Telegram.WebApp.isVersionAtLeast(version)}`);
});
