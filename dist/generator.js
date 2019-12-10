"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const svgo_1 = __importDefault(require("svgo"));
class IconlyGenerator {
    constructor(config) {
        if (!process.argv[2] || !process.argv[3]) {
            logger('+------------------------------------------------------------------+', true);
            logger('| ERROR: Please supply input- -AND- output- directory as arguments |', true);
            logger('|                                                                  |', true);
            logger('|           --> iconly [inputDir] [outputDir] <--                  |', true);
            logger('+------------------------------------------------------------------+', true);
            process.exit(1);
        }
        this.counter = 0;
        this.config = config;
        if (this.config.createIconComponents) {
            logger('ERROR: Creation of Icon components is not supported yet', true);
            process.exit(1);
        }
        this.svgo = new svgo_1.default({
            plugins: [
                {
                    cleanupAttrs: true,
                },
                {
                    removeDoctype: true,
                },
                {
                    removeXMLProcInst: true,
                },
                {
                    removeComments: true,
                },
                {
                    removeMetadata: true,
                },
                {
                    removeXMLNS: true,
                },
                {
                    removeTitle: true,
                },
                {
                    removeDesc: true,
                },
                {
                    removeUselessDefs: true,
                },
                {
                    removeEditorsNSData: true,
                },
                {
                    removeEmptyAttrs: true,
                },
                {
                    removeHiddenElems: true,
                },
                {
                    removeEmptyText: true,
                },
                {
                    removeEmptyContainers: true,
                },
                {
                    removeViewBox: false,
                },
                {
                    cleanupEnableBackground: true,
                },
                {
                    convertStyleToAttrs: true,
                },
                {
                    convertColors: true,
                },
                {
                    convertPathData: true,
                },
                {
                    convertTransform: true,
                },
                {
                    removeUnknownsAndDefaults: true,
                },
                {
                    removeNonInheritableGroupAttrs: true,
                },
                {
                    removeUselessStrokeAndFill: true,
                },
                {
                    removeUnusedNS: true,
                },
                {
                    cleanupIDs: true,
                },
                {
                    cleanupNumericValues: true,
                },
                {
                    moveElemsAttrsToGroup: true,
                },
                {
                    moveGroupAttrsToElems: true,
                },
                {
                    collapseGroups: true,
                },
                {
                    removeRasterImages: false,
                },
                {
                    mergePaths: true,
                },
                {
                    convertShapeToPath: true,
                },
                {
                    sortAttrs: true,
                },
                {
                    removeDimensions: true,
                },
                {
                    removeAttrs: { attrs: '(stroke|fill)' },
                },
            ],
        });
        this.run();
    }
    async run() {
        const { sourceDir, destDir, outputFilename, beautifyJson } = this.config;
        if (!fs_1.default.existsSync(destDir)) {
            fs_1.default.mkdirSync(destDir);
        }
        fs_1.default.writeFileSync(path_1.default.join(`${destDir}/${outputFilename ? outputFilename : 'iconlyData'}.json`), JSON.stringify(await this.scanDir(sourceDir), null, beautifyJson ? 4 : 0));
        logger(`Iconly Generator exported ${this.counter} SVG's into [${this.config.destDir}/${this.config.outputFilename ? this.config.outputFilename : 'iconlyData'}.json]`);
    }
    async scanDir(dir) {
        const iconsData = {};
        const dirContent = fs_1.default.readdirSync(path_1.default.resolve(dir));
        for (const entry of dirContent) {
            const entryPath = `${dir}/${entry}`;
            const parsingArray = entry.split('_');
            const entryName = this.clean(parsingArray[0].toLowerCase());
            const isDir = fs_1.default.lstatSync(entryPath).isDirectory();
            if (isDir) {
                const iconData = await this.scanDir(entryPath);
                if (!iconData) {
                    logger(`Couldn't get data for ${entryPath}`);
                    return process.exit(1);
                }
                iconsData[`${entryName}Group`] = iconData;
            }
            else if (path_1.default.extname(entry) === '.svg') {
                const svgData = await this.optimizeSVG(fs_1.default.readFileSync(entryPath, 'utf8'));
                if (!iconsData[entryName]) {
                    iconsData[entryName] = {
                        name: entryName,
                        svgs: [
                            {
                                sourcePath: entryPath,
                                size: this.getViewboxSize(svgData),
                                fileData: svgData,
                            },
                        ],
                    };
                    this.counter++;
                }
                else {
                    try {
                        const iconData = iconsData[entryName];
                        if (!iconData || !iconData.svgs) {
                            throw new Error('Unexpected empty data');
                        }
                        iconData.svgs.push({
                            sourcePath: entryPath,
                            size: this.getViewboxSize(svgData),
                            fileData: svgData,
                        });
                        this.counter++;
                    }
                    catch (err) {
                        throw new Error(err);
                    }
                }
            }
        }
        return iconsData;
    }
    clean(path) {
        return path
            .replace(this.config.sourceDir, '')
            .replace(new RegExp('/', 'g'), '')
            .replace(new RegExp(' ', 'g'), '-')
            .replace('.svg', '');
    }
    async optimizeSVG(svgData) {
        const optimized = await this.svgo.optimize(svgData);
        return optimized.data;
    }
    getViewboxSize(svgData) {
        const viewboxData = svgData
            .split('viewBox="')[1]
            .split('"')[0]
            .split(' ');
        const width = viewboxData[2];
        const height = viewboxData[3];
        return [parseInt(width, 10), parseInt(height, 10)];
    }
}
exports.IconlyGenerator = IconlyGenerator;
function logger(text, isError) {
    if (isError) {
        // eslint-disable-next-line no-console
        console.error(text);
        return;
    }
    if (process.argv[4] === '-v') {
        // eslint-disable-next-line no-console
        console.log(text);
    }
}
