"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  Apple,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  Play,
  ShieldCheck,
} from "lucide-react";
import { myApps } from "@/data/MyAppData";

function parsePolicy(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      return;
    }

    const bullet = trimmed.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      return;
    }

    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  return blocks;
}

function InlineText({ text }) {
  const parts = text.split(/(https?:\/\/[^\s]+|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("http")) {
      const href = part.replace(/[.,;:]$/, "");
      const suffix = part.slice(href.length);
      return (
        <span key={`${part}-${index}`}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer font-medium text-info underline underline-offset-4"
          >
            {href}
          </a>
          {suffix}
        </span>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="text-base-content">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function PolicyContent({ policy }) {
  const blocks = useMemo(() => parsePolicy(policy), [policy]);

  return (
    <article className="space-y-5 text-base-content/78">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const className =
            block.level === 1
              ? "text-2xl sm:text-3xl font-semibold text-base-content"
              : "text-lg sm:text-xl font-semibold text-base-content pt-3";

          return (
            <h2 key={`${block.text}-${index}`} className={className}>
              <InlineText text={block.text} />
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`list-${index}`}
              className="space-y-2 pl-1 text-sm sm:text-base"
            >
              {block.items.map((item, itemIndex) => (
                <li
                  key={`${item}-${itemIndex}`}
                  className="flex gap-3 leading-7"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    <InlineText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`paragraph-${index}`} className="leading-7">
            <InlineText text={block.text} />
          </p>
        );
      })}
    </article>
  );
}

export function MyAppClient({ initialSlug = myApps[0].slug }) {
  const selectedApp = useMemo(
    () => myApps.find((app) => app.slug === initialSlug) ?? myApps[0],
    [initialSlug]
  );

  return (
    <section className="w-[92%] max-w-7xl mx-auto">
      <div className="mb-8 max-w-3xl">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-blue-300/20 bg-base-100/70 px-3 py-2 text-sm text-base-content/70 shadow-sm backdrop-blur-md">
            <ShieldCheck size={16} className="text-blue-300" />
            CenturyNine Privacy Center
          </div>
          <h1 className="text-4xl font-semibold tracking-normal text-base-content sm:text-5xl">
            App Privacy Policies
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/70 sm:text-lg">
            Privacy policies, store links, and release-ready notices.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-3">
          <div className="rounded-lg border border-blue-300/15 bg-base-100/85 p-2 shadow-sm backdrop-blur-md">
            {myApps.map((app) => (
              <Link
                key={app.slug}
                href={app.href}
                className={`group flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 transition-all ${
                  selectedApp.slug === app.slug
                    ? "border-blue-300/45 bg-base-200/80 shadow-sm"
                    : "border-transparent hover:border-blue-300/25 hover:bg-base-200/55"
                }`}
                aria-current={selectedApp.slug === app.slug ? "page" : undefined}
              >
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-md object-cover shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-semibold text-base-content">
                    {app.name}
                  </h2>
                  <p className="mt-0.5 truncate text-xs text-base-content/60">
                    {app.category}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className={`shrink-0 transition-transform ${
                    selectedApp.slug === app.slug
                      ? "translate-x-1 text-blue-300"
                      : "text-base-content/35 group-hover:translate-x-1"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="rounded-lg border border-blue-300/15 bg-base-100/85 p-4 text-sm text-base-content/70 shadow-sm backdrop-blur-md">
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={selectedApp.logo}
                alt={`${selectedApp.name} logo`}
                width={38}
                height={38}
                className="h-10 w-10 rounded-md object-cover shadow-sm"
              />
              <div>
                <div className="font-semibold text-base-content">
                  {selectedApp.name}
                </div>
                <div className="text-xs text-base-content/55">Actions</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 ">
          

              {selectedApp.playStoreUrl ? (
                <a
                  href={selectedApp.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline rounded-lg cursor-pointer "
                >
                  <Play size={15} />
                  Play Store 
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="btn btn-sm rounded-lg border-blue-300/15 bg-base-200/70 text-base-content/55 cursor-not-allowed"
                >
                  <Play size={15} />
                  Play Store
                  <span className="badge badge-xs border-blue-300/20 bg-base-100/80">
                    Comsing soon
                  </span>
                </button>
              )}

              {selectedApp.appStoreUrl ? (
                <a
                  href={selectedApp.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline rounded-lg cursor-pointer"
                >
                  <Apple size={15} />
                  App Store
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="btn btn-sm col-span-2 rounded-lg border-blue-300/15 bg-base-200/70 text-base-content/55 cursor-not-allowed"
                >
                  <Apple size={15} />
                  App Store
                  <span className="badge badge-xs border-blue-300/20 bg-base-100/80">
                    {selectedApp.appStoreStatus}
                  </span>
                </button>
              )}
            </div>

            <p className="mt-3 text-xs leading-5 text-base-content/55">
              {selectedApp.summary}
            </p>
          </div>

          {/* <div className="rounded-lg border border-blue-300/15 bg-base-100/85 p-4 text-sm text-base-content/65 shadow-sm backdrop-blur-md">
            <div className="mb-3 flex items-center gap-2 font-medium text-base-content">
              <FileText size={16} className="text-emerald-400" />
              Source
            </div>
            <a
              href={selectedApp.privacySourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 break-all text-info underline underline-offset-4"
            >
              product-privacy
              <ExternalLink size={14} />
            </a>
            <div className="mt-4 border-t border-blue-300/15 pt-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-base-content/45">
                Privacy href
              </div>
              <Link
                href={selectedApp.href}
                className="inline-flex cursor-pointer items-center gap-2 break-all text-info underline underline-offset-4"
              >
                {selectedApp.href}
                <ChevronRight size={14} />
              </Link>
            </div>
          </div> */}
        </aside>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-lg border border-blue-300/20 bg-base-100/95 shadow-lg backdrop-blur-md">
            <div className="border-b border-blue-300/15 p-5 sm:p-6">
              <div>
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm text-base-content/60">
                    <CalendarDays size={16} className="text-blue-300" />
                    {selectedApp.category}
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src={selectedApp.logo}
                      alt={`${selectedApp.name} logo`}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-lg object-cover shadow-sm"
                    />
                    <h2 className="text-3xl font-semibold text-base-content">
                      {selectedApp.name}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-base-content/70">
                    {selectedApp.summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
              {selectedApp.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-lg border border-blue-300/15 bg-base-200/70 p-4"
                >
                  <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-500" />
                  <p className="text-sm leading-6 text-base-content/72">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="scroll-mt-28 rounded-lg border border-blue-300/20 bg-base-100/95 p-5 shadow-lg backdrop-blur-md sm:p-8"
          >
            <div className="mb-8 flex flex-col gap-3 border-b border-blue-300/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-400">
                  guy@portfolio: ~{selectedApp.href}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-base-content">
                  Privacy Policy
                </h2>
              </div>
              <a
                href="mailto:lowlifeix@gmail.com"
                className="btn btn-sm btn-ghost rounded-lg cursor-pointer"
              >
                <Mail size={16} />
                Contact
              </a>
            </div>
            <PolicyContent policy={selectedApp.policy} />
          </section>
        </div>
      </div>
    </section>
  );
}
