import { IconlyGenerator } from './generator'

new IconlyGenerator({
    sourceDir: process.argv[2],
    destDir: process.argv[3],
    createIconComponents: false,
    beautifyJson: true,
})

console.log('testing')
