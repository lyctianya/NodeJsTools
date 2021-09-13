/*
 * @FileDescription: 
 * @Author: 李永创
 * @Date: 2021-09-09 16:18:01
 * @LastEditors: 李永创
 * @LastEditTime: 2021-09-13 15:26:55
 */
import Tools from "./src/index"

(async () => {
  const version = await Tools.getNpmLastVersion("@lyctianya/cmdtools")
  console.log(version)
})()