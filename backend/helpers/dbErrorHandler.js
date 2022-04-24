'use strict'

const uniqueMessage = error => {
    let output

    try {
        let fieldname = 'Number of '    +
            error.keyPattern.slug       + 
            ' '                         +
            Object.keys(error.keyValue).join().toUpperCase()    +
            ' \''                       +
            error.keyValue.slug         +
            '\' already exists!'

        output = fieldname
    } catch (err) {
        output = 'Unique field already exists.'
    }

    return output
}

exports.errorHandler = error => {
    let message = ''
    
    if (error?.code)
        switch (error.code) {
            case 11000:
            case 11001:
                message= uniqueMessage(error)
            break
            default:
                message= 'Something went wrong!'
        }
    else
        for (let errorName in error.errors) {
            if (error.errors[errorName].message) 
                message = error.errors[errorName].message
        }
        // message=error

    return message
}