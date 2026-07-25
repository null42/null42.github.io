import type { MusicPlayerConfig } from "../types/musicConfig";

export const musicPlayerConfig: MusicPlayerConfig = {
	showInNavbar: true,
	mode: "local",
	volume: 0.7,
	playMode: "list",
	showLyrics: true,
	local: {
		playlist: [
			{
				name: "Omg it's ビビデバ",
				artist: "匕匕亏八（小桃不会系列）",
				url: "/assets/music/omg-its-vivideva.mp3",
				lrc: "",
			},
		],
	},
};
