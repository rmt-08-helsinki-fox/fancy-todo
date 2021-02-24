function yesterdayGen () {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.toDateString()

    return yesterday
}

module.exports = {yesterdayGen}