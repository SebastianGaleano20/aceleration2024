/*Lista de reproducción musical

typescript
*/

interface Song {
  title: string;
  artist: string;
  duration: number; // en segundos
}

class Playlist {
  private songs: Song[] = [];

  addSong(song: Song): void {
    const existingSong = this.songs.find((s) => s.title === song.title);
    if (!existingSong) {
      this.songs.push(song);
    }
  }

  removeSong(title: string): void {
    const indexSong =  this.songs.findIndex(song => song.title === title);
    if(indexSong !== -1){
        this.songs.splice(indexSong,1)
    }
  }

  getTotalDuration(): string {
    const totalDuration = this.songs.map((song)=> {
        let duration = 0
        duration += song.duration
        return duration
    })
    return totalDuration.toString()
  }

  getSongsByArtist(artist: string): Song[] {
    let songsByArtist :Song[] = []
    this.songs.filter((song) => {
        if(song.artist === artist){
            songsByArtist.push(song)
        }
    })
    return songsByArtist
  }
}