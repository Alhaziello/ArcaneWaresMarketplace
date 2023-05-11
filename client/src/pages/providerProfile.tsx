import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";
import { Profile } from "components";

const ProviderProfile = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: id as string
    });

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type="Provider"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
        />
    );
};

export default ProviderProfile;