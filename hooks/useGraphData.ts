import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { formatName } from "../lib/fileSystem";
import getVaultLinksQuery from "../schemaClient/getVaultLinks.graphql";

interface GraphData {
    nodes: {
        id: string;
        name: string;
        val?: number;
        color?: string;
    }[];
    links: {
        source: string;
        target: string;
    }[];
}

const isValid = (key: string) => key.startsWith("/");

const useGraphData = () => {
    const [links] = useQuery({ query: getVaultLinksQuery });
    const [data, setData] = useState<GraphData>();

    useEffect(() => {
        const vaultLinks = links.data?.getVaultLinks;
        if (!vaultLinks) return;

        const dataValues: Record<string, number> = {};
        const dataLinks: GraphData["links"] = [];
        for (const [key, linksTo] of Object.entries(vaultLinks)) {
            if (isValid(key)) {
                dataValues[key] = (dataValues[key] || 0) + 1;
            }

            for (const link of linksTo as string[]) {
                if (isValid(key)) {
                    dataLinks.push({
                        source: key,
                        target: link,
                    });

                    dataValues[link] = (dataValues[link] || 0) + 1;
                }
            }
        }

        setData({
            nodes: Object.keys(dataValues).map((path) => ({
                id: path,
                name: formatName(path.split("/").pop()!),
                val: dataValues[path],
                color: "rgb(100, 116, 139)",
            })),
            links: dataLinks,
        });
    }, [links]);

    return data;
};

export default useGraphData;
