// ==UserScript==
// @name         免登录城通网盘直链快速下载 精简页面
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  全网首发城通网盘免登录直链快速下载插件 有什么问题请在评论里说
// @author       ddpp
// @match        *://*/*
// @icon         https://webapi.ctfile.com/assets/img/favicons/mstile-150x150.png
// @license MIT
 
// ==/UserScript==
/* globals file_id */
(function () {
  "use strict";
 
function waitForKeyElements(selectorOrFunction, callback, waitOnce, interval, maxIntervals) {
    if (typeof waitOnce === "undefined") {
        waitOnce = true;
    }
    if (typeof interval === "undefined") {
        interval = 300;
    }
    if (typeof maxIntervals === "undefined") {
        maxIntervals = -1;
    }
    var targetNodes = (typeof selectorOrFunction === "function")
            ? selectorOrFunction()
            : document.querySelectorAll(selectorOrFunction);
 
    var targetsFound = targetNodes && targetNodes.length > 0;
    if (targetsFound) {
        targetNodes.forEach(function(targetNode) {
            var attrAlreadyFound = "data-userscript-alreadyFound";
            var alreadyFound = targetNode.getAttribute(attrAlreadyFound) || false;
            if (!alreadyFound) {
                var cancelFound = callback(targetNode);
                if (cancelFound) {
                    targetsFound = false;
                }
                else {
                    targetNode.setAttribute(attrAlreadyFound, true);
                }
            }
        });
    }
 
    if (maxIntervals !== 0 && !(targetsFound && waitOnce)) {
        maxIntervals -= 1;
        setTimeout(function() {
            waitForKeyElements(selectorOrFunction, callback, waitOnce, interval, maxIntervals);
        }, interval);
    }
}
 
  //当检测为下载界面时执行的代码
  if (window.location.pathname.split("/")[1].indexOf("f") == 0) {
    //显示VIP下载
    function vipdown() {
      document.getElementsByClassName("card-deck")[0].style.display = "block";
      document.getElementsByClassName("card-deck")[1].style.display = "none";
    }
    //隐藏购买VIP
    waitForKeyElements(' [class="card-deck"]', vipdown);
    function buyvip() {
      document.getElementsByClassName("row no-gutters")[1].style.display =
        "none";
    }
    waitForKeyElements(' [class="row no-gutters"]', buyvip);
    //隐藏广告
    function webad() {
      document.getElementsByClassName("card bg-light mb-3")[2].style.display =
        "none";
    }
    waitForKeyElements(' [class="card bg-light mb-3"]', webad);
    //对于一些不支持的功能进行隐藏
    function notsupport() {
      document.getElementsByClassName("mb-3")[1].style.display = "none";
    }
    waitForKeyElements(' [class="mb-3"]', notsupport);
 
    function Download(content) {
      var eleLink = document.createElement("a");
      eleLink.style.display = "none";
      eleLink.href = content;
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    }
    //重写下载按钮
    function dxdown() {
      document.getElementsByClassName(
        "btn btn-outline-secondary fs-1 mt-3"
      )[0].onclick = function dxdown() {
        var downurl = "https://apid1.ctfile.workers.dev/电信/?file=" + file_id;
        Download(downurl);
      };
    }
    waitForKeyElements(
      ' [class="btn btn-outline-secondary fs-1 mt-3"]',
      dxdown
    );
    function ltdown() {
      document.getElementsByClassName(
        "btn btn-outline-info fs-1 mt-3"
      )[0].onclick = function ltdown() {
        var downurl = "https://apid1.ctfile.workers.dev/联通/?file=" + file_id;
        Download(downurl);
      };
    }
    waitForKeyElements(' [class="btn btn-outline-info fs-1 mt-3"]', ltdown);
    function yddown() {
      document.getElementsByClassName(
        "btn btn-outline-dark fs-1 mt-3"
      )[0].onclick = function yddown() {
        var downurl = "https://apid1.ctfile.workers.dev/移动/?file=" + file_id;
        Download(downurl);
      };
    }
    waitForKeyElements(' [class="btn btn-outline-dark fs-1 mt-3"]', yddown);
    //隐藏推广搜索按钮
    function searchad() {
      document.getElementsByClassName("nav-item")[0].style.display = "none";
    }
    waitForKeyElements(' [class="nav-item"]', searchad);
  }
  //当检测为目录界面时执行的代码
  if (window.location.pathname.split("/")[1].indexOf("d") == 0) {
    //隐藏网站广告
    function webad() {
      document.getElementsByClassName("card bg-light mb-3")[1].style.display =
        "none";
    }
    waitForKeyElements(' [class="card bg-light mb-3"]', webad);
    //对于一些不支持的功能进行隐藏或提示
    function notsupport() {
      document.getElementsByClassName(
        "btn btn-falcon-default mr-2"
      )[2].style.display = "none";
      document.getElementsByClassName(
        "btn btn-falcon-default mr-2"
      )[3].style.display = "none";
      document.getElementsByClassName(
        "btn btn-falcon-default mr-2"
      )[5].style.display = "none";
      document.getElementsByClassName(
        "btn btn-falcon-default mr-2"
      )[4].onclick = function down() {
        alert(
          "很抱歉 此功能暂时无法实现 因为本脚本使用的是cloudflare workers进行解析 访问较慢且较难实现"
        );
      };
    }
    waitForKeyElements(' [id="dashboard-actions"]', notsupport);
    //隐藏推广搜索按钮
    function searchad() {
      document.getElementsByClassName("nav-item")[0].style.display = "none";
    }
    waitForKeyElements(' [class="nav-item"]', searchad);
  }
})();
