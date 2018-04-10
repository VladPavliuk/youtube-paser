var clearSearchInput = (function() {
    var searchInputElement = document.getElementById('search-input');
    searchInputElement.value = '';
})();


var serverApi = {
    domain: 'http://localhost:8000',
    getVideosUri: function() { return serverApi.domain + '/' },
    getMatchedQueries: function() { return serverApi.domain + '/match-with-exists/' },
    makeSearchQuery: function(searchQuery) { return serverApi.domain + '/search/' + searchQuery },
    getQueryInfo: function(searchQuery) { return serverApi.domain + '/get-query-info/' + searchQuery }
};

var showMatchedQueries = function(arrayOfMatchedQueries) {
    var listOfMatchedQueriesElement = document.getElementById('matched-queries-list');

    if(arrayOfMatchedQueries.length > 0) {
        listOfMatchedQueriesElement.style.display = 'block';
        var list = document.querySelector('#matched-queries-list ul');
        list.innerHTML = '';
        for(var i = 0; i < arrayOfMatchedQueries.length; i++) {
            var listItem = document.createElement("li");
            listItem.innerText = arrayOfMatchedQueries[i].value;
            listItem.setAttribute('data-value', arrayOfMatchedQueries[i].value);
            list.appendChild(listItem);
            addEventToListItems();
        }

    } else {
        listOfMatchedQueriesElement.style.display = 'none'
    }
};

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.response));
            // document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", serverApi.getVideosUri(), true);
    // xhttp.setRequestHeader('Content-Type', 'ap   splication/json');
    xhttp.send();
}
loadDoc();

var showSearchButton = function() {
    var searchButtonElement = document.getElementById('search-button');
    searchButtonElement.style.display = 'inline';
};

var hideSearchButton = function() {
    var searchButtonElement = document.getElementById('search-button');
    searchButtonElement.style.display = 'none';
};

var makeSearchQuery = function (searchQuery) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            console.log(response);
        }
    };
    xhttp.open("GET", serverApi.makeSearchQuery(searchQuery), true);
    // xhttp.setRequestHeader('Content-Type', 'ap   splication/json');
    xhttp.send();
};

var getQueryInfo = function(queryString) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            showQueryInfo(response);
        }
    };
    xhttp.open("GET", serverApi.getQueryInfo(queryString), true);
    // xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
};

var matchWithQueries = function(inputString) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);

            showMatchedQueries(response);
            // document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", serverApi.getMatchedQueries() + inputString, true);
    // xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
};


document.getElementById("search-input").addEventListener("input", function(event) {
    var inputString = event.target.value;

    if(inputString.length > 0) {
        showSearchButton(inputString);
        matchWithQueries(inputString);
    } else {
        document.getElementById('matched-queries-list').style.display = 'none';
        hideSearchButton(inputString);
    }
});

var addEventToListItems = function() {
    document.querySelector('li[data-value]').addEventListener('click', function (event) {
        var searchQueryValue = event.target.getAttribute('data-value');
        getQueryInfo(searchQueryValue);
        makeSearchQuery(searchQueryValue);
    });
};

var showQueryInfo = function (videosList) {
    for(var i = 0; i < videosList.length; i++) {
        console.log(videosList[i]);
    }


};

