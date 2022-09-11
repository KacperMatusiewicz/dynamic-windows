export class Song {
  name: string;
  artist: string;
  album: string;
  cover_url: string;

  constructor(name: string, artist: string, album: string, cover_url: string) {
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.cover_url = cover_url;
  }

  public getFormattedUrl(): any {
    let styles = {
      'background-image': 'url("' + this.cover_url + '")'
    }
    return styles;
  }
}
