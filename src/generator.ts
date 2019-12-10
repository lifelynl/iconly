import fs from 'fs'
import path from 'path'
import SVGO from 'svgo'

interface Configuration {
    sourceDir: string
    destDir: string
    outputFilename?: string
    beautifyJson?: boolean
    createIconComponents?: boolean
}

export interface IconData {
    size: number[] // NOTE: This should be [number, number] but TS doesn't understand this when re-importing the generated JSON
    sourcePath: string
    fileData: string
}

export interface IconType {
    name: string
    svgs: IconData[]
}

class Iconly {
    private config: Configuration
    private svgo: SVGO
    private counter: number

    public constructor(config: Configuration) {
        this.counter = 0
        this.config = config
        if (this.config.createIconComponents) {
            console.error('ERROR: Creation of Icon components is not supported yet')
            process.exit(1)
        }
        this.svgo = new SVGO({
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
        })
        this.run()
    }

    private async run() {
        const { sourceDir, destDir, outputFilename, beautifyJson } = this.config
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir)
        }
        fs.writeFileSync(
            path.join(`${destDir}/${outputFilename ? outputFilename : 'iconlyData'}.json`),
            JSON.stringify(await this.scanDir(sourceDir), null, beautifyJson ? 4 : 0)
        )
        console.log(
            `Iconly Generator exported ${this.counter} SVG's into [${this.config.destDir}/${
                this.config.outputFilename ? this.config.outputFilename : 'iconlyData'
            }.json]`
        )
    }

    private async scanDir(dir: string) {
        const iconsData: any = {}
        const dirContent = fs.readdirSync(path.resolve(dir))

        for (const entry of dirContent) {
            const entryPath = `${dir}/${entry}`
            const parsingArray = entry.split('_')
            const entryName = this.clean(parsingArray[0].toLowerCase())
            const isDir = fs.lstatSync(entryPath).isDirectory()

            if (isDir) {
                iconsData[`${entryName}Group`] = await this.scanDir(entryPath)
            } else if (path.extname(entry) === '.svg') {
                const svgData = await this.optimizeSVG(fs.readFileSync(entryPath, 'utf8'))

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
                    }
                    this.counter++
                } else {
                    try {
                        iconsData[entryName].svgs.push({
                            sourcePath: entryPath,
                            size: this.getViewboxSize(svgData),
                            fileData: svgData,
                        })
                        this.counter++
                    } catch (err) {
                        throw new Error(err)
                    }
                }
            }
        }
        return iconsData
    }

    private clean(path: string) {
        return path
            .replace(this.config.sourceDir, '')
            .replace(new RegExp('/', 'g'), '')
            .replace(new RegExp(' ', 'g'), '-')
            .replace('.svg', '')
    }

    private async optimizeSVG(svgData: string) {
        const optimized = await this.svgo.optimize(svgData)
        return optimized.data
    }

    private getViewboxSize(svgData: string) {
        const viewboxData = svgData
            .split('viewBox="')[1]
            .split('"')[0]
            .split(' ')
        const width = viewboxData[2]
        const height = viewboxData[3]

        return [parseInt(width, 10), parseInt(height, 10)]
    }
}

// Usage
if (!process.argv[2] || !process.argv[3]) {
    console.error('ERROR: Please supply input- -AND- output- directory as arguments')
    console.error('ts-node iconly-generator.ts [inputDir] [outputDir]')
    process.exit(1)
}
new Iconly({
    sourceDir: process.argv[2],
    destDir: process.argv[3],
    createIconComponents: false,
    beautifyJson: true,
})
