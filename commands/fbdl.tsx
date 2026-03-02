import { Bold, CassFormat } from "@kayelaa/zeyah";
import {
  cleanAnilistHTML,
  downloadFacebookVideo,
  facebookLinkRegex,
} from "@zeyah-bot/utils";

export const FBDL = module.register({
  emoji: "🤣",
  name: "fbdl",
  version: "1.0.0",
  author: ["@lianecagara", "@others..?"],
  pluginNames: [],
  description: "Download a Facebook Video.",
  WrapperFC({ getChildrenString }) {
    return (
      <CassFormat
        title="📥 Facebook Downloader"
        fbContentFont="fancy"
        fbTitleFont="bold"
      >
        {getChildrenString()}
      </CassFormat>
    );
  },
  async onCommand({ zeyahIO, args }) {
    const [url] = args;
    if (!url) {
      return zeyahIO.reply(
        <>
          Enter a <Bold>URL</Bold> as first argument.
        </>,
      );
    }
    if (!facebookLinkRegex.test(url)) {
      return zeyahIO.reply(
        <>
          Invalid Facebook URL. Enter a <Bold>URL</Bold> as first argument.
        </>,
      );
    }
    try {
      const p = await zeyahIO.reply(<>🎲 Processing...</>);
      const result = await downloadFacebookVideo(url);
      zeyahIO.unsend(p);
      await zeyahIO
        .reply(
          <>
            📝 <Bold>Title:</Bold> {cleanAnilistHTML(result.title)}
            <br />✅ Successfully downloaded.
          </>,
        )
        .setAttachments([{ name: "fbdl.mp4", stream: result.stream }]);
    } catch (error) {
      zeyahIO.error(error);
    }
  },
});
