"use strict";
/*Lista de reproducción musical

typescript
*/
class Playlist {
    constructor() {
        this.songs = [];
    }
    addSong(song) {
        const existingSong = this.songs.find((s) => s.title === song.title);
        if (!existingSong) {
            this.songs.push(song);
        }
    }
    removeSong(title) {
        const indexSong = this.songs.findIndex(song => song.title === title);
        if (indexSong !== -1) {
            this.songs.splice(indexSong, 1);
        }
    }
    getTotalDuration() {
        const totalDuration = this.songs.map((song) => {
            let duration = 0;
            duration += song.duration;
            return duration;
        });
        return totalDuration.toString();
    }
    getSongsByArtist(artist) {
        let songsByArtist = [];
        this.songs.filter((song) => {
            if (song.artist === artist) {
                songsByArtist.push(song);
            }
        });
        return songsByArtist;
    }
}
