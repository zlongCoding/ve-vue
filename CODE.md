因为使用的eslint 所以这里为了更好的开发，建议同一环境，使用vscode...
vscode使用的插件：
> eslint vetur
这里需要配置一下eslint插件，配置如下:
```
 "eslint.runtime": "",
    "eslint.nodePath": "",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html"
    ],
    "eslint.workingDirectories": [],
    "eslint.codeAction.disableRuleComment": {
        "enable": true,
        "location": "separateLine"
    },
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```
然后就可以了。