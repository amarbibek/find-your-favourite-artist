<?php 
include('header.php');
include('logo.php');
?>
<div id="searchbox" class="container min-height">
<!-- <div class="container"> -->
    <!-- <br/> -->
	<div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
            <form class="card card-sm">
                <div class="card-body row no-gutters align-items-center">
                    <!-- <div class="col-auto">
                        <i class="fas fa-search h4 text-body"></i>
                    </div>  -->
                    <div class="col">
                        <input class="form-control form-control-lg form-control-borderless" type="search" id="artist_name" placeholder="Search your favourite artist...">
                    <!-- </div> 
                    <div class="col-auto"> -->
                        <input type="button" name="Search" value="Search" class="btn btn-lg btn-success"  id="btn_search_artist">
                    </div>
                    <!-- list database content -->
                    <!-- <form id="search-form">
                        <div class="button-pane">
                        <input
                            type="button"
                            id="search-list-button"
                            value="List database content"
                        />
                        </div>
                    </form> -->
                    <!-- list databse content ends here -->
                </div>
            </form>
        </div>
    </div>

    <div id="success" class="container-fluid" style="margin-top:35px;">
    <div id="row">
        <div class="col-md-4 ">
            <div id="artistImage"></div>
            <h3><strong>
            <div id="artistName"></div>
            </strong></h3>
            <p>
            <div id="artistBio"></div>
            </p>
        </div>
        <div class="col-md-4 ">
            <h3 id="top_songs_label" style="display:none">Top songs</h3>
            <div id="artistTopSongs"></div>
        </div>
        <div class="col-md-4 ">
            <h3 id="artist_recommendations_label" style="display:none">Recommendended Artists</h3>
            <div id="artistRecommendations"></div>
        </div>
    </div>
    <div id="error"></div>
    </div>
<!-- </div> -->
    <!-- <div id="searched_result">
        <div id="success">
            <div id="artistName"></div>
            <div id="artistImage"></div>
            <div id="artistBio"></div>
            <div id="artistRecommendations"></div>
            <div id="artistTopSongs"></div>
        </div>
        <div id="error"></div>
    </div> -->

    <!-- code for list -->
    <div id="list">
        <div id="pub-msg"></div>
        <div id="pub-viewer"></div>
        <ul id="pub-list"></ul>
    </div>
    <!-- end of code for list -->
</div>



<script type="text/javascript">
$(function(){
    hideLabels();
    openDbConnection();
    loadEvents();
    setTimeout(function(){
      fetchRecentSearchedArtists();
    }, 1000);
});
</script>

<?php
include('footer.php');
?>