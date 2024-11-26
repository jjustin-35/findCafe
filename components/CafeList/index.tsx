"use client";

import { Stack } from "@mui/material";
import CafeListItem, { CafeItemProps } from "./item";

const CafeList = ({ data }: { data: CafeItemProps[] }) => {
  return (
    <Stack gap={2}>
      {data.map((cafe) => (
        <CafeListItem key={cafe.cafe.id} cafe={cafe} />
      ))}
    </Stack>
  );
};

export default CafeList;
