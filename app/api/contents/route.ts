import { baseUrl } from "@/.config/constants";
import { env } from "@/.config/env";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    
    const owner = searchParams.get("owner")
    const repo = searchParams.get("repo")
    const path = searchParams.get("path") || ""
    
    if (!owner || !repo) {
        return Response.json({ message: "Invalid request. 'owner' and 'repo' parameters are required." }, { status: 400 });
    }

    try {

        const response = await fetch(`${baseUrl}/repos/${owner}/${repo}/contents/${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${env.GITHUB_TOKEN}`
            }
        })

        if (!response.ok) {
            const result = await response.json();
            return Response.json({ message: result.message || "Failed to fetch contents" }, { status: response.status || 500 });
        }

        const data = await response.json();

        return Response.json({ message: `Successfully fetched contents of directory: ${path ? path : "root"}`, data }, { status: 200 })
    } catch (error) {
        console.error("Error fetching data:", error);
        return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }

}