import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Hiiiii</h2>
      <Button>Click me</Button>
      <UserButton />
    </div>
  );
}
