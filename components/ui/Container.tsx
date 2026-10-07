import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1600px] px-5 sm:px-7 lg:px-10 xl:px-14",
        className
      )}
    >
      {children}
    </div>
  );
}