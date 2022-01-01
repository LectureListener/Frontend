class DateFormatter {
    static toMinutesAndHours(date) {
        // If it lasts into the hours
        if (date.getUTCHours())
            return `${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`
        else
            return `${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`
    }
}

module.exports = DateFormatter