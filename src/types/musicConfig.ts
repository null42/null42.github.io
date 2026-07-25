export interface LocalMusicTrackConfig {
	name: string;
	artist: string;
	url: string;
	cover?: string;
	lrc?: string;
}

export interface MusicPlayerConfig {
	mode: "local";
	volume?: number;
	playMode?: "list" | "one" | "random";
	showLyrics?: boolean;
	showInNavbar?: boolean;
	local: {
		playlist: LocalMusicTrackConfig[];
	};
}
