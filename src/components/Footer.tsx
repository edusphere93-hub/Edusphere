export default function Footer() {
  return (
    <footer className="w-full max-w-[1024px] mx-auto px-4 sm:px-8 py-6 mt-auto">
      <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
        <p>Â© {new Date().getFullYear()} EduSphere Learning Labs. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">System Status</a>
          <a href="#" className="hover:text-slate-600">API Reference</a>
        </div>
      </div>
    </footer>
  );
}
