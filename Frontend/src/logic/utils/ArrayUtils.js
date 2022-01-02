class ArrayUtils {
    static pushRangeNoOverlap(array, range) {
        for (let i = 0; i < array.length; i++) {
            // from various stack overflow threads
            if (array[i][0] === range[0] && array[i][1] === range[1]) {
                // we can just assume that there are no more overlaps
                return
            } else if (array[i][0] <= range[1] && array[i][1] >= range[0]) {
                // get non overlapping range
                const min = Math.min(array[i][0], array[i][1], range[0], range[1])
                const max = Math.max(array[i][0], array[i][1], range[0], range[1])

                array.splice(i, 1)
                // cant assume no more overlaps given we actualyl changed a range
                this.pushRangeNoOverlap(array, [min, max])
                return
            }
        }
        array.push(range)
        // guarantee order of array
        array.sort((lVal, rVal) => rVal[0] - lVal[0])
        console.log(array)
    }
}

module.exports = ArrayUtils