var serverApiRoutes = {
    domain: 'http://localhost:8000',

    getVideosUri: function () {
        return serverApiRoutes.domain + '/'
    },

    getSimilarSearchQueries: function (searchString) {
        return serverApiRoutes.domain + '/match-with-exists/' + searchString
    },

    makeSearchQuery: function (searchQuery) {
        return serverApiRoutes.domain + '/search/' + searchQuery
    },

    getQueryInfo: function (searchQuery) {
        return serverApiRoutes.domain + '/get-query-info/' + searchQuery
    }
};

var serverApiMethods = {

    getVideosUri: function () {
        return serverApiRoutes.domain + '/'
    },

    getSimilarSearchQueries: function (searchString) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.response);
                currentPage.similarSearchQueriesList.setItems(response);
            }
        };
        xhttp.open("GET", serverApiRoutes.getSimilarSearchQueries(searchString), true);
        xhttp.send();
    },

    makeSearchQuery: function (searchQuery) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.response);
                currentPage.videosTable.setItems(response);
            }
        };
        xhttp.open("GET", serverApiRoutes.makeSearchQuery(searchQuery), true);
        xhttp.send();
    },

    getQueryInfo: function (searchQuery) {
        return serverApiRoutes.domain + '/get-query-info/' + searchQuery
    }

};

var currentPage = {
    searchInput: {
        id: 'search-input',

        getElement: function () {
            return document.getElementById(currentPage.searchInput.id);
        },

        onInputHandler: function () {
            this.getElement().addEventListener("input", function () {
                var inputString = currentPage.searchInput.getText();

                if (inputString.length > 0) {
                    currentPage.searchButton.show();
                    serverApiMethods.getSimilarSearchQueries(inputString);
                } else {
                    currentPage.similarSearchQueriesList.hide();
                    currentPage.searchButton.hide();
                }
            });
        },

        getText: function () {
            return this.getElement().value;
        },

        setText: function (string) {
            this.getElement().value = string;
        },

        clearText: function () {
            this.setText('');
        }
    },
    similarSearchQueriesList: {
        id: 'similar-search-queries-list',

        getElement: function () {
            return document.getElementById(this.id);
        },

        onItemsClickHandler: function () {
            document.querySelector('li[data-value]').addEventListener('click', function (event) {
                var searchQueryValue = event.target.getAttribute('data-value');
                getQueryInfo(searchQueryValue);
                makeSearchQuery(searchQueryValue);
            });
        },

        show: function () {
            this.getElement().parentNode.style.display = 'block';
        },

        hide: function () {
            this.getElement().parentNode.style.display = 'none';
        },

        clear: function () {
            this.getElement().innerHTML = '';
        },

        setItems: function (itemsList) {
            this.clear();
            for (var i = 0; i < itemsList.length; i++) {
                var newItem = this.generateItem(itemsList[i].value);
                this.getElement().appendChild(newItem);
                this.onItemsClickHandler();
            }

            itemsList.length > 0 ? this.show() : this.hide();
        },

        generateItem: function (text) {
            var item = document.createElement('li');
            item.innerText = text;
            item.setAttribute('data-value', text);

            return item;
        }

    },
    searchButton: {
        id: 'search-button',

        getElement: function() {
            return document.getElementById(this.id);
        },

        onClickHandler: function () {
            this.getElement().addEventListener('click', function () {
                serverApiMethods.makeSearchQuery(currentPage.searchInput.getText());
            });
        },

        show: function() {
            this.getElement().style.display = 'inline';
        },

        hide: function() {
            this.getElement().style.display = 'none';
        }
    },
    videosTable: {
        id: 'videos-table',

        getElement: function() {
            return document.getElementById(this.id);
        },

        getTableBody: function() {
            return document.querySelector('#' + this.id + ' tbody');
        },

        clear: function () {
            this.getTableBody().innerHTML = '';
        },

        generateItem: function (title, mark, description) {
            var row = document.createElement('tr');

            var titleColumn = document.createElement('td');
            var markColumn = document.createElement('td');
            var descriptionColumn = document.createElement('td');

            titleColumn.innerHTML = title;
            markColumn.innerHTML = mark;
            descriptionColumn.innerHTML = description;

            row.appendChild(titleColumn);
            row.appendChild(markColumn);
            row.appendChild(descriptionColumn);

            return row;
        },

        setItems: function (itemsList) {
            this.clear();

            for (var i = 0; i < itemsList.length; i++) {
                var newItem = this.generateItem(
                    itemsList[i].title,
                    itemsList[i].mark,
                    itemsList[i].description
                );
                this.getTableBody().appendChild(newItem);
            }
        }
    }
};

// var showMatchedQueries = function (arrayOfMatchedQueries) {
//     var listOfMatchedQueriesElement = document.getElementById('matched-queries-list');
//
//     if (arrayOfMatchedQueries.length > 0) {
//         listOfMatchedQueriesElement.style.display = 'block';
//         var list = document.querySelector('#matched-queries-list ul');
//         list.innerHTML = '';
//         for (var i = 0; i < arrayOfMatchedQueries.length; i++) {
//             var listItem = document.createElement("li");
//             listItem.innerText = arrayOfMatchedQueries[i].value;
//             listItem.setAttribute('data-value', arrayOfMatchedQueries[i].value);
//             list.appendChild(listItem);
//             addEventToListItems();
//         }
//
//     } else {
//         listOfMatchedQueriesElement.style.display = 'none'
//     }
// };

// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(JSON.parse(this.response));
//             // document.getElementById("demo").innerHTML = this.responseText;
//         }
//     };
//     xhttp.open("GET", serverApiRoutes.getVideosUri(), true);
//     // xhttp.setRequestHeader('Content-Type', 'ap   splication/json');
//     xhttp.send();
// }
//
// loadDoc();

// var showSearchButton = function () {
//     var searchButtonElement = document.getElementById('search-button');
//     searchButtonElement.style.display = 'inline';
// };
//
// var hideSearchButton = function () {
//     var searchButtonElement = document.getElementById('search-button');
//     searchButtonElement.style.display = 'none';
// };

var makeSearchQuery = function (searchQuery) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            console.log(response);
        }
    };
    xhttp.open("GET", serverApiRoutes.makeSearchQuery(searchQuery), true);
    xhttp.send();
};


var getQueryInfo = function (queryString) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            showQueryInfo(response);
        }
    };
    xhttp.open("GET", serverApiRoutes.getQueryInfo(queryString), true);
    // xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
};

// var matchWithQueries = function (inputString) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             var response = JSON.parse(this.response);
//
//             showMatchedQueries(response);
//             // document.getElementById("demo").innerHTML = this.responseText;
//         }
//     };
//     xhttp.open("GET", serverApiRoutes.getSimilarSearchQueries(inputString), true);
//     // xhttp.setRequestHeader('Content-Type', 'application/json');
//     xhttp.send();
// };

// var addEventToListItems = function () {
//     document.querySelector('li[data-value]').addEventListener('click', function (event) {
//         var searchQueryValue = event.target.getAttribute('data-value');
//         getQueryInfo(searchQueryValue);
//         makeSearchQuery(searchQueryValue);
//     });
// };

var showQueryInfo = function (videosList) {
    for (var i = 0; i < videosList.length; i++) {
        console.log(videosList[i]);
    }
};


// document.getElementById("search-input").addEventListener("input", function () {
//     var inputString = currentPage.getSearchQueryString();
//
//     if (inputString.length > 0) {
//         showSearchButton(inputString);
//         matchWithQueries(inputString);
//     } else {
//         document.getElementById('matched-queries-list').style.display = 'none';
//         hideSearchButton(inputString);
//     }
// });


// document.getElementById("search-button").addEventListener("click", function (event) {
//
// });

currentPage.searchInput.clearText();
currentPage.searchInput.onInputHandler();
currentPage.searchButton.onClickHandler();
