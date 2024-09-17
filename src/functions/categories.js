require("dotenv").config()
const { Client, LogLevel } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
    logLevel: LogLevel.DEBUG
})

exports.handler = async function (event, context) {
    const categoriesResponse = await notion.databases.query({
        database_id: "1045d16478d8802eaa4cdb92afc5f314",
        sorts: [
            {
                property: "Name",
                direction: "ascending"
            }
        ]
    })

    console.log(categoriesResponse.results)

    const data = categoriesResponse.results
        .map(item => {
            return {
                id: item.id,
                title: item.properties?.Name?.title[0].plain_text,
                is_published: item.properties?.Publish?.checkbox
            }
        })

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};