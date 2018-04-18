var server = {
    request: function (requestObject) {
        var xhttp = new XMLHttpRequest();
        currentPage.loadingBar.show();

        xhttp.onreadystatechange = function () {
            if (requestObject.hasOwnProperty('callback') && this.readyState === 4 && this.status === 200) {
                currentPage.loadingBar.hide();
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

    videos: {
        searchVideos: function (query) {
            return serverApiRoutes.domain + '/search-videos/' + query
        },

        getVideosByQueryId: function (id) {
            return serverApiRoutes.domain + '/get-videos-by-query/' + id
        }
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

        show: function (id, callback) {
            server.request({
                method: 'get',
                uri: serverApiRoutes.queries.show(id),
                callback: callback
            });
        }
    },

    videos: {
        searchVideos: function (query, callback) {
            server.request({
                method: 'post',
                uri: serverApiRoutes.videos.searchVideos(query),
                callback: callback
            });
        },

        getVideosByQueryId: function (id, callback) {
            server.request({
                method: 'get',
                uri: serverApiRoutes.videos.getVideosByQueryId(id),
                callback: callback
            });
        }
    }
};

var currentPage = {
    queriesList: {
        id: 'queries-list',
        selectedQueryId: '',
        videosList: [],

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
                currentPage.videosTable.hide();
                currentPage.noVideosText.hide();
                currentPage.videosInfoBlock.hide();
                currentPage.queriesList.selectedQueryId = event.target.getAttribute('data-id');
                serverApiMethods.queries.show(currentPage.queriesList.selectedQueryId, function () {

                    serverApiMethods.videos.searchVideos(event.target.innerHTML, function () {

                        serverApiMethods.videos.getVideosByQueryId(currentPage.queriesList.selectedQueryId, function (response) {
                            if(response.length > 0) {
                                currentPage.videosInfoBlock.setInfo(response);
                                currentPage.videosInfoBlock.show();
                                currentPage.queriesList.videosList = response;
                            } else {
                                currentPage.noVideosText.show();
                            }
                        });
                    });
                });
            });
        }
    },
    noVideosText: {
        id: 'no-videos',

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
    videosInfoBlock: {
        setInfo: function (videos) {
            currentPage.videosInfoBlock.amountInDatabase.setAmount(videos);
            currentPage.videosInfoBlock.middleRating.setMiddleRating(videos);
            currentPage.videosInfoBlock.titlesList.setTitles(videos);
            currentPage.videosInfoBlock.show();
        },

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
                    middleRating += videosList[i].mark ? parseInt(videosList[i].mark) : 0;
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
                // document.getElementById('videos-table').style.display = 'block';
            },

            hide: function () {
                this.getElement().style.display = 'none';
                // document.getElementById('videos-table').style.display = 'none';
            }
        },

        showVideosButton: {
            id: 'show-videos',

            getElement: function () {
                return document.getElementById(this.id)
            },

            addClickEvent: function () {
                this.getElement().addEventListener('click', function () {
                    currentPage.videosTable.setItems(currentPage.queriesList.videosList)
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
                if (itemsList[i].title && parseInt(itemsList[i].mark) >= 0) {
                    var newItem = this._generateItem(
                        itemsList[i].title,
                        parseInt(itemsList[i].mark) + '%',
                        itemsList[i].description
                    );
                    this.getTableBody().appendChild(newItem);
                }

            }

            this.show();
        }
    }
};

currentPage.queriesList.getItems();
currentPage.addNewQueryButton.addClickEvent();
currentPage.videosInfoBlock.showVideosButton.addClickEvent();
currentPage.newQueryInput.clearText();
