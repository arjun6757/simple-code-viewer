import { graphqlUrl } from "@/.config/constants";
import { env } from "@/.config/env";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const user = searchParams.get("user");

    if (!user) {
        return Response.json({ message: "Invalid request. 'user' parameter is required." }, { status: 400 });
    }

    const query = `
    query {
        user (login: "${user}") {
            pinnedItems(first: 6, types: [REPOSITORY]) {
                edges {
                    node {
                        ... on Repository {
                            name
                            url
                        }
                    }
                }
            }
        }
    }`;

    try {
        const response = await fetch(graphqlUrl, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${env.GITHUB_TOKEN}`
            },
            body: JSON.stringify({ query })
        });

        if(!response.ok) {
            const result = await response.json();
            return Response.json({ message: result.message || "Failed to fetch pinned repositories" }, { status: response.status || 500 });
        }

        const result = await response.json();

        return Response.json({ message: "Successfully fetched pinned repositories", data: result?.data?.user?.pinnedItems?.edges }, { status: 200 });
    
    } catch (error) {
        console.error(error);
        return Response.json({ message: (error as Error).message || "Error while fetching pinned repos" }, { status: 500 })
    }
}