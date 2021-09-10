<!--
 * @FileDescription: 
 * @Author: 李永创
 * @Date: 2021-09-10 14:01:39
 * @LastEditors: 李永创
 * @LastEditTime: 2021-09-10 14:37:53
-->
# NodeJsTools
常用的Nodejs开发工具。nodejs+ts+npm

# Install
``` shell
yarn
```
OR
``` shell
npm install
```

## Dependencies

```
yarn add typescript ts-node ts-node-dev @types/node
```
OR
```
npm i typescript ts-node ts-node-dev @types/node
```

## Run

```
npm run build
```
OR

```
yarn build
```
===============
### 其他开发说明
#### package.json
```json
{
  "name": "your project name", // 修改为自己项目的英文名
  "version": "0.0.1", // 版本号，建议从0.0.1开始
  "description": "Please describe your package.", // 描述，写中文可能会有意想不到的异常。
  "main": "dist/index.js", // 入口文件是哪个
  "types": "dist/index.d.ts", // typescript的定义入口文件
  "repository": {
    "type": "git",
    "url": "git+https://github.com/lyctianya/NodeJsTools.git"//自己的仓库地址
  },
  "files": ["dist"] // 要把哪些文件发布到npm上
}
```
### publish 
```
1. 登录
npm adduser  
2. 发布
npm publish
3. 删除
npm unpublish nodejstools --force
```
