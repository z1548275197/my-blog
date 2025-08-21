import React from "react";
import { Card, Skeleton, CardHeader, Divider, CardBody, CardFooter, Button } from "@nextui-org/react";

export default function SkeletonList() {
  return (
    <div className="rounded-lg">
      <div className="mb-2">
        <Skeleton className="w-[80px] rounded-lg mb-2">
          <div className="h-8 mb-2 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
      </div>
    </div>
  );
}
