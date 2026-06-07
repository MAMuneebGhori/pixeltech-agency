import React from 'react';

export default function ChatMockup() {
  return (
    <div className="mt-[54px] mx-auto max-w-[560px] bg-card border border-line rounded-[18px] p-[22px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] text-left relative z-10">
      <div className="flex gap-2.5 my-2.5 items-start">
        <div className="w-[34px] h-[34px] rounded-lg shrink-0 grid place-items-center text-[0.9rem] font-bold bg-[#23232f] text-accent">
          L
        </div>
        <div>
          <div className="bg-[#1d1d29] border border-line rounded-xl px-3.5 py-2.5 text-[0.94rem] text-[#e7e7ef]">
            Hi, I need a custom web app for my business. How much is it?
            <span className="text-[0.72rem] text-[#6f6f80] ml-1.5 block sm:inline">9:42 PM</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5 my-2.5 items-start">
        <div className="w-[34px] h-[34px] rounded-lg shrink-0 grid place-items-center text-[0.9rem] font-bold bg-gradient-brand text-[#1a0d14]">
          BS
        </div>
        <div>
          <div className="bg-[#1d1d29] border border-[rgba(0,242,254,0.3)] rounded-xl px-3.5 py-2.5 text-[0.94rem] text-[#e7e7ef] shadow-[0_0_15px_rgba(0,242,254,0.1)]">
            Hi Sarah! 👋 Thanks for reaching out. Custom full-stack apps start at $X. I can hold a strategy session for you — does Thursday 2pm or Friday 11am work? Tap to book 👉 [link]
            <span className="text-[0.72rem] text-[#6f6f80] ml-1.5 block sm:inline">9:42 PM · auto-sent in 14s</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5 my-2.5 items-start">
        <div className="w-[34px] h-[34px] rounded-lg shrink-0 grid place-items-center text-[0.9rem] font-bold bg-[#23232f] text-accent">
          L
        </div>
        <div>
          <div className="bg-[#1d1d29] border border-line rounded-xl px-3.5 py-2.5 text-[0.94rem] text-[#e7e7ef]">
            Thursday works! Just booked 🙌
            <span className="text-[0.72rem] text-[#6f6f80] ml-1.5 block sm:inline">9:44 PM</span>
          </div>
        </div>
      </div>

      <p className="text-center mt-3.5 text-[0.85rem] text-mut">
        ↑ This happened at 9:42 PM. With most agencies, the client waits until morning, gets distracted, and books with a competitor.
      </p>
    </div>
  );
}
