function yesterdayGen () {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    today.toDateString()
    yesterday.toDateString()

    return yesterday
}

module.exports = {yesterdayGen}