import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ScreenshotPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspect?: "video" | "wide" | "square" | "portrait" | "tablet";
  withBrowserChrome?: boolean;
}

/**
 * Minimal placeholder for platform screenshots. Replace by swapping the inner
 * markup for a real <Image /> when assets are ready.
 */
export function ScreenshotPlaceholder({
  className,
  label = "Captura de plataforma",
  aspect = "video",
  withBrowserChrome = false,
  ...props
}: ScreenshotPlaceholderProps) {
  const aspects: Record<string, string> = {
    video: "aspect-video",
    wide: "aspect-[16/7]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    tablet: "aspect-[4/3]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink/10 bg-white",
        className
      )}
      {...props}
    >
      {withBrowserChrome ? (
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink-50 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-white text-[10px] flex items-center px-2 font-mono text-ink/40 ring-1 ring-inset ring-ink/10">
            app.unitedlogistics.com
          </div>
        </div>
      ) : null}

      <div className={cn("relative w-full", aspects[aspect])}>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,29,41,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,29,41,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-azure/5 via-transparent to-transparent"
        />

        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2.5">
          <Image
            src="/united-logistics-icon.png"
            alt=""
            width={36}
            height={36}
            className="opacity-50"
          />
          <span className="text-[11px] font-medium text-ink/40 tracking-wide">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
