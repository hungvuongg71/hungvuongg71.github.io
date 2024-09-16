require("dotenv").config()
const { Client, LogLevel } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
    logLevel: LogLevel.DEBUG
})

exports.onCreateDevServer = ({ app }) => {
    app.get('/api/uxcomic/categories', async (req, res) => {
        try {
            const categoriesResponse = await notion.blocks.children
                .list({
                    block_id: "a58596ad902a49e39a81fdb9b84b92d9"
                })

            console.log(categoriesResponse)

            res.json(categoriesResponse.results
                .filter(item => item.child_page)
                .map(item => {
                    return {
                        id: item.id,
                        title: item.child_page?.title
                    }
                })
            );
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    });
};