import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import { useLoginModal } from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mustateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();


    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [userId, currentUser?.followingIds]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete("/api/follow", {
                    data: {
                        userId,
                    },
                });
            }
            else {
                request = () => axios.post("/api/follow", {
                    userId,
                });
            
            }

            await request();

            mutateCurrentUser();
            mustateFetchedUser();

            toast.success(isFollowing ? "Unfollowed" : "Followed");


        } catch(err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    }, [currentUser, loginModal, isFollowing, userId, mutateCurrentUser, mustateFetchedUser]);

    return {
        isFollowing,
        toggleFollow,
    };
}

export default useFollow;