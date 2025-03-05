import { Skeleton, Stack } from '@mui/material';

const Item = () => {
    return (
        <Stack gap={1}>
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="rounded" width="60%" height={24} />
            {/* tag */}
            <Stack direction="row" gap={1}>
                <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={60} height={32} />
                <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={60} height={32} />
                <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={60} height={32} />
            </Stack>
            {/* info */}
            <Stack gap={1} direction="column" justifyContent="space-between">
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
            </Stack>
            {/* image */}
            <Stack gap={1} direction="row">
                <Skeleton variant="rectangular" width={80} height={50} />
                <Skeleton variant="rectangular" width={80} height={50} />
                <Skeleton variant="rectangular" width={80} height={50} />
            </Stack>
        </Stack>
    );
};

export default Item;