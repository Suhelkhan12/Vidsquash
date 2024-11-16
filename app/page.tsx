import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileVideo2, Zap, Clock } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <section>
      <header className="p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Video Compression Tool
        </h1>
        <p className="mt-4 text-xl text-center">
          Compress your videos without compromising quality
        </p>
      </header>

      <div className="pt-12">
        <h2 className="text-3xl font-semibold text-center mb-8 ">
          Why Choose Our Tool?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-blue-500" />}
            title="Fast Processing"
            description="Leverage the power of FFmpeg for quick and efficient video compression."
          />
          <FeatureCard
            icon={<FileVideo2 className="h-6 w-6 text-green-500" />}
            title="Maintain Quality"
            description="Compress videos while preserving visual quality using advanced algorithms."
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-purple-500" />}
            title="Save Time"
            description="Batch process multiple videos and save hours of manual work."
          />
        </div>
      </div>

      <div className="text-center mt-16 pb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Ready to Compress?
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Start compressing your videos in just a few clicks.
        </p>
        <Link href={"/condense"}>
          <Button>Condense video</Button>
        </Link>
      </div>
    </section>
  );
};

export default page;

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span className="text-2xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className=" text-lg leading-normal">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
