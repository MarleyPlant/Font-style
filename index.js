const { readFileSync } = require('fs-extra')
const { join } = require('path')

const stylesPath = join(__dirname, 'styles.json')
const fontStyles = JSON.parse(readFileSync(stylesPath, 'utf8'))

const getAllFonts = Object.keys(fontStyles)
const resetASCII = '\x1b[0m'
const setColorASCII = '\x1b['
// https://i0.wp.com/davidlozzi.com/wp-content/uploads/2021/03/image-8.png?w=243&ssl=1
const colors = {
    red: "31",
    green: "32
}


const fontStyle = (text, font = 'black-square') => {
    if (!fontStyles.hasOwnProperty(font)) {
        throw new Error(`Invalid font type: ${font}`)
    }
    const fontMapping = Object.fromEntries(
        [...fontStyles[font]].map((char, index) => [String.fromCharCode(65 + index), char])
    )
    return [
        ...text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
    ]
        .map((char) => fontMapping[char] || char)
        .join('')
}

module.exports = {
    fontStyle,
    getAllFonts
}
