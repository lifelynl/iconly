#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./generator");
new generator_1.IconlyGenerator({
    sourceDir: process.argv[2],
    destDir: process.argv[3],
    createIconComponents: false,
    beautifyJson: true,
});
