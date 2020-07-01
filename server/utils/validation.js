const is = {}

is.required = (...values) => {
    values.forEach((value) => {
        if(!value) {
            throw Error(`Please enter all fields marked with a *`)
        }
    })
}

module.exports = is;