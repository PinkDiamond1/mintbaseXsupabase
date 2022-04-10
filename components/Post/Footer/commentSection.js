import {
    Box,

    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
    Icon,
    Input,
    IconButton,
    Stack,
} from "@chakra-ui/react";


export const CommentSection = ({ comments }) => {

    return (
        <Box>
            <Stack>
                <Text>Latest Comment</Text>
                <Text>More Comments</Text>
                <Text>Perhaps make an component for Comments.</Text>
                <Text>The comment Author and date also need to fit here.</Text>
                <Text>First Comment</Text>
            </Stack>
        </Box>
    )
}