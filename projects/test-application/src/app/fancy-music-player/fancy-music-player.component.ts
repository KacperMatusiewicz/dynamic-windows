import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Song} from "./song";
import {DynamicWindow, ViewOperation} from "dynamic-windows-core";

@Component({
  selector: 'app-fancy-music-player',
  templateUrl: './fancy-music-player.component.html',
  styleUrls: ['./fancy-music-player.component.css']
})
export class FancyMusicPlayerComponent extends DynamicWindow implements OnInit, AfterViewInit {

  @ViewChild('wrapper')
  wrapper!: ElementRef;

  @ViewChild('playlist')
  playlist!: ElementRef;

  @ViewChild('player')
  player!: ElementRef;

  @ViewChild('spectrum')
  spectrum!: ElementRef<HTMLCanvasElement>;

  @ViewChild('pause_button')
  pauseButton!: ElementRef;

  @ViewChild('play_button')
  playButton!: ElementRef;

  @ViewChild('now_playing_art')
  now_playing_cover_art!: ElementRef<HTMLDivElement>;

  now_playing_name:   string = "Please pick a song";
  now_playing_album:  string = " ";
  now_playing_artist: string = " ";

  playlistSongs: Song[];

  constructor() {
    super();
    this.windowName = "Amberol"
    this.windowIconPath = "assets/amberol.png"
    this.playlistSongs = [];
  }

  ngOnInit(): void {
    this.addAlbum("Xanthochroid", "assets/song-covers/cover1.jpg", "Of Erthe and Axen Act I",
      [
        "Open The Gates, O Forest Keeper",
        "To Lost and Ancient Gardens",
        "To Higher Climes Where Few Might Stand",
        "To Souls Distant and Dreaming",
        "In Deep and Wooded Forests of My Youth",
        "The Sound of Hunger Rises",
        "The Sound of a Glinting Blade",
        "The Sound Which Has No Name"
      ]);

    this.addAlbum("Xanthochroid", "assets/song-covers/cover2.jpg", "Of Erthe and Axen Act II",
      [
        "Reveal Your Shape, O Formless One",
        "Of Aching Empty Pain",
        "Of Gods Bereft of Grace",
        "Of Strength and the Lust for Power",
        "Walk With Me, O Winged Mother",
        "Through Caverns Old and Yawning",
        "Through Chains That Drag Us Downward",
        "Toward Truth and Reconciliation"
      ]);

    this.addAlbum("Æther Realm", "assets/song-covers/cover3.jpg", "Tarot",
      [
        "The Fool",
        "Tarot",
        "The Tower",
        "King of Cups (feat. Chris Bowes)",
        "Death",
        "The Chariot",
        "The Devil",
        "The Emperor",
        "Strength",
        "Temperance",
        "The Sun, the Moon, the Star",
        "The Magician"
      ]);

    this.addAlbum("DragonForce", "assets/song-covers/cover4.jpg", "Reaching Into Infinity",
      [
        "Ashes Of The Dawn",
        "Judgement Day",
        "Astral Empire",
        "Curse Of Darkness",
        "Silence",
        "Midnight Madness",
        "War!",
        "Land Of Shattered Dreams",
        "The Edge Of The World",
        "Our Final Stand",
        "Hatred And Revenge",
        "Evil Dead",
        "Gloria"
      ]);
  }

  @ViewOperation()
  public setSize(width: number, height: number){
    (this.wrapper.nativeElement as HTMLElement).style.width  = `${width}px`;
    (this.wrapper.nativeElement as HTMLElement).style.height = `${height}px`;
  }

  @ViewOperation()
  public setPosition(x: number, y: number){
    (this.wrapper.nativeElement as HTMLElement).style.left = `${x}px`;
    (this.wrapper.nativeElement as HTMLElement).style.top  = `${y}px`;
  }

  ngAfterViewInit(): void {
    let observer = new ResizeObserver(() =>{
      let size = Number.parseInt((this.wrapper.nativeElement.style.width as string).replace("px",""));
      if (size < 712){
        this.playlist.nativeElement.style.transform = "translateX(-100%)";
        this.player.nativeElement.style.width = "100%";
      }
      else {
        this.playlist.nativeElement.style.transform = "translateX(0)";
        this.player.nativeElement.style.width = "calc(100% - 356px)";
      }
    });
    observer.observe(this.wrapper.nativeElement);
    this.drawSpectrum();
  }

  private drawSpectrum(){
    let c = this.spectrum.nativeElement.getContext('2d');
    let sizeH = 48;
    let rState = (Math.random()*254-30)+30;
    if (c){
      c.clearRect(0,0, 254, 48);
      for (let i=0; i < 254; i+=4){
        if (rState > i)
          c.fillStyle = '#ffffff';
        else
          c.fillStyle = '#505050';

        let randH = Math.random()*(sizeH-10)+10;
        if (i == 0)
          randH /= 4;

        c.beginPath();
        c.fillRect(i,sizeH/2-randH/2, 2, randH);
        c.closePath();
      }
    }
  }

  public changePlayState(){
    this.toggleVisibility(this.pauseButton);
    this.toggleVisibility(this.playButton);
  }

  private toggleVisibility(el: ElementRef<HTMLElement>){
    if (el.nativeElement.style.display == "flex")
      el.nativeElement.style.display = "none";
    else
      el.nativeElement.style.display = "flex";
  }

  public addSongToPlaylist(song: Song){
    this.playlistSongs.push(song);
  }

  public addAlbum(artist: string, cover: string, album_name: string, songs: string[]){
    for (let i of songs){
      this.addSongToPlaylist(new Song(i, artist, album_name, cover));
    }
  }

  public setNowPlayingCoverArt(url: string){
    this.now_playing_cover_art.nativeElement.style.backgroundImage = `url("${url}")`;
  }

  public setAsPlaying(s: Song) {
    this.now_playing_name = s.name;
    this.now_playing_artist = s.artist;
    this.now_playing_album = s.album;
    this.setNowPlayingCoverArt(s.cover_url);
    this.drawSpectrum();
  }
}
