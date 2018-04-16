
var server = {
    request: function (requestObject) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (requestObject.hasOwnProperty('callback') && this.readyState === 4 && this.status === 200) {
                requestObject['callback'](JSON.parse(this.response));
            }
        };
        xhttp.open(requestObject['method'], requestObject['uri'], true);
        if (requestObject.hasOwnProperty('body')) {
            xhttp.send(this._createFormDataObject(requestObject['body']));
        } else {
            xhttp.send();
        }
    },

    _createFormDataObject(inputObject) {
        var outputObject = new FormData();
        for (var item in inputObject) if (inputObject.hasOwnProperty(item)) {
            outputObject.append(item, inputObject[item]);
        }
        return outputObject;
    }
};

var serverApiRoutes = {
    domain: 'http://localhost:8000',

    queries: {
        store: function () {
            return serverApiRoutes.domain + '/queries';
        },

        index: function () {
            return serverApiRoutes.domain + '/queries';
        },

        show: function (id) {
            return serverApiRoutes.domain + '/queries/' + id;
        }
    },

    getAllQueriesLis: function () {
        return serverApiRoutes.domain + '/queries'
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
    queries: {
        store: function (body, callback) {
            server.request({
                method: 'POST',
                uri: serverApiRoutes.queries.store(),
                body: body,
                callback: callback
            });
        },

        index: function (callback) {
            server.request({
                method: 'GET',
                uri: serverApiRoutes.queries.index(),
                callback: callback
            });
        },

        show: function(id, callback) {
            server.request({
                method: 'get',
                uri: serverApiRoutes.queries.show(id),
                callback: callback
            });
        }
    },


    // getAllQueriesLis: function () {
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState == 4 && this.status == 200) {
    //             var response = JSON.parse(this.response);
    //             currentPage.queriesList.setItems(response);
    //         }
    //     };
    //     xhttp.open("GET", serverApiRoutes.getAllQueriesLis(), true);
    //     xhttp.send();
    // },

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
        // currentPage.similarSearchQueriesList.hide();
        // currentPage.searchInput.setText(searchQuery);
        currentPage.loadingBar.show();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.response);
                // currentPage.videosTable.setItems(response);
                // serverApiMethods.getQueryInfo(searchQuery);
                currentPage.loadingBar.hide();
            }
        };
        xhttp.open("GET", serverApiRoutes.makeSearchQuery(searchQuery), true);
        xhttp.send();
    },

    getVideosByQuery: function (searchQuery) {
        currentPage.loadingBar.show();

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.response);
                currentPage.videosTable.setItems(response);
                // serverApiMethods.getQueryInfo(searchQuery);
                currentPage.loadingBar.hide();
            }
        };
        xhttp.open("GET", serverApiRoutes.getQueryInfo(searchQuery), true);
        xhttp.send();
    },

    getQueryInfo: function (searchQuery) {
        var xhttp = new XMLHttpRequest();
        currentPage.videosTable.hide();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var response = JSON.parse(this.response);

                currentPage.videosInfoBlock.amountInDatabase.setAmount(response);
                currentPage.videosInfoBlock.middleRating.setMiddleRating(response);
                currentPage.videosInfoBlock.titlesList.setTitles(response);
                currentPage.videosInfoBlock.show();
            }
        };
        xhttp.open("GET", serverApiRoutes.getQueryInfo(searchQuery), true);
        xhttp.send();
    }

};

var currentPage = {
    queriesList: {
        id: 'queries-list',
        selectedQueryId: '',

        getElement: function () {
            return document.getElementById(this.id);
        },

        getItems: function () {
            serverApiMethods.queries.index(function (response) {
                currentPage.queriesList._setItems(response);
            });
        },

        clear: function () {
            this.getElement().innerHTML = '';
        },

        _generateItem: function (id, text) {
            var newItem = document.createElement('span');
            newItem.innerHTML = text;
            newItem.setAttribute('data-id', id);

            return newItem;
        },

        _setItems: function (itemsList) {
            this.clear();

            for (var i = 0; i < itemsList.length; i++) {
                var newItem = this._generateItem(itemsList[i]['id'], itemsList[i]['value']);
                this._addItemClickHandler(newItem);
                this.getElement().appendChild(newItem);
            }
        },

        _addItemClickHandler: function (itemElement) {
            itemElement.addEventListener('click', function (event) {
                currentPage.queriesList.selectedQueryId = event.target.getAttribute('data-id');
                serverApiMethods.queries.show(currentPage.queriesList.selectedQueryId, function(response) {
                    console.log(response);
                });
                // serverApiMethods.getQueryInfo(currentPage.queriesList.selectedQueryId);
            });
        }
    },
    addNewQueryButton: {
        id: 'add-new-query-button',

        getElement: function () {
            return document.getElementById(this.id);
        },

        addClickEvent: function () {
            this.getElement().addEventListener('click', function () {
                var queryString = currentPage.newQueryInput.getText();
                currentPage.newQueryInput.clearText();
                if (queryString.length > 0) {
                    serverApiMethods.queries.store({
                        title: queryString
                    }, function () {
                        currentPage.queriesList.getItems();
                    });
                }
            });
        }
    },
    newQueryInput: {
        id: 'add-new-query-input',

        getElement: function () {
            return document.getElementById(this.id);
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
    loadingBar: {
        id: 'loading-bar-wrapper',

        getElement: function () {
            return document.getElementById(this.id);
        },

        show: function () {
            this.getElement().style.display = 'block';
        },

        hide: function () {
            this.getElement().style.display = 'none';
        }
    },
    searchInput: {
        id: 'search-input',

        getElement: function () {
            return document.getElementById(currentPage.searchInput.id);
        },

        addInputHandler: function () {
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

        addEnterHandler: function () {
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
        },

        showVideosButton: {
            id: 'show-videos',

            getElement: function () {
                return document.getElementById(this.id)
            },

            addClickEvent: function () {
                this.getElement().addEventListener('click', function () {
                    serverApiMethods.getVideosByQuery(currentPage.queriesList.selectedQueryId);
                });
            }
        },

        getElement: function () {
            return document.getElementsByClassName('result-wrapper')[0];
        },

        show: function () {
            this.getElement().style.display = 'block';
        },

        hide: function () {
            this.getElement().style.display = 'none';
        }
    },
    similarSearchQueriesList: {
        id: 'similar-search-queries-list',

        getElement: function () {
            return document.getElementById(this.id);
        },

        addItemsClickHandler: function (newItem) {
            newItem.addEventListener('click', function (event) {
                var searchQueryValue = event.target.getAttribute('data-value');
                serverApiMethods.makeSearchQuery(searchQueryValue);
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
                var newItem = this._generateItem(itemsList[i].value);
                this.addItemsClickHandler(newItem);
                this.getElement().appendChild(newItem);
            }

            itemsList.length > 0 ? this.show() : this.hide();
        },

        _generateItem: function (text) {
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

        addClickHandler: function () {
            this.getElement().addEventListener('click', function () {
                if (currentPage.searchInput.getText().length > 0) {
                    serverApiMethods.makeSearchQuery(currentPage.searchInput.getText());
                }
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

        _generateItem: function (title, mark, description) {
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
                var newItem = this._generateItem(
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

currentPage.queriesList.getItems();
currentPage.addNewQueryButton.addClickEvent();
currentPage.videosInfoBlock.showVideosButton.addClickEvent();
currentPage.newQueryInput.clearText();
currentPage.searchInput.clearText();
currentPage.searchInput.addInputHandler();
currentPage.searchInput.addEnterHandler();
currentPage.searchButton.addClickHandler();
