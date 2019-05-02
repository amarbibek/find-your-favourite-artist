const DB_NAME = "truecaller_db";
const DB_VERSION = 1;
const DB_STORE_NAME = "artists";

var db;
// code to establish db connection
function openDbConnection() {
  //   debugger;
  //   console.log("opening Db connection ...");
  var req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onsuccess = function(evt) {
    db = this.result;
    console.log("openDb");
  };
  req.onerror = function(evt) {
    // debugger;
  };
  req.onupgradeneeded = function(evt) {
    console.log("openDb.onupgradeneeded");
    var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {
      keyPath: "id",
      autoIncrement: true
    });
    // store.createIndex("artistid", "artistid", { unique: true });
    store.createIndex("name", "name", { unique: true });
  };
}
function loadEvents() {
  $("#btn_search_artist").on("click", searchArtist);
  $("#artist_name").keypress(function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      searchArtist();
    }
  });
}
function hideLabels() {
  $("#top_songs_label").hide();
  $("#artist_recommendations_label").hide();
}
function showLabels() {
  $("#top_songs_label").show();
  $("#artist_recommendations_label").show();
}

// openDbConnection();

function getObjectStore(store_name, mode) {
  //   debugger;
  var tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}

function addSearchedArtistNameToDB(artistName) {
  //   debugger;
  //   console.log("addPublication arguments:", artistName);
  var obj = { name: artistName };
  var store = getObjectStore(DB_STORE_NAME, "readwrite");
  var req;
  try {
    req = store.add(obj);
  } catch (e) {
    throw e;
  }
  req.onsuccess = function(evt) {
    // console.log("Artist inserted successfully");
    // debugger;
  };
  req.onerror = function() {
    // console.error("error", this.error);
    // debugger;
  };
}

function fetchRecentSearchedArtists() {
  //   debugger;
  if (typeof store == "undefined")
    store = getObjectStore(DB_STORE_NAME, "readonly");
  //   debugger;
  var pub_msg = $("#pub-msg");
  pub_msg.empty();
  var pub_list = $("#pub-list");
  pub_list.empty();
  newViewerFrame();

  var req;
  req = store.count();
  req.onsuccess = function(evt) {
    pub_msg.append("<p>Your Recent Searched Artist(s).</p>");
  };
  req.onerror = function(evt) {
    // console.error(" error", this.error);
  };

  var i = 0;
  req = store.openCursor();
  req.onsuccess = function(evt) {
    var cursor = evt.target.result;
    if (cursor) {
      console.log(" cursor:", cursor);
      req = store.get(cursor.key);
      req.onsuccess = function(evt) {
        // debugger;
        var value = evt.target.result;
        var list_item = $(
          "<li>" +
            "[" +
            cursor.key +
            "] " +
            "(artist name: " +
            value.name +
            ") "
        );
        // debugger;
        var link = $(
          "<p><a href=" +
            "https://www.last.fm/music/" +
            value.name.replace(" ", "+") +
            " target='_blank'" +
            ">" +
            value.name +
            "</a></p>"
        );
        // "<p><a href=" +
        // item.url +
        // " target='_blank'>" +
        // item.name +
        // " - " +
        // "Play count : " +
        // item.playcount +
        // "</a></p>";
        list_item.append(link);
        pub_list.append(list_item);
      };
      cursor.continue();
      i++;
    } else {
      console.log("No more entries");
    }
  };
}

function newViewerFrame() {
  var viewer = $("#pub-viewer");
  viewer.empty();
  var div = $("<div />");
  viewer.append(div);
  return div;
}

// code for last.fm api
function searchArtist() {
  //   debugger;
  let artist_name = $("#artist_name").val();
  $.getJSON(
    "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
      artist_name +
      "&user=bibek014&api_key=b518181c411e4aec16f39f7336937d2b&limit=10&format=json",
    function(json) {
      var html = "";
      $.each(json.artist.similar.artist, function(i, item) {
        html +=
          "<p><a href=" +
          item.url +
          " target='_blank'>" +
          item.name +
          // " - " +
          // "Play count : " +
          // item.playcount +
          "</a></p>";
      });
      $("#artistRecommendations")
        .empty()
        .append(html);
      $("#success #artistName").html(json.artist.name);
      $("#success #artistImage").html(
        '<img src="' + json.artist.image[2]["#text"] + '" />'
      );
      $("#success #artistBio").html(json.artist.bio.content);
      $("#success #artistBio").html(
        json.artist.bio.content.substr(
          0,
          json.artist.bio.content.lastIndexOf(" ", 500)
        ) + "..."
      );
    },
    function(err) {
      //   console.log(err);
      //   debugger;
    }
  );
  $.getJSON(
    "https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&&artist=l" +
      artist_name +
      "&user=bibek014&api_key=b518181c411e4aec16f39f7336937d2b&limit=10&format=json",
    function(json) {
      var html = "";
      //   debugger;
      if (json.toptracks) {
        $.each(json.toptracks.track, function(i, item) {
          html +=
            "<p><a href=" +
            item.url +
            " target='_blank'>" +
            item.name +
            " - " +
            "Play count : " +
            item.playcount +
            "</a></p>";
        });
        // debugger;
        $("#artistTopSongs")
          .empty()
          .append(html);
      }
      showLabels();
      addSearchedArtistNameToDB(artist_name);
    },
    function(err) {
      //   console.log(err);
      //   debugger;
    }
  );
}
