import { baseUrl } from "@/.config/constants";
import { env } from "@/.config/env";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");

    if (!owner || !repo) {
        return Response.json({ message: "Invalid request. 'owner' and 'repo' parameters are required." }, { status: 400 });
    }

    try {
        const response = await fetch(`${baseUrl}/repos/${owner}/${repo}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const result = await response.json();
            return Response.json({ message: result.message || "Failed to fetch 'homepage'" },
                { status: response.status || 500 });
        }

        const result = await response.json();
        return Response.json({ message: "Homepage fetched successfully!", data: result.homepage ?? null }, { status: 200 });

    } catch (error) {
        console.error("Error fetching data:", error);
        return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}