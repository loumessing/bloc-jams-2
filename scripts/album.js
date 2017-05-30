var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
}
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
}
var albumTheBooks = {
  title: 'The Lemon of Pink',
  artist: 'The Books',
  label: 'Temporary Residence',
  year: '2016',
  albumArtUrl: 'assets/images/album_covers/22.png',
  songs:[
    {title: 'The Lemon of Pink', duration: '4:40'},
    {title: 'The Lemon of Pink II', duration: '1:35'},
    {title: 'Tokyo', duration: '3:43'},
    {title: 'Bonanza', duration: '0:53'},
    {title: 'S Is For EverySing', duration: '3:32'},
    {title: 'Explanation Mark', duration: '0:20'},
    {title: 'There Is No There There', duration: '3:37'},
    {title: 'Take Time', duration: '3:37'},
    {title: 'Dont Even Sing About It', duration: '4:40'},
    {title: 'The Future, Wouldnt That Be Nice', duration: '3:16'},
    {title: 'A True Story of a Story of True Love', duration:'4:25'},
    {title: 'The Right Aint Right', duration: '2:48'},
    {title: 'P.S', duration: '0:56'}
  ]


}
var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'

    return template
}
var albumTitle = document.getElementsByClassName('album-view-title')[0]
var albumArtist = document.getElementsByClassName('album-view-artist')[0]
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0]
var albumImage = document.getElementsByClassName('album-cover-art')[0]
var albumSongList = document.getElementsByClassName('album-view-song-list')[0]

var setCurrentAlbum = function(album) {


    albumTitle.firstChild.nodeValue = album.title
    albumArtist.firstChild.nodeValue = album.artist
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label
    albumImage.setAttribute('src', album.albumArtUrl)

    albumSongList.innerHTML = ''

    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration)
    }
}

window.onload = function() {
    setCurrentAlbum(albumPicasso)

    var albums = [albumPicasso, albumMarconi, albumTheBooks]
    var index = 1
    albumImage.addEventListener("click", function(event){
      setCurrentAlbum(albums[index])
      index++
      if (index == albums.length){
        index = 0
      }
    })

  }