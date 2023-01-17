import { Button, Input } from "../atoms";
import useUpdateVault from "../../hooks/useUpdateVault";

// TODO fetching vault paths

const AppAdmin = () => {
    const { updateVaultResult, updateVault, vaultClient, setVaultClient } =
        useUpdateVault();

    return (
        <>
            <h1>Vault Settings</h1>

            <p>
                Some secret settings can only be changed through Environmental
                variables. If you change these vault settings (like the vault
                repository), you must also request an update.
            </p>

            <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    updateVault();
                }}
            >
                <Input
                    type="text"
                    placeholder="Vault Owner"
                    value={vaultClient.owner}
                    onChange={setVaultClient("owner")}
                />

                <Input
                    type="text"
                    placeholder="Vault Repository"
                    value={vaultClient.repo}
                    onChange={setVaultClient("repo")}
                />

                <Input
                    type="text"
                    placeholder="Vault Name"
                    value={vaultClient.name}
                    onChange={setVaultClient("name")}
                />
                <Button loading={updateVaultResult.fetching}>Save Vault</Button>
            </form>

            <p>
                Updating your vault is computationally expensive; use this tool
                sparingly. It is safe to navigate to other pages or close your
                tab after requesting a vault update.
            </p>

            <Button>Update Vault</Button>
        </>
    );
};

export default AppAdmin;
