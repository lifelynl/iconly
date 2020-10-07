interface Configuration {
    sourceDir: string;
    destDir: string;
    outputFilename?: string;
    beautifyJson?: boolean;
    createIconComponents?: boolean;
}
interface IconSize {
    width: number;
    height?: number;
}
export declare type IconSizeType = number | number[] | IconSize;
export interface IconData {
    size: number[];
    sourcePath: string;
    fileData: string;
}
export interface IconType {
    name?: string;
    svgs?: IconData[];
}
export declare class IconlyGenerator {
    private config;
    private svgo;
    private counter;
    constructor(config: Configuration);
    private run;
    private scanDir;
    private clean;
    private optimizeSVG;
    private getViewboxSize;
}
export {};
