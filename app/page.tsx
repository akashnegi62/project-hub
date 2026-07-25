import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <HeaderBar />
        <main className="flex-1 px-6 py-6 flex flex-col gap-6"></main>
      </div>
    </div>
  );
}
