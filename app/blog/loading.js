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
      <Card className="w-full mb-4">
        <CardBody>
          <Skeleton className="w-2/5 rounded-lg mb-2">
            <div className="h-4 mb-2 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="rounded-lg mb-2">
            <div className="h-4 mb-2 w-4/5 rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg mb-2">
            <div className="h-4 mb-2 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
        </CardBody>
      </Card>
      <Card className="w-full mb-4">
        <CardBody>
          <Skeleton className="w-2/5 rounded-lg mb-2">
            <div className="h-4 mb-2 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="rounded-lg mb-2">
            <div className="h-4 mb-2 w-4/5 rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg mb-2">
            <div className="h-4 mb-2 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
        </CardBody>
      </Card>
      <Card className="w-full mb-4">
        <CardBody>
          <Skeleton className="w-2/5 rounded-lg mb-2">
            <div className="h-4 mb-2 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="rounded-lg mb-2">
            <div className="h-4 mb-2 w-4/5 rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg mb-2">
            <div className="h-4 mb-2 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
}
