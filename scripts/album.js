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
  albumArtUrl: 'assets/images/album_covers/14.png',
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
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'

     var $row = $(template)

     var clickHandler = function() {
         var songNumber = $(this).attr('data-song-number')

         if (currentlyPlayingSong !== null) {
             var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]')
             currentlyPlayingCell.html(currentlyPlayingSong)
         }
         if (currentlyPlayingSong !== songNumber) {
             $(this).html(pauseButtonTemplate)
             currentlyPlayingSong = songNumber
         } else if (currentlyPlayingSong === songNumber) {
             $(this).html(playButtonTemplate)
             currentlyPlayingSong = null
         }
     }

     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number')
         var songNumber = songNumberCell.attr('data-song-number')

         if (songNumber !== currentlyPlayingSong) {
             songNumberCell.html(playButtonTemplate)
         }
     }
     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number')
         var songNumber = songNumberCell.attr('data-song-number')

         if (songNumber !== currentlyPlayingSong) {
             songNumberCell.html(songNumber)
         }
     }

     $row.find('.song-item-number').click(clickHandler)
     $row.hover(onHover, offHover)
     return $row
 }

 var setCurrentAlbum = function(album) {
     var $albumTitle = $('.album-view-title')
     var $albumArtist = $('.album-view-artist')
     var $albumReleaseInfo = $('.album-view-release-info')
     var $albumImage = $('.album-cover-art')
     var $albumSongList = $('.album-view-song-list')

     $albumTitle.text(album.title)
     $albumArtist.text(album.artist)
     $albumReleaseInfo.text(album.year + ' ' + album.label)
     $albumImage.attr('src', album.albumArtUrl)

     $albumSongList.empty()

      for (var i = 0;  i < album.songs.length; i++) {
          var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration)
          $albumSongList.append($newRow)
      }
  }

  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'
  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>'

  var currentlyPlayingSong = null

  $(document).ready(function() {
      setCurrentAlbum(albumPicasso)
  })
  
//send this to Carrie
/* var albums = [albumPicasso, albumMarconi, albumTheBooks]
    var index = 1
    albumImage.addEventListener('click', function(event){
      setCurrentAlbum(albums[index])
      index++
      if (index == albums.length){
        index = 0
    })

  }*/
