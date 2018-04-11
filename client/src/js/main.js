var serverApiRoutes = {
    domain: 'http://localhost:8000',

    getVideosUri: function () {
        return serverApiRoutes.domain + '/'
    },

    getSimilarSearchQueries: function (searchString) {
        return serverApiRoutes.domain + '/match-with-exists/' + searchString;
    },

    makeSearchQuery: function (searchQuery) {
        return serverApiRoutes.domain + '/search/' + searchQuery;
    },

    getQueryInfo: function (searchQuery) {
        return serverApiRoutes.domain + '/get-query-info/' + searchQuery;
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
        currentPage.similarSearchQueriesList.hide();
        currentPage.searchInput.setText(searchQuery);
        currentPage.loadingBar.show();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.response);
                currentPage.videosTable.setItems(response);
                currentPage.loadingBar.hide();
            }
        };
        xhttp.open("GET", serverApiRoutes.makeSearchQuery(searchQuery), true);
        xhttp.send();
    },

    getQueryInfo: function (searchQuery) {
        console.log(serverApiRoutes.getQueryInfo(searchQuery));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var response = JSON.parse(this.response);

                currentPage.videosInfoBlock.amountInDatabase.setAmount(response);
                currentPage.videosInfoBlock.middleRating.setMiddleRating(response);
                currentPage.videosInfoBlock.titlesList.setTitles(response);
            }
        };
        xhttp.open("GET", serverApiRoutes.getQueryInfo(searchQuery), true);
        xhttp.send();
    }

};

var currentPage = {
    loadingBar: {
        id: 'loading-bar-wrapper',

        getElement: function() {
            return document.getElementById(this.id);
        },

        show: function() {
            this.getElement().style.display = 'block';
        },

        hide: function() {
            this.getElement().style.display = 'none';
        }
    },
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

        onEnterHandler: function () {
            this.getElement().addEventListener("keyup", function (event) {
                if (event.keyCode === 13) {
                    currentPage.searchButton.getElement().click();
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
    videosInfoBlock: {
        amountInDatabase: {
            id: 'amount-in-database',
            initialText: 'Amount in database: ',

            getElement: function () {
                return document.getElementById(this.id);
            },

            setAmount: function (videosList) {
                this.getElement().innerHTML = this.initialText + videosList.length;
                this.show();
            },

            show: function () {
                this.getElement().style.display = 'block';

            },

            hide: function () {
                this.getElement().style.display = 'none';
            }
        },
        middleRating: {
            id: 'middle-rating',
            initialText: 'Middle rating: ',

            getElement: function () {
                return document.getElementById(this.id);
            },

            setMiddleRating: function (videosList) {
                var i, middleRating = 0;
                for (i = 0; i < videosList.length; i++) {
                    middleRating += parseInt(videosList[i].mark);
                }
                middleRating = parseInt(middleRating / videosList.length) + '%';

                this.getElement().innerHTML = this.initialText + middleRating;
                this.show();
            },

            show: function () {
                this.getElement().style.display = 'block';
            },

            hide: function () {
                this.getElement().style.display = 'none';
            }
        },
        titlesList: {
            id: 'videos-titles',
            initialText: 'Videos Titles: ',

            getElement: function () {
                return document.getElementById(this.id);
            },

            setTitles: function (videosList) {
                this.getElement().innerHTML = this.initialText;

                for (var i = 0; i < videosList.length; i++) {
                    var spanElement = document.createElement('span');
                    spanElement.innerHTML = videosList[i].title;
                    this.getElement().appendChild(spanElement);
                }

                this.show();
            },

            show: function () {
                this.getElement().style.display = 'block';
            },

            hide: function () {
                this.getElement().style.display = 'none';
            }
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
                serverApiMethods.makeSearchQuery(searchQueryValue);
                serverApiMethods.getQueryInfo(searchQueryValue);
            });
        },

        show: function () {
            this.getElement().parentNode.style.display = 'inline-block';
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

        getElement: function () {
            return document.getElementById(this.id);
        },

        onClickHandler: function () {
            this.getElement().addEventListener('click', function () {
                serverApiMethods.makeSearchQuery(currentPage.searchInput.getText());
                serverApiMethods.getQueryInfo(currentPage.searchInput.getText());
            });
        },

        show: function () {
            this.getElement().style.display = 'inline';
        },

        hide: function () {
            this.getElement().style.display = 'none';
        }
    },
    videosTable: {
        id: 'videos-table',

        getElement: function () {
            return document.getElementById(this.id);
        },

        getTableBody: function () {
            return document.querySelector('#' + this.id + ' tbody');
        },

        clear: function () {
            this.getTableBody().innerHTML = '';
        },

        show: function () {
            this.getElement().style.display = 'block';
            document.getElementById('table-title').style.display = 'block';
        },

        hide: function () {
            this.getElement().style.display = 'none';
            document.getElementById('table-title').style.display = 'none';
        },

        generateItem: function (title, mark, description) {
            var row = document.createElement('tr');

            var titleColumn = document.createElement('td');
            var markColumn = document.createElement('td');
            var descriptionColumn = document.createElement('td');
            var descriptionWrapper = document.createElement('div');

            titleColumn.innerHTML = title;
            markColumn.innerHTML = mark;
            descriptionWrapper.innerHTML = description;
            descriptionColumn.appendChild(descriptionWrapper);

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

            this.show();
        }
    }
};

currentPage.searchInput.clearText();
currentPage.searchInput.onInputHandler();
currentPage.searchInput.onEnterHandler();
currentPage.searchButton.onClickHandler();
