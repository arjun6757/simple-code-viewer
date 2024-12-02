const query = `
query {
    user (login: "your user name") {
        pinnedItems(first: 5, types: [REPOSITORY]) {
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
}
`;

/*
    this query retrieves the first 5 pinned items in the user's profile and returns the name and url of the repositories
    using the GitHub GraphQL API
*/

export default query;