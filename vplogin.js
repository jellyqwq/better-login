// ==UserScript==
// @name         维普毕设登录
// @namespace    http://tampermonkey.net/
// @version      2024-12-06
// @description  try to take over the world!
// @author       You
// 使用match去匹配登录页
// @match        https://vgms.fanyu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fanyu.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @license Copyright Jelly
// ==/UserScript==

(function() {
    'use strict';

    function showTemporaryAlert(message, duration = 2000) {
        // 创建提示框元素
        const alertBox = document.createElement('div');
        alertBox.style.position = 'fixed';
        alertBox.style.top = '50%';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translate(-50%, -50%)';
        alertBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        alertBox.style.color = 'white';
        alertBox.style.padding = '15px 30px';
        alertBox.style.borderRadius = '5px';
        alertBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        alertBox.style.fontSize = '16px';
        alertBox.style.textAlign = 'center';
        alertBox.style.zIndex = '9999';
        alertBox.textContent = message;
    
        // 将提示框添加到页面
        document.body.appendChild(alertBox);
    
        // 设置定时器，指定时间后移除提示框
        setTimeout(() => {
            alertBox.remove();
        }, duration);
    }

    // 创建并显示设置面板
    function createSettingsPanel() {
        const existingPanel = document.getElementById('settingsPanel');
        if (existingPanel) {
            existingPanel.style.display = 'block'; // 如果面板已存在，直接显示
            return;
        }

        // 创建面板容器
        const panel = document.createElement('div');
        panel.id = 'settingsPanel';
        panel.style.position = 'fixed';
        panel.style.top = '50%';
        panel.style.left = '50%';
        panel.style.transform = 'translate(-50%, -50%)';
        panel.style.backgroundColor = '#f8f9fa';
        panel.style.border = '1px solid #dee2e6';
        panel.style.borderRadius = '8px';
        panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        panel.style.padding = '20px';
        panel.style.zIndex = '9999';
        panel.style.width = '300px';

        // 面板内容
        panel.innerHTML = `
            <h3 style="text-align: center; margin-bottom: 20px; color: #343a40;">设置参数</h3>
            <label style="display: block; margin-bottom: 10px;">
                学校ID：<input id="schoolIdInput" type="text" style="width: 100%; padding: 5px; border: 1px solid #ced4da; border-radius: 4px;" value="${GM_getValue('schoolId', '')}">
            </label>
            <label style="display: block; margin-bottom: 10px;">
                用户名：<input id="usernameInput" type="text" style="width: 100%; padding: 5px; border: 1px solid #ced4da; border-radius: 4px;" value="${GM_getValue('username', '')}">
            </label>
            <label style="display: block; margin-bottom: 10px;">
                密码：<input id="passwordInput" type="password" style="width: 100%; padding: 5px; border: 1px solid #ced4da; border-radius: 4px;" value="${GM_getValue('password', '')}">
            </label>
            <div style="text-align: center; margin-top: 20px;">
                <button id="saveSettings" style="background-color: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">保存</button>
                <button id="closePanel" style="background-color: #6c757d; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">关闭</button>
            </div>
        `;

        // 插入到页面中
        document.body.appendChild(panel);

        // 保存按钮事件
        document.getElementById('saveSettings').addEventListener('click', () => {
            const schoolId = document.getElementById('schoolIdInput').value;
            const username = document.getElementById('usernameInput').value;
            const password = document.getElementById('passwordInput').value;

            GM_setValue('schoolId', schoolId);
            GM_setValue('username', username);
            GM_setValue('password', password);

            // 显示自定义弹出框并自动消失
            showTemporaryAlert('参数已保存！', 2000);
        });

        // 关闭按钮事件
        document.getElementById('closePanel').addEventListener('click', () => {
            panel.style.display = 'none'; // 隐藏面板
        });
    }

    // 注册菜单选项
    GM_registerMenuCommand('打开设置面板', createSettingsPanel);
})();


(function() {
    'use strict';

    window.addEventListener("load", function(){
        console.log("网页内容加载完毕")

        // 获取网站域名并执行函数
        if (this.location.href == 'https://vgms.fanyu.com/') {
            // lay-value是学校的代码
            document.querySelector(`dd[lay-value="${GM_getValue("schoolId", 0)}"]`).click();
            // 毕设系统账号
            document.getElementById('username').value = `${GM_getValue('username', 'null')}`;
            // 毕设系统密码
            document.getElementById('password').value = `${GM_getValue('password', 'null')}`;
            document.getElementsByClassName("layui-form-checkbox")[0].click()
            document.getElementsByClassName("bs-login-inputs-button")[0].click()
        }
    });
})();