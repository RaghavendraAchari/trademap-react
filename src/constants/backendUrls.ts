const baseUrl = process.env.SERVER || "http://localhost:8080"

const allTrades = baseUrl + "/tradedetails"
const maxTradedDays = allTrades + "/getMaxDaysTraded"
const pendingDays = allTrades + "/pendingDates"
const setupsAndInstuments = allTrades + "/setupsAndInstuments"
const forDate = allTrades + "/forDate"
const setNoTradingDay = allTrades + "/setNoTradingDay"

const allNotes = baseUrl + "/notes"
const categoriesAndTags = allNotes + "/categoriesAndTags"

const allInsights = baseUrl + "/insights"
const allInsightsWithTitlesOny = baseUrl + "/insights/onlyTitles"
const uploadContentImage = allInsights + "/uploadContentImage"

const settings = baseUrl + "/settings" 

const analytics = baseUrl + "/analytics"

const users = baseUrl + "/users"

const investmentDetails = baseUrl + "/investmentdetails"

export default {
    baseUrl: baseUrl,
    tradeDetails: {
        allTrades,
        forDate,
        pendingDays,
        setupsAndInstuments,
        getImageDownloadablePath,
        maxTradedDays,
        noTradingDay: setNoTradingDay
    },
    notes: {
        allNotes,
        categoriesAndTags
    },
    insights: {
        allInsights,
        allInsightsWithTitlesOny,
        uploadContentImage
    },
    settings: settings,
    analytics: analytics,
    users: {
        allUsers: users,
        create: users + "/create",
        validate: users + "/validate"
    },
    investmentDetails
}

function getImageDownloadablePath(path: string) {
    return allTrades + "/downloadImage" + "?path=" + encodeURIComponent(path);
}