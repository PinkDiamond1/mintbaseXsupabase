import { Box, Button, Center } from "@chakra-ui/react";
import { useQuery, gql } from '@apollo/client';
import { createApolloClient } from "../../utils/initApolloMintbase";
import { useEffect, useReducer, useRef, useState } from 'react';
import { GET_LATEST_NFTS, GET_ALL_STORES } from '../../utils/mintbaseQueries'
import { PostGrid } from "../Post/postGrid";
import { useUser } from "../../hooks/authUser";



const Favos = ({ mintbaseNetwork }) => {

    const {user} = useUser();

    // Filter the duplicate tokens
    function filterDups(arr) {
        let uniqueThingIds = [];
        const uniqueArr = arr.token?.filter((nft) => {
            if (nft.thing) {
                if (!uniqueThingIds.includes(nft.thing.id)) {
                    uniqueThingIds.push(nft.thing.id);
                    return nft
                }
            }
        })
        return uniqueArr
    }

    // TODO make a new query!
    const [unique, setUnique] = useState()
    const { loading, error, data } = useQuery(GET_LATEST_NFTS, {
        client: mintbaseNetwork.client,
        variables: {
            "orderBy": [
                {
                    "createdAt": "desc"
                }
            ],
            "limit": 1111,
        },
        pollInterval: 900
    });

    useEffect(() => {
        if (error) { console.log(`Error! ${error.message}`) }
        if (!loading) {
            setUnique(filterDups(data))
        }
    }, [data, error, loading])

    return (
        <Box>
            <PostGrid 
            mintbaseNetwork={mintbaseNetwork}
            loading={loading}
            unique={unique}
            />
            {!loading &&
                <Box
                    className="relative flex mb-11 drop-shadow-lg"
                >
                    <Button
                        ref={endRef}
                        variant="solid"
                        colorScheme="teal"
                        className="mx-auto font-bold"
                        onClick={() => setLoad("load more")}
                    >
                        {"Load more ..."}
                    </Button>
                </Box>
            }
        </Box>
    );
};

export default Favos;
