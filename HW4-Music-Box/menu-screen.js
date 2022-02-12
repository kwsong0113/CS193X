// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
const SONG_CHOICES_URL = "https://yayinternet.github.io/hw4-music/songs.json";
const PREDEFINED_THEMES = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

class MenuScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;

    this.selectorContainer = document.querySelector('#song-selector');
    this.themeInput = document.querySelector('#query-input');
    this._fetchSongs();
    this._chooseRandomTheme();

    this._onSubmit = this._onSubmit.bind(this);
    const form = document.querySelector('form');
    form.addEventListener('submit', this._onSubmit);
  }

  // TODO(you): Add methods as necessary.
  _onSubmit(event) {
    event.preventDefault();
    const index = this.selectorContainer.selectedIndex;
    console.log(this.selectorContainer.options[index].value);
    console.log(this.themeInput.value);
  }

  _fetchSongs() {
    fetch(SONG_CHOICES_URL)
      .then((response) => response.json())
      .then((json) => {
        this.songs = json;
        for (const song in this.songs) {
          this._addSong(song);
        }
      });
  }

  _addSong(song) {
    const option = document.createElement('option');
    option.value = song;

    const songDetail = this.songs[song];
    option.textContent = songDetail.artist + ': ' + songDetail.title;
    this.selectorContainer.append(option);
  }

  _chooseRandomTheme() {
    this.themeInput.value = PREDEFINED_THEMES[Math.floor(Math.random() * PREDEFINED_THEMES.length)];
  }
}
