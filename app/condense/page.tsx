"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CondenseVideoDynamic = dynamic(
  () => import("../condense/_components/condense-video"),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);
const page = () => {
  return (
    <div className="pt-12">
      <div className="flex items-start gap-8">
        <Card className=" max-w-3xl w-full">
          <CardHeader>
            <CardTitle className=" text-xl">Place your video here</CardTitle>
          </CardHeader>
          <CardContent>
            <CondenseVideoDynamic />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
