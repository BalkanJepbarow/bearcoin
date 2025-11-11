var appInstance;
var unsubscribeEvent;

var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");

var buildUrl = "Build";
var loaderUrl = buildUrl + "/de20f721ec32512e2d3005562533ab04.loader.js";
var config = {
  dataUrl: buildUrl + "/9197cea7075e9030e6d115b71a16d711.data.br",
  frameworkUrl: buildUrl + "/e3e003baef4f0861263e94df981e6d3d.framework.js.br",
  codeUrl: buildUrl + "/9c15c9ab39aa928432c9239497a582b6.wasm.br",
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
  
canvas.style.background = "url('" + buildUrl + "/72b758e74c1c23c0d8383c2167633983.jpg') center / cover";
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
