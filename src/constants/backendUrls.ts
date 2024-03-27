const baseUrl = "http://localhost:8080"

const allTrades = baseUrl + "/tradedetails"
const maxTradedDays = allTrades + "/getMaxDaysTraded"
const pendingDays = allTrades + "/pendingDates"
const setupsAndInstuments = allTrades + "/setupsAndInstuments"

const allNotes = baseUrl + "/notes"
const categoriesAndTags = allNotes + "/categoriesAndTags"

const allInsights = baseUrl + "/insights"
const allInsightsWithTitlesOny = baseUrl + "/insights/onlyTitles"
const uploadContentImage = allInsights + "/uploadContentImage"

const settings = baseUrl + "/settings" 

const analytics = baseUrl + "/analytics"

export default {
    baseUrl: baseUrl,
    tradeDetails: {
        allTrades,
        pendingDays,
        setupsAndInstuments,
        getImageDownloadablePath,
        maxTradedDays
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
    analytics: analytics
}

function getImageDownloadablePath(path: string) {
    return allTrades + "/downloadImage" + "?path=" + encodeURIComponent(path);
}