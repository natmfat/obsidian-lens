import { createClient } from "urql";

const client = createClient({
    url: "/api/graphql",
});

export default client;
