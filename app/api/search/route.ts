import { env } from "@/.config/env";
import { baseUrl } from "@/.config/constants";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query");

    if (!query) {
        return Response.json({ message: "Invalid request. 'query' parameter is required." }, { status: 400 });
    }

    try {
        const response = await fetch(`${baseUrl}/search/repositories?q=${query}&sort=created&direction=asc&per_page=6`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${env.GITHUB_TOKEN}`
            }
        })

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || "Failed to fetch search results");
        }

        const result = await response.json();

        type SearchedRepo = {
            owner: { login: string },
            name: string,
            full_name: string,
            url: string
        }

        const files = result.items.map((file: SearchedRepo) => ({
            owner: file.owner.login,
            name: file.name,
            full_name: file.full_name,
            url: file.url,
        }));

        return Response.json({ message: "Search results fetched successfully!", data: files }, { status: 200 })

    } catch (error) {
        console.error("Error while search for query:", error);
        return Response.json({ message: (error as Error).message || "Failed to search for query" }, { status: 500 });
    }
}