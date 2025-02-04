import Navbar from "@/components/navbar";

export default function AuthRequiredLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      { children }
    </div>
  );
}