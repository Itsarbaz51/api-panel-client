"use client";

import { usePathname, useRouter } from "next/navigation";

export default function TabsNav({ tabs = [], basePath = "" }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="border-b border-border">
      <nav className="flex gap-6">
        {tabs.map((tab, index) => {
          const href = `${basePath}/${tab.value}`;
          const active = pathname === href;
          const Icon = tab.icon;

          return (
            <button
              key={tab.value || index} // ✅ Safe unique key
              onClick={() => router.push(href)}
              className={`pb-2 text-sm font-medium border-b-2 flex items-center gap-2 transition cursor-pointer ${
                active
                  ? "border-primary "
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {Icon && <Icon size={16} />}

              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}