"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var Path = __importStar(require("path"));
var Cmd = __importStar(require("child_process"));
var OS = __importStar(require("os"));
var CompressZip = __importStar(require("compressing"));
var Multipipe = __importStar(require("multipipe"));
var Clicolor = __importStar(require("cli-color"));
var xlsx = __importStar(require("node-xlsx"));
var crypto = __importStar(require("crypto"));
var request_1 = __importDefault(require("request"));
var http = __importStar(require("http"));
var readlineSync = __importStar(require("readline-sync"));
var Tools = /** @class */ (function () {
    function Tools() {
    }
    /** 获取当前位置
     * @description
     * @return {*}  {string}
     * @memberof Tools
     */
    Tools.prototype.getPWD = function () {
        return __dirname;
    };
    /** 系统类型
     * @description
     * @return {*}  {(string | "Windows_NT" | "Linux" | "Darwin")}
     * @memberof Tools
     */
    Tools.prototype.getOSType = function () {
        return OS.type();
    };
    /** 读取文件全部
     * @description
     * @param {string} filePath 文件路径
     * @return {*}  {*}
     * @memberof Tools
     */
    Tools.prototype.readFile = function (filePath) {
        return fs.readFileSync(filePath, { encoding: "utf-8" });
    };
    /** 写入文件
     * @description
     * @param {string} filePath 文件路径
     * @param {*} data
     * @param {string} [mode="w+"]
     * @memberof Tools
     */
    Tools.prototype.writeFile = function (filePath, data, mode) {
        if (mode === void 0) { mode = "w+"; }
        var fd = fs.openSync(filePath, mode);
        fs.writeSync(fd, data, 0, "utf-8");
        fs.closeSync(fd);
    };
    /** 复制文件
     * @description
     * @param {string} src
     * @param {string} dst
     * @memberof Tools
     */
    Tools.prototype.copyFile = function (src, dst) {
        fs.writeFileSync(dst, fs.readFileSync(src));
    };
    /** 追加写入文件
     * @description
     * @param {string} filePath 文件路径
     * @param {*} data 数据
     * @return {*}  {Promise<any>}
     * @memberof Tools
     */
    Tools.prototype.appendFile = function (filePath, data) {
        return new Promise(function (resolve, reject) {
            fs.appendFile(filePath, data, "utf-8", function (e) {
                if (e) {
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /** 判断是否是文件
     * @description
     * @param {string} filePath
     * @return {*}  {Boolean}
     * @memberof Tools
     */
    Tools.prototype.isFile = function (filePath) {
        return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
    };
    /**判断是否是文件夹
     * @description
     * @param {string} filePath
     * @return {*}  {Boolean}
     * @memberof Tools
     */
    Tools.prototype.isDir = function (filePath) {
        return fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory();
    };
    /** 获取文件路径的上一层
     * @description
     * @param {string} filePath
     * @return {*}  {string}
     * @memberof Tools
     */
    Tools.prototype.getParent = function (filePath) {
        return Path.resolve(filePath, "..");
    };
    /** 获取文件夹里的所有文件信息
     * @description
     * @param {string} dirPath
     * @return {*}  {Array<{ path: string; isFile: Boolean }>}
     * @memberof Tools
     */
    Tools.prototype.getDirAllFiles = function (dirPath) {
        var ret = [];
        var readDirInfoSync = function (path) {
            var pa = fs.readdirSync(path);
            pa.forEach(function (ele, index) {
                var tmp = Path.join(path, ele).replace(/\\/g, "/");
                var info = fs.statSync(tmp);
                if (info.isDirectory()) {
                    ret.push({ path: tmp, isFile: false });
                    readDirInfoSync(tmp);
                }
                else {
                    ret.push({ path: tmp, isFile: true });
                }
            });
        };
        readDirInfoSync(dirPath);
        return ret;
    };
    /** 路径不存在就创建
     * @description
     * @param {string} filePath
     * @param {boolean} [isFile=false]
     * @memberof Tools
     */
    Tools.prototype.checkOrCreatePath = function (filePath, isFile) {
        if (isFile === void 0) { isFile = false; }
        var usePath = filePath.replace(/\\/g, "/");
        var pathArr = usePath.split("/");
        var root = pathArr[0];
        var dirArrs = pathArr.slice(1);
        var tmpPath = root;
        for (var i = 0; i < dirArrs.length; i++) {
            tmpPath += "/" + dirArrs[i];
            if (i === dirArrs.length - 1 && isFile) {
                if (!this.isFile(tmpPath)) {
                    var fd = fs.openSync(tmpPath, "w+");
                    fs.closeSync(fd);
                }
            }
            else {
                if (!this.isDir(tmpPath)) {
                    fs.mkdir(tmpPath, function () { });
                }
            }
        }
    };
    /**删除文件或者文件夹
     * @description
     * @param {*} url
     * @memberof Tools
     */
    Tools.prototype.deleteFolderOrFile = function (url) {
        var _this = this;
        if (!fs.existsSync(url)) {
            console.log("路径不存在！", url);
            return;
        }
        if (fs.statSync(url).isDirectory()) {
            fs.readdirSync(url).forEach(function (file) {
                var curPath = Path.join(url, file);
                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    _this.deleteFolderOrFile(curPath);
                }
                else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(url);
        }
        else {
            fs.unlinkSync(url);
        }
    };
    /** 获取文件夹当前层的文件信息，不递归深层信息
     * @description
     * @param {string} filePath
     * @return {*}  {Array<{ path: string; isFile: Boolean }>}
     * @memberof Tools
     */
    Tools.prototype.getDirFiles = function (filePath) {
        var ret = [];
        var pa = fs.readdirSync(filePath);
        pa.forEach(function (ele, index) {
            var tmp = Path.join(filePath, ele);
            var info = fs.statSync(tmp);
            if (info.isDirectory()) {
                ret.push({ path: tmp, isFile: false });
            }
            else {
                ret.push({ path: tmp, isFile: true });
            }
        });
        return ret;
    };
    /** 获取excel表内容
     * @description
     * @param {string} path
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.getExcelContentToJson = function (path) {
        return xlsx.parse(path);
    };
    /** 执行cmd命令，最后才返回输出
     * @description
     * @param {string} cmdstr
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    Tools.prototype.executeCmd = function (cmdstr) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.getOSType() === "Windows_NT") {
                Cmd.exec(cmdstr, function (error, stdout, stderr) {
                    resolve(stdout);
                });
            }
            else {
                Cmd.exec(cmdstr, function (error, stdout, stderr) {
                    resolve(stdout);
                });
            }
        });
    };
    /** 执行cmd，并实时返回输出
     * @description
     * @param {string} cmdstr
     * @param {Array<string>} args
     * @param {(data) => any} [onOutput]
     * @param {(data) => any} [onError]
     * @return {*}  {Promise<void>}
     * @memberof Tools
     */
    Tools.prototype.executeSpawnCmd = function (cmdstr, args, onOutput, onError) {
        return new Promise(function (resolve) {
            var handler = Cmd.spawn(cmdstr, args);
            handler.on("close", function (code) {
                console.log(Clicolor.green("\u6267\u884C\u7ED3\u675F\uFF0C\u8FD4\u56DE\u7801" + code));
                resolve(null);
            });
            handler.stdout.on("data", function (data) {
                console.log("" + data);
                if (onOutput) {
                    onOutput("" + data);
                }
            });
            handler.stderr.on("data", function (data) {
                console.log(Clicolor.red("" + data));
                if (onError) {
                    onError("" + data);
                }
            });
        });
    };
    /** 读取录入
     * @description
     * @param {string} [tips="请输入:"]
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.readUserInput = function (tips) {
        if (tips === void 0) { tips = "请输入:"; }
        return readlineSync.question(tips).trim();
    };
    /** 压缩文件夹
     * @description
     * @param {string} inputDir
     * @param {string} zipPath
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.compressDir = function (inputDir, zipPath) {
        this.checkOrCreatePath(this.getParent(zipPath));
        return new Promise(function (resolve) {
            CompressZip.zip.compressDir(inputDir, zipPath).then(resolve);
        });
    };
    /** 自定义压缩，支持不同位置的文件压缩为相同层级
     * @description
     * @param {Array<string>} inputStream
     * @param {string} zipPath
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.compressStream = function (inputStream, zipPath) {
        this.checkOrCreatePath(this.getParent(zipPath));
        return new Promise(function (resolve) {
            var zipStream = new CompressZip.zip.Stream();
            inputStream.forEach(function (item) {
                zipStream.addEntry(item);
            });
            var destStream = fs.createWriteStream(zipPath);
            Multipipe(zipStream, destStream, resolve);
        });
    };
    /** 解压缩
     * @description
     * @param {string} zipPath
     * @param {string} outDir
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.uncompress = function (zipPath, outDir) {
        return new Promise(function (resolve) {
            CompressZip.zip.uncompress(zipPath, outDir).then(resolve);
        });
    };
    /** 获取文件大小
     * @description
     * @param {string} path
     * @return {*}  {number} byte 单位字节
     * @memberof Tools
     */
    Tools.prototype.getFileSize = function (path) {
        if (this.isFile(path)) {
            return fs.statSync(path).size;
        }
        else {
            return 0;
        }
    };
    /** 获取路径的单纯文件名
     * @description
     * @param {string} filePath
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.getFileName = function (filePath) {
        var ret = Path.basename(filePath);
        var index = ret.indexOf(".");
        if (index === -1) {
            return ret;
        }
        else {
            return ret.substring(0, index);
        }
    };
    /** 获取文件md5
     * @description
     * @param {string} path
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    Tools.prototype.md5File = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var size;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        size = this.getFileSize(path);
                        if (!(size === 0)) return [3 /*break*/, 1];
                        return [2 /*return*/, null];
                    case 1:
                        if (!(size <= 1024 * 1024 * 10)) return [3 /*break*/, 2];
                        //10M小文件
                        return [2 /*return*/, this.md5SmallFile(path)];
                    case 2: return [4 /*yield*/, this.md5BigFile(path)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** 获取常规小文件的md5值
     * @description
     * @param {*} path
     * @return {*}  {string}
     * @memberof Tools
     */
    Tools.prototype.md5SmallFile = function (path) {
        if (!this.isFile(path)) {
            return;
        }
        var data = fs.readFileSync(path);
        return crypto.createHash("md5").update(data, "utf8").digest("hex");
    };
    /** 获取大文件的md5值
     * @description
     * @param {*} path
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    Tools.prototype.md5BigFile = function (path) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.isFile(path)) {
                resolve(null);
                return;
            }
            var stream = fs.createReadStream(path);
            var fshash = crypto.createHash("md5");
            stream.on("data", function (data) {
                fshash.update(data);
            });
            stream.on("end", function () {
                resolve(fshash.digest("hex"));
            });
        });
    };
    Tools.prototype.getDirAllFilesMd5 = function (dirPath) {
        return __awaiter(this, void 0, void 0, function () {
            var allFiles, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.isDir(dirPath)) {
                            return [2 /*return*/, []];
                        }
                        allFiles = this.getDirAllFiles(dirPath);
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < allFiles.length)) return [3 /*break*/, 4];
                        if (!allFiles[i].isFile) return [3 /*break*/, 3];
                        _a = allFiles[i];
                        _b = "md5";
                        return [4 /*yield*/, this.md5File(allFiles[i].path)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, allFiles];
                }
            });
        });
    };
    /** 下载网络资源，并保存
     * @description
     * @param {string} url
     * @param {string} filePath
     * @memberof Creator
     */
    Tools.prototype.downloadFile = function (url, filePath) {
        this.checkOrCreatePath(this.getParent(filePath));
        if (url.startsWith("//cdn")) {
            url = "http:" + url;
        }
        return new Promise(function (resolve, reject) {
            console.log("\u5F00\u59CB\u4E0B\u8F7D\uFF1A" + url);
            (0, request_1.default)(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var stream = fs.createWriteStream(filePath);
                    (0, request_1.default)(url)
                        .pipe(stream)
                        .on("close", function (err) {
                        console.log("\u4E0B\u8F7D\u6210\u529F\uFF1A" + url);
                        resolve("下载成功");
                    });
                }
                else {
                    console.log("\u4E0B\u8F7D\u5931\u8D25\uFF1A" + url);
                    if (error) {
                        reject(error);
                    }
                    else {
                        reject(new Error("下载失败，返回状态码不是200，状态码：" +
                            response.statusCode));
                    }
                }
            });
        });
    };
    /** 延时等待,默认
     * @description 单位秒
     * @param {number} [time=0.01]
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.sleep = function (time) {
        if (time === void 0) { time = 0.01; }
        return new Promise(function (resolve) {
            setTimeout(resolve, time * 1000);
        });
    };
    /** 网络http_post请求
     * @description
     * @param {*} options
     * @param {*} body
     * @return {*}
     * @memberof Tools
     */
    Tools.prototype.http_post = function (options, body) {
        return new Promise(function (resolve, rejects) {
            //发送请求
            var req = http.request(options, function (res) {
                res.setEncoding("utf-8");
                res.on("data", function (chunk) {
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
    };
    Tools.prototype.http_get = function (url, args) {
        if (args) {
            var arr = [];
            for (var key in args) {
                arr.push(key + "=" + args[key]);
            }
            url += "?" + arr.join("&");
        }
        return new Promise(function (resolve, reject) {
            http.get(url, function (res) {
                var err;
                var statusCode = res.statusCode;
                var rawData = "";
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
                res.on("data", function (chunk) {
                    rawData += chunk;
                });
                //监听请求结束
                res.on("end", function () {
                    resolve(rawData);
                });
            }).on("error", function (error) {
                console.log(error);
                reject(false);
            });
        });
    };
    return Tools;
}());
exports.default = new Tools();
