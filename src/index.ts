import * as fs from "fs";
import * as Path from "path";
import * as Cmd from "child_process";
import * as OS from "os";
import * as CompressZip from "compressing";
import * as Multipipe from "multipipe";
import * as Clicolor from "cli-color";
import * as xlsx from "node-xlsx";
import * as crypto from "crypto";
import request from "request";
import AudioLoader from "audio-loader"
import * as http from "http";
import * as readlineSync from "readline-sync"

declare var __dirname: string;

class Tools {
    /** 获取当前位置
     * @description
     * @return {*}  {string}
     * @memberof Tools
     */
    getPWD(): string {
        return __dirname;
    }

    /** 系统类型
     * @description
     * @return {*}  {(string | "Windows_NT" | "Linux" | "Darwin")}
     * @memberof Tools
     */
    getOSType(): string | "Windows_NT" | "Linux" | "Darwin" {
        return OS.type();
    }

    /** 读取文件全部
     * @description
     * @param {string} filePath 文件路径
     * @return {*}  {*}
     * @memberof Tools
     */
    readFile(filePath: string): any {
        return fs.readFileSync(filePath, { encoding: "utf-8" });
    }

    /** 写入文件
     * @description
     * @param {string} filePath 文件路径
     * @param {*} data
     * @param {string} [mode="w+"]
     * @memberof Tools
     */
    writeFile(filePath: string, data: any, mode = "w+") {
        const fd = fs.openSync(filePath, mode);
        fs.writeSync(fd, data, 0, "utf-8");
        fs.closeSync(fd);
    }

    /** 复制文件
     * @description
     * @param {string} src
     * @param {string} dst
     * @memberof Tools
     */
    copyFile(src: string, dst: string) {
        fs.writeFileSync(dst, fs.readFileSync(src));
    }

    /** 追加写入文件
     * @description
     * @param {string} filePath 文件路径
     * @param {*} data 数据
     * @return {*}  {Promise<any>}
     * @memberof Tools
     */
    appendFile(filePath: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.appendFile(filePath, data, "utf-8", (e) => {
                if (e) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /** 判断是否是文件
     * @description
     * @param {string} filePath
     * @return {*}  {Boolean}
     * @memberof Tools
     */
    isFile(filePath: string): Boolean {
        return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
    }

    /**判断是否是文件夹
     * @description
     * @param {string} filePath
     * @return {*}  {Boolean}
     * @memberof Tools
     */
    isDir(filePath: string): Boolean {
        return fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory();
    }

    /** 获取文件路径的上一层
     * @description
     * @param {string} filePath
     * @return {*}  {string}
     * @memberof Tools
     */
    getParent(filePath: string): string {
        return Path.resolve(filePath, "..");
    }

    /** 获取文件夹里的所有文件信息
     * @description
     * @param {string} dirPath
     * @return {*}  {Array<{ path: string; isFile: Boolean }>}
     * @memberof Tools
     */
    getDirAllFiles(
        dirPath: string
    ): Array<{ path: string; isFile: Boolean; md5?: string }> {
        const ret = [];
        const readDirInfoSync = (path) => {
            const pa = fs.readdirSync(path);
            pa.forEach((ele, index) => {
                const tmp = Path.join(path, ele).replace(/\\/g, "/");
                const info = fs.statSync(tmp);
                if (info.isDirectory()) {
                    ret.push({ path: tmp, isFile: false });
                    readDirInfoSync(tmp);
                } else {
                    ret.push({ path: tmp, isFile: true });
                }
            });
        };
        readDirInfoSync(dirPath);
        return ret;
    }

    /** 路径不存在就创建
     * @description
     * @param {string} filePath
     * @param {boolean} [isFile=false]
     * @memberof Tools
     */
    checkOrCreatePath(filePath: string, isFile = false) {
        const usePath = filePath.replace(/\\/g, "/");
        const pathArr = usePath.split("/");
        const root = pathArr[0];
        const dirArrs = pathArr.slice(1);
        let tmpPath = root;
        for (let i = 0; i < dirArrs.length; i++) {
            tmpPath += "/" + dirArrs[i];
            if (i === dirArrs.length - 1 && isFile) {
                if (!this.isFile(tmpPath)) {
                    const fd = fs.openSync(tmpPath, "w+");
                    fs.closeSync(fd);
                }
            } else {
                if (!this.isDir(tmpPath)) {
                    fs.mkdir(tmpPath, () => { });
                }
            }
        }
    }

    /**删除文件或者文件夹
     * @description
     * @param {*} url
     * @memberof Tools
     */
    deleteFolderOrFile(url: string) {
        if (!fs.existsSync(url)) {
            console.log("路径不存在！", url);
            return;
        }
        if (fs.statSync(url).isDirectory()) {
            fs.readdirSync(url).forEach((file) => {
                const curPath = Path.join(url, file);
                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    this.deleteFolderOrFile(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(url);
        } else {
            fs.unlinkSync(url);
        }
    }

    /** 获取文件夹当前层的文件信息，不递归深层信息
     * @description
     * @param {string} filePath
     * @return {*}  {Array<{ path: string; isFile: Boolean }>}
     * @memberof Tools
     */
    getDirFiles(filePath: string): Array<{ path: string; isFile: Boolean }> {
        const ret = [];

        const pa = fs.readdirSync(filePath);
        pa.forEach((ele, index) => {
            const tmp = Path.join(filePath, ele);
            const info = fs.statSync(tmp);
            if (info.isDirectory()) {
                ret.push({ path: tmp, isFile: false });
            } else {
                ret.push({ path: tmp, isFile: true });
            }
        });

        return ret;
    }

    /** 获取excel表内容
     * @description
     * @param {string} path
     * @return {*}
     * @memberof Tools
     */
    getExcelContentToJson(path: string) {
        return xlsx.parse(path);
    }

    /** 执行cmd命令，最后才返回输出
     * @description
     * @param {string} cmdstr
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    executeCmd(cmdstr: string): Promise<string> {
        return new Promise((resolve) => {
            if (this.getOSType() === "Windows_NT") {
                Cmd.exec(cmdstr, (error, stdout, stderr) => {
                    resolve(stdout);
                });
            } else {
                Cmd.exec(cmdstr, (error, stdout, stderr) => {
                    resolve(stdout);
                });
            }
        });
    }

    /** 执行cmd，并实时返回输出
     * @description
     * @param {string} cmdstr
     * @param {Array<string>} args
     * @param {(data) => any} [onOutput]
     * @param {(data) => any} [onError]
     * @return {*}  {Promise<void>}
     * @memberof Tools
     */
    executeSpawnCmd(
        cmdstr: string,
        args: Array<string>,
        onOutput?: (data) => any,
        onError?: (data) => any
    ): Promise<void> {
        return new Promise((resolve) => {
            const handler = Cmd.spawn(cmdstr, args);
            handler.on("close", (code) => {
                console.log(Clicolor.green(`执行结束，返回码${code}`));
                resolve(null);
            });
            handler.stdout.on("data", (data) => {
                console.log(`${data}`);
                if (onOutput) {
                    onOutput(`${data}`);
                }
            });
            handler.stderr.on("data", (data) => {
                console.log(Clicolor.red(`${data}`));
                if (onError) {
                    onError(`${data}`);
                }
            });
        });
    }

    /** 读取录入
     * @description
     * @param {string} [tips="请输入:"]
     * @return {*}
     * @memberof Tools
     */
    readUserInput(tips = "请输入:") {
        return readlineSync.question(tips).trim();
    }
    /** 压缩文件夹
     * @description
     * @param {string} inputDir
     * @param {string} zipPath
     * @return {*}
     * @memberof Tools
     */
    compressDir(inputDir: string, zipPath: string) {
        this.checkOrCreatePath(this.getParent(zipPath));
        return new Promise((resolve) => {
            CompressZip.zip.compressDir(inputDir, zipPath).then(resolve);
        });
    }

    /** 自定义压缩，支持不同位置的文件压缩为相同层级
     * @description
     * @param {Array<string>} inputStream
     * @param {string} zipPath
     * @return {*}
     * @memberof Tools
     */
    compressStream(inputStream: Array<string>, zipPath: string) {
        this.checkOrCreatePath(this.getParent(zipPath));
        return new Promise((resolve) => {
            const zipStream = new CompressZip.zip.Stream();
            inputStream.forEach((item) => {
                zipStream.addEntry(item);
            });
            const destStream = fs.createWriteStream(zipPath);

            Multipipe(zipStream, destStream, resolve);
        });
    }

    /** 解压缩
     * @description
     * @param {string} zipPath
     * @param {string} outDir
     * @return {*}
     * @memberof Tools
     */
    uncompress(zipPath: string, outDir: string) {
        return new Promise((resolve) => {
            CompressZip.zip.uncompress(zipPath, outDir).then(resolve);
        });
    }

    /** 获取文件大小
     * @description
     * @param {string} path
     * @return {*}  {number} byte 单位字节
     * @memberof Tools
     */
    getFileSize(path: string): number {
        if (this.isFile(path)) {
            return fs.statSync(path).size;
        } else {
            return 0;
        }
    }

    /** 获取路径的单纯文件名
     * @description
     * @param {string} filePath
     * @return {*}
     * @memberof Tools
     */
    getFileName(filePath: string) {
        let ret = Path.basename(filePath);
        let index = ret.indexOf(".");
        if (index === -1) {
            return ret;
        } else {
            return ret.substring(0, index);
        }
    }

    /** 获取文件md5
     * @description
     * @param {string} path
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    async md5File(path: string): Promise<string> {
        const size = this.getFileSize(path);
        if (size === 0) {
            return null;
        } else if (size <= 1024 * 1024 * 10) {
            //10M小文件
            return this.md5SmallFile(path);
        } else {
            return await this.md5BigFile(path);
        }
    }

    /** 获取常规小文件的md5值
     * @description
     * @param {*} path
     * @return {*}  {string}
     * @memberof Tools
     */
    md5SmallFile(path): string {
        if (!this.isFile(path)) {
            return;
        }
        const data: any = fs.readFileSync(path);
        return crypto.createHash("md5").update(data, "utf8").digest("hex");
    }

    /** 获取大文件的md5值
     * @description
     * @param {*} path
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    md5BigFile(path): Promise<string> {
        return new Promise((resolve) => {
            if (!this.isFile(path)) {
                resolve(null);
                return;
            }
            const stream = fs.createReadStream(path);
            const fshash = crypto.createHash("md5");
            stream.on("data", (data) => {
                fshash.update(data);
            });
            stream.on("end", () => {
                resolve(fshash.digest("hex"));
            });
        });
    }

    async getDirAllFilesMd5(
        dirPath: string
    ): Promise<Array<{ path: string; isFile: Boolean; md5?: string }>> {
        if (!this.isDir(dirPath)) {
            return [];
        }
        const allFiles = this.getDirAllFiles(dirPath);
        for (let i = 0; i < allFiles.length; i++) {
            if (allFiles[i].isFile) {
                allFiles[i]["md5"] = await this.md5File(allFiles[i].path);
            }
        }
        return allFiles;
    }

    /** 下载网络资源，并保存
     * @description
     * @param {string} url
     * @param {string} filePath
     * @memberof Creator
     */
    downloadFile(url: string, filePath: string): Promise<any> {
        this.checkOrCreatePath(this.getParent(filePath));
        if (url.startsWith("//cdn")) {
            url = "http:" + url;
        }
        return new Promise(function (resolve, reject) {
            console.log(`开始下载：${url}`);
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let stream = fs.createWriteStream(filePath);
                    request(url)
                        .pipe(stream)
                        .on("close", function (err) {
                            console.log(`下载成功：${url}`);
                            resolve("下载成功");
                        });
                } else {
                    console.log(`下载失败：${url}`);
                    if (error) {
                        reject(error);
                    } else {
                        reject(
                            new Error(
                                "下载失败，返回状态码不是200，状态码：" +
                                response.statusCode
                            )
                        );
                    }
                }
            });
        });
    }

    /** 延时等待,默认
     * @description 单位秒
     * @param {number} [time=0.01]
     * @return {*}
     * @memberof Tools
     */
    sleep(time = 0.01) {
        return new Promise((resolve) => {
            setTimeout(resolve, time * 1000);
        });
    }

    /** 网络http_post请求
     * @description
     * @param {*} options
     * @param {*} body
     * @return {*}
     * @memberof Tools
     */
    http_post(
        options: {
            method: string;
            host: string;
            port: string;
            path: string;
            headers?: any;
        },
        body: any
    ) {
        return new Promise((resolve, rejects) => {
            //发送请求
            let req = http.request(options, (res) => {
                res.setEncoding("utf-8");
                res.on("data", (chunk) => {
                    resolve(chunk);
                });
            });

            //监控错误情况时报错
            req.on("error", function (e) {
                rejects(e);
            });

            //写入请求body内容
            req.write(JSON.stringify(body));

            //结束请求输入
            req.end();
        });
    }

    http_get(url: string, args?: any) {
        if (args) {
            let arr = [];
            for (let key in args) {
                arr.push(`${key}=${args[key]}`);
            }
            url += "?" + arr.join("&");
        }
        return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                let err;
                const { statusCode } = res;
                let rawData = "";

                if (statusCode !== 200) {
                    err = new Error("服务器响应失败");
                }
                if (!/application\/json/.test(res.headers["content-type"]))
                    err = new Error("数据格式错误，需要json格式");
                if (err) {
                    console.log(err);
                    //释放内存
                    res.resume();
                    reject(false);
                    return;
                }

                // chunk是16进制BUFFER数据，需要转成字符打印
                res.on("data", (chunk) => {
                    rawData += chunk;
                });

                //监听请求结束
                res.on("end", () => {
                    resolve(rawData);
                });
            }).on("error", (error) => {
                console.log(error);
                reject(false);
            });
        });
    }

    /**
     * @name: 获取npm包最新版本
     * @test: test font
     * @msg: 
     * @param {string} packageName
     * @return {*}
     */
    async getNpmLastVersion(packageName: string): Promise<string> {
        return await this.executeCmd(`npm view ${packageName} version`)
    }

    /** 格式化时间
     * @example
     let date = new Date()
     dateFormat("YYYY-mm-dd HH:MM", date)
     >>> 2019-06-06 19:45`
     * @description
     * @param {string} fmt
     * @param {Date} date
     * @return {*}  {string}
     * @memberof Util
     */
    dateFormat(fmt: string, date: Date): string {
        let ret;
        const opt = {
            'Y+': date.getFullYear().toString(), // 年
            'm+': (date.getMonth() + 1).toString(), // 月
            'd+': date.getDate().toString(), // 日
            'H+': date.getHours().toString(), // 时
            'M+': date.getMinutes().toString(), // 分
            'S+': date.getSeconds().toString(), // 秒
            'Z+': date.getMilliseconds().toString() //毫秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (const k in opt) {
            ret = new RegExp('(' + k + ')').exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
            }
        }
        return fmt;
    }

    /**获取本机ip
     * @description
     * @return {*}
     * @memberof Tools
     */
    getIPAdress() {
        var interfaces = OS.networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }

    /** 获取文件的音频时长(秒)
     * @description
     * @param {string} audioPath
     * @return {*}  {Promise<number>}
     * @memberof Tools
     */
    getAudioTime(audioPath: string): Promise<number> {
        return new Promise((resolve, reject) => {
            if (!this.isFile(audioPath)) {
                reject(0);
            } else {
                AudioLoader(audioPath).then((res) => {
                    resolve(res.duration);
                });
            }
        });
    }

    /** 比对两个版本,av-bv>0 说明av>bv
     * @description
     * @param {string} av
     * @param {string} bv
     * @return {number}
     * @memberof Tools
     */
    compareVersion(av: string, bv: string): number {
        if (av && bv) {
            //将两个版本号拆成数字
            const arr = av.split('.');
            const brr = bv.split('.');
            let ret = 0;
            for (let i = 0; i < Math.max(arr.length, brr.length); i++) {
                if (arr[i] && brr[i]) {
                    if (arr[i] != brr[i]) {
                        return parseInt(arr[i]) - parseInt(brr[i]);
                    }
                } else {
                    return arr[i] ? 1 : -1;
                }
            }
            return 0;
        } else {
            return 0;
        }
    }

    /** 产生一个uuid
     * @description
     * @return {*}
     * @memberof Tools
     */
    generateUUID() {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }
}

export default new Tools();
