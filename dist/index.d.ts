declare class Tools {
    /** 获取当前位置
     * @description
     * @return {*}  {string}
     * @memberof Tools
     */
    getPWD(): string;
    /** 系统类型
     * @description
     * @return {*}  {(string | "Windows_NT" | "Linux" | "Darwin")}
     * @memberof Tools
     */
    getOSType(): string | "Windows_NT" | "Linux" | "Darwin";
    /** 读取文件全部
     * @description
     * @param {string} filePath 文件路径
     * @return {*}  {*}
     * @memberof Tools
     */
    readFile(filePath: string): any;
    /** 写入文件
     * @description
     * @param {string} filePath 文件路径
     * @param {*} data
     * @param {string} [mode="w+"]
     * @memberof Tools
     */
    writeFile(filePath: string, data: any, mode?: string): void;
    /** 复制文件
     * @description
     * @param {string} src
     * @param {string} dst
     * @memberof Tools
     */
    copyFile(src: string, dst: string): void;
    /** 追加写入文件
     * @description
     * @param {string} filePath 文件路径
     * @param {*} data 数据
     * @return {*}  {Promise<any>}
     * @memberof Tools
     */
    appendFile(filePath: string, data: any): Promise<any>;
    /** 判断是否是文件
     * @description
     * @param {string} filePath
     * @return {*}  {Boolean}
     * @memberof Tools
     */
    isFile(filePath: string): Boolean;
    /**判断是否是文件夹
     * @description
     * @param {string} filePath
     * @return {*}  {Boolean}
     * @memberof Tools
     */
    isDir(filePath: string): Boolean;
    /** 获取文件路径的上一层
     * @description
     * @param {string} filePath
     * @return {*}  {string}
     * @memberof Tools
     */
    getParent(filePath: string): string;
    /** 获取文件夹里的所有文件信息
     * @description
     * @param {string} dirPath
     * @return {*}  {Array<{ path: string; isFile: Boolean }>}
     * @memberof Tools
     */
    getDirAllFiles(dirPath: string): Array<{
        path: string;
        isFile: Boolean;
        md5?: string;
    }>;
    /** 路径不存在就创建
     * @description
     * @param {string} filePath
     * @param {boolean} [isFile=false]
     * @memberof Tools
     */
    checkOrCreatePath(filePath: string, isFile?: boolean): void;
    /**删除文件或者文件夹
     * @description
     * @param {*} url
     * @memberof Tools
     */
    deleteFolderOrFile(url: string): void;
    /** 获取文件夹当前层的文件信息，不递归深层信息
     * @description
     * @param {string} filePath
     * @return {*}  {Array<{ path: string; isFile: Boolean }>}
     * @memberof Tools
     */
    getDirFiles(filePath: string): Array<{
        path: string;
        isFile: Boolean;
    }>;
    /** 获取excel表内容
     * @description
     * @param {string} path
     * @return {*}
     * @memberof Tools
     */
    getExcelContentToJson(path: string): any;
    /** 执行cmd命令，最后才返回输出
     * @description
     * @param {string} cmdstr
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    executeCmd(cmdstr: string): Promise<string>;
    /** 执行cmd，并实时返回输出
     * @description
     * @param {string} cmdstr
     * @param {Array<string>} args
     * @param {(data) => any} [onOutput]
     * @param {(data) => any} [onError]
     * @return {*}  {Promise<void>}
     * @memberof Tools
     */
    executeSpawnCmd(cmdstr: string, args: Array<string>, onOutput?: (data: any) => any, onError?: (data: any) => any): Promise<void>;
    /** 读取录入
     * @description
     * @param {string} [tips="请输入:"]
     * @return {*}
     * @memberof Tools
     */
    readUserInput(tips?: string): any;
    /** 压缩文件夹
     * @description
     * @param {string} inputDir
     * @param {string} zipPath
     * @return {*}
     * @memberof Tools
     */
    compressDir(inputDir: string, zipPath: string): Promise<unknown>;
    /** 自定义压缩，支持不同位置的文件压缩为相同层级
     * @description
     * @param {Array<string>} inputStream
     * @param {string} zipPath
     * @return {*}
     * @memberof Tools
     */
    compressStream(inputStream: Array<string>, zipPath: string): Promise<unknown>;
    /** 解压缩
     * @description
     * @param {string} zipPath
     * @param {string} outDir
     * @return {*}
     * @memberof Tools
     */
    uncompress(zipPath: string, outDir: string): Promise<unknown>;
    /** 获取文件大小
     * @description
     * @param {string} path
     * @return {*}  {number} byte 单位字节
     * @memberof Tools
     */
    getFileSize(path: string): number;
    /** 获取路径的单纯文件名
     * @description
     * @param {string} filePath
     * @return {*}
     * @memberof Tools
     */
    getFileName(filePath: string): string;
    /** 获取文件md5
     * @description
     * @param {string} path
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    md5File(path: string): Promise<string>;
    /** 获取常规小文件的md5值
     * @description
     * @param {*} path
     * @return {*}  {string}
     * @memberof Tools
     */
    md5SmallFile(path: any): string;
    /** 获取大文件的md5值
     * @description
     * @param {*} path
     * @return {*}  {Promise<string>}
     * @memberof Tools
     */
    md5BigFile(path: any): Promise<string>;
    getDirAllFilesMd5(dirPath: string): Promise<Array<{
        path: string;
        isFile: Boolean;
        md5?: string;
    }>>;
    /** 下载网络资源，并保存
     * @description
     * @param {string} url
     * @param {string} filePath
     * @memberof Creator
     */
    downloadFile(url: string, filePath: string): Promise<any>;
    /** 延时等待,默认
     * @description 单位秒
     * @param {number} [time=0.01]
     * @return {*}
     * @memberof Tools
     */
    sleep(time?: number): Promise<unknown>;
    /** 网络http_post请求
     * @description
     * @param {*} options
     * @param {*} body
     * @return {*}
     * @memberof Tools
     */
    http_post(options: {
        method: string;
        host: string;
        port: string;
        path: string;
        headers?: any;
    }, body: any): Promise<unknown>;
    http_get(url: string, args?: any): Promise<unknown>;
}
declare const _default: Tools;
export default _default;
