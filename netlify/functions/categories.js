require('dotenv').config()
const notion = require("./notion-sdk-helper")
const { successResponse, errorResponse } = require('./response-helper')

exports.handler = async function (event, context) {
    try {
        const categoriesResponse = await notion.databases.query({
            database_id: process.env.CATEGORY_ID,
            sorts: [
                {
                    property: "Name",
                    direction: "ascending"
                }
            ]
        })

        const data = categoriesResponse.results
            .filter(item => item.properties.Publish?.checkbox)
            .map(item => {
                return {
                    id: item.id,
                    title: item.properties?.Name?.title[0].plain_text,
                }
            })

        return successResponse(data)
    } catch (error) {
        console.error("Notion API Error:", error.message)
        console.log("Context info:", context)
        return errorResponse()
    }
};