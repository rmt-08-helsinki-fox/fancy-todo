const googleUsername = (email) => {
    let username = ''
    let emailArr = email.split('@')

    return username = emailArr[0]
}


module.exports = googleUsername