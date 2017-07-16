var setSong = function(songNumber){
  setSong = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number){
  return $('.song-item-number[data-song-number="' + number + '"]');

};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '     <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '     <td class="song-item-title">' + songName + '</td>'
    + '     <td class="song-item-duration">' + songLength + '</td>'
    + '     </tr>'
    ;
    var $row = $(template);

    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));
        if (setSong !== null) {
        // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(SongNumber);
            currentlyPlayingCell.html(setSong);
        }

        if (setSong !== songNumber) {
          // Switch from Play -> Pause button to indicate new song is playing.
          $(this).html(pauseButtonTemplate);
          setSong(songNumber);
          setSong = songNumber;
          currentSongFromAlbum = currentAlbum.songs[songNumber -1];
          updatePlayerBarSong();

        } else if (setSong === songNumber) {
        // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            setSong = null;
            currentSongFromAlbum = null;
        }
    };

     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         //var songNumber = songNumberCell.attr('data-song-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));
         if (songNumber !== parseInt(setSong)) {
             songNumberCell.html(playButtonTemplate);
         }
     };
     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         //var songNumber = songNumberCell.attr('data-song-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));

         if (songNumber !== setSong) {
             songNumberCell.html(songNumber);
         }
      // console.log("songNumber type is " + typeof songNumber + "\n and setSong type is " + typeof setSong);
    };

     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
};

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     $albumSongList.empty();

      for (var i = 0;  i < album.songs.length; i++) {
          var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
          $albumSongList.append($newRow);
      }
  };

  var trackIndex = function(album, song) {
    return album.songs.inexOf(song);
  };

  var updatePlayerBarSong = function() {

  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(curentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);

};

  var nextSong = function(){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    //increment song
    if (currentSongIndex >= currentAlbum.songs.length) {
      currentSongIndex = 0;
    }
//save last song number before changing it
    var lastSongNumber = setSong;
//set new current song
    setSong = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $nextSongNumberCell =  $('.song-item-number[data-song-number="' + setSong + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function(){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
//decrement song index
    if (currentSongIndex < 0){
      currentSongIndex = currentAlbum.songs.length - 1;
    }
    var lastSongNumber = setSong;
//new current song
    setSong = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[surrentSongIndex];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + setSong + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};


  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
  var playerBarPlayButton = '<span class="ion-play"></span>';
  var playerBarPauseButton = '<span class="ion-pause"></span>';

  var currentAlbum = null;
  var currenlyPlayingSongNumber = null;
  var currentSongFromAlbum = null;

  var $previousButton = $('.main-controls .previous');
  var $nextButton = $('.main-controls .next');

  $(document).ready(function() {
      setCurrentAlbum(albumPicasso);
      $previousButton.click(previousSong);
      $nextButton.click(nextSong);
      var albumList = [albumPicasso, albumMarconi, albumTheBooks];
      var counter = 1;
      var albumImage = document.getElementsByClassName('album-cover-art')[0];
      albumImage.addEventListener('click', function(event){

          if(counter < albumList[counter]);
          counter++;
          if (counter == albumList.length){
            counter = 0;
          }
     });
});
