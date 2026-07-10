import AdminNav from "@/components/admin/AdminNav";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-100 lg:flex"><AdminNav/><main className="flex-1 p-5 md:p-8 overflow-x-hidden">{children}</main></div>;
}
