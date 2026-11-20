const playlist = "/videos/my-story-with-pain/index.m3u8";
const playerModule = "https://cdn.jsdelivr.net/npm/hls.js@1.7.4/dist/hls.mjs";

export function createShortFilmsSection(jsx, jsxs, React, useLanguage) {
  return function ShortFilmsSection() {
    const { lang } = useLanguage();
    const isChinese = lang === "cn";
    const player = React.useRef(null);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
      const video = player.current;
      let disposed = false;
      let stream;
      const onError = () => setFailed(true);
      video.addEventListener("error", onError);

      async function initialize() {
        try {
          if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = playlist;
            return;
          }
          const { default: Hls } = await import(playerModule);
          if (disposed) return;
          if (!Hls.isSupported()) {
            onError();
            return;
          }
          stream = new Hls({ maxBufferLength: 24 });
          stream.on(Hls.Events.ERROR, (_, details) => {
            if (details.fatal) onError();
          });
          stream.loadSource(playlist);
          stream.attachMedia(video);
        } catch {
          if (!disposed) onError();
        }
      }

      initialize();
      return () => {
        disposed = true;
        video.removeEventListener("error", onError);
        stream?.destroy();
        video.removeAttribute("src");
        video.load();
      };
    }, []);

    return jsxs("section", {
      className: "section-chapter mx-auto w-full max-w-content px-6 md:px-10 lg:px-16",
      "aria-labelledby": "short-films-title",
      children: [
        jsx("h2", {
          id: "short-films-title",
          className: "section-title",
          children: isChinese ? "影像随笔" : "Personal Reflections",
        }),
        jsxs("article", {
          className: "mt-8 rounded-lg border border-hairline bg-surface p-5 md:p-8",
          children: [
            jsxs("div", {
              className: "flex flex-wrap items-baseline justify-between gap-2",
              children: [
                jsx("h3", {
                  className: "text-[20px] font-semibold text-ink",
                  children: "My Story With Pain",
                }),
                jsx("time", {
                  className: "text-[14px] text-ink-secondary",
                  dateTime: "PT10M12S",
                  children: isChinese ? "10 分 12 秒" : "10 min 12 sec",
                }),
              ],
            }),
            jsx("p", {
              className: "prose-body mt-2",
              children: isChinese
                ? "这部短片记录了我上学时对疼痛的一次思考。"
                : "This short film captures a reflection on pain from my time at school.",
            }),
            jsx("video", {
              className: "mt-4 w-full rounded-md bg-surface-muted object-contain",
              style: { aspectRatio: "16 / 9" },
              "aria-label": isChinese ? "播放短片 My Story With Pain" : "Play My Story With Pain",
              ref: player,
              controls: true,
              playsInline: true,
              preload: "none",
              poster: "/videos/my-story-with-pain-cover.jpg",
            }),
            failed && jsx("p", {
              className: "mt-3 text-ink-secondary",
              role: "status",
              children: isChinese ? "视频暂时无法播放，请刷新页面重试。" : "The video could not load. Refresh the page to try again.",
            }),
          ],
        }),
      ],
    });
  };
}

export function createLifePage(jsx, jsxs, React, useLanguage, SingaporeSection, DailyLifeSection) {
  const ShortFilmsSection = createShortFilmsSection(jsx, jsxs, React, useLanguage);

  return function LifePage() {
    const { lang } = useLanguage();
    const isChinese = lang === "cn";
    return jsxs("div", {
      children: [
        jsxs("header", {
          className: "mx-auto w-full max-w-content px-6 pb-6 pt-24 md:px-10 lg:px-16",
          children: [
            jsx("h1", {
              className: "section-title",
              children: isChinese ? "独立生活与日常" : "Life & Reflections",
            }),
            jsx("p", {
              className: "prose-body mt-3",
              children: isChinese
                ? "这里记下我在新加坡独自求学的经历，也收录我用照片和短片留下的日常与思考。"
                : "My experience studying on my own in Singapore, alongside everyday moments and reflections captured in photos and film.",
            }),
          ],
        }),
        jsx(SingaporeSection, {}),
        jsx(DailyLifeSection, {}),
        jsx(ShortFilmsSection, {}),
      ],
    });
  };
}
