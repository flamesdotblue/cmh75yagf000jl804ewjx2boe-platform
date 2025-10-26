import React, { useEffect, useRef, useState } from 'react';

export default function NotificationsDropdown({ children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const onDoc = (e)=>{ if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return ()=>document.removeEventListener('mousedown', onDoc);
  },[]);
  return (
    <div ref={ref} className="relative">
      <div onClick={()=>setOpen((v)=>!v)}>{children}</div>
      {open && (
        <div className="absolute right-0 top-10 z-40 w-72 rounded-xl border border-neutral-800 bg-neutral-900 shadow-xl">
          <div className="p-3 text-sm font-semibold">Notifications</div>
          <ul className="divide-y divide-neutral-800 text-sm">
            <li className="p-3 hover:bg-white/5">
              New chapter: Crimson Shards · Ch. 10
              <div className="text-xs text-neutral-500">2m ago</div>
            </li>
            <li className="p-3 hover:bg-white/5">
              Reply to your comment on Neon Echo
              <div className="text-xs text-neutral-500">1h ago</div>
            </li>
          </ul>
          <div className="p-2 text-[11px] text-neutral-500 text-right">Mark all as read</div>
        </div>
      )}
    </div>
  );
}
