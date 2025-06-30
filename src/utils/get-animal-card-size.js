const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

// const SMALL_WIDTH = 20 + 10;
const MEDIUM_WIDTH = 35 + 10;
const LARGE_WIDTH = 45 + 10;

export const getAnimalCardSize = (width, height, animalsCount) => {
    const rowsLarge = Math.floor((width - 20) / LARGE_WIDTH);
    const linesLarge = Math.floor(height / LARGE_WIDTH);

    if (rowsLarge * linesLarge > animalsCount) {
        return LARGE;
    }

    const rowsMedium = Math.floor((width - 20) / MEDIUM_WIDTH);
    const linesMedium = Math.floor(height / MEDIUM_WIDTH);

    if (rowsMedium * linesMedium > animalsCount) {
        return MEDIUM;
    }

    return SMALL;
}