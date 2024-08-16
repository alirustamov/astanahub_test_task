// export const displayArray = (str) => {
//     return `${str.reduce((acc, cur) => `${acc}${cur}`, '')}`;
// }

// Array.prototype.displayArray = () => {
//     console.log(this);
//     return `${this.reduce((acc, cur) => `${acc}${cur}`, '')}`;
// }

Object.defineProperty(Array.prototype, 'renderArray', {
    value: function() {
        return `${this.reduce((acc, cur) => `${acc}${cur}`, '')}`;
    }
})
