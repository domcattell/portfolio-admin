const is = {}

is.required = ({values = null}) => {
    if(values.every((value) => !value)) {
        throw Error('Please enter all of the fields')
    }
}

module.exports = is;