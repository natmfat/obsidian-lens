import { ChangeEvent, useEffect, useState } from "react";
import { useClient, useMutation } from "urql";

import getVaultQuery from "../schemaClient/getVault.graphql";
import updateVaultMutation from "../schemaClient/updateVault.graphql";
import updateVaultPathsMutation from "../schemaClient/updateVaultPaths.graphql";
import useStore from "./useStore";

const useUpdateVault = () => {
  const set = useStore((state) => state.set);
  const client = useClient();
  const [updateVaultResult, updateVault] = useMutation(updateVaultMutation);
  const [updateVaultPathsResult, updateVaultPaths] = useMutation(
    updateVaultPathsMutation,
  );

  const [vaultClient, setVaultClient] = useState<Record<string, any>>({
    name: "Untitled Vault",
    owner: "vault-owner",
    repo: "vault-repository",
  });

  useEffect(() => {
    client
      .query(getVaultQuery, {})
      .toPromise()
      .then((result) => {
        setVaultClient(result.data.getVault);
      });
  }, []);

  return {
    // basic props like name
    updateVaultResult,
    updateVault: () => {
      updateVault(vaultClient);
      set((state) => {
        state.fileSystem.name = vaultClient.name;
      });
    },

    // re-fetch entire vault paths
    updateVaultPathsResult,
    updateVaultPaths,

    // local state to edit inputs
    vaultClient,
    setVaultClient: (prop: string) => (e: ChangeEvent<HTMLInputElement>) =>
      setVaultClient({
        ...vaultClient,
        [prop]: e.target.value,
      }),
  };
};

export default useUpdateVault;
