// Generated by CoffeeScript 1.9.0
var app;

app = angular.module("linear-learning", ["ui.router", "ui.bootstrap", 'ngStorage', 'ngTouch', 'cfp.hotkeys', 'ngSanitize', 'angulartics', 'angulartics.google.analytics']);

app.config([
  "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider.state("contentIndex", {
      url: "/",
      controller: "ItemListerCtrl",
      templateUrl: "templates/item-lister.template.html"
    }).state("test", {
      url: "/test/:itemId",
      controller: "TestCtrl",
      templateUrl: "templates/test.template.html",
      resolve: {
        verses: function($http, $stateParams) {
          return $http.get("learn/" + $stateParams.itemId + ".json");
        }
      }
    }).state("learn", {
      url: "/learn/:itemId",
      controller: "LearnCtrl",
      templateUrl: "templates/learn.template.html",
      resolve: {
        verses: function($http, $stateParams) {
          return $http.get("learn/" + $stateParams.itemId + ".json");
        }
      }
    }).state("howto", {
      url: "/howto/:itemId",
      controller: "HowtoCtrl",
      templateUrl: "templates/howto.template.html"
    }).state("results", {
      url: "/results/:itemId",
      controller: "ResultsCtrl",
      templateUrl: "templates/results.template.html"
    });
  }
]);

// Generated by CoffeeScript 1.9.0
app.constant("historyExpiration", 1409511179962);

app.factory("History", function($localStorage, $stateParams, historyExpiration) {
  var History;
  return new (History = (function() {
    function History() {
      var id;
      id = $stateParams.itemId;
      this.getHistoryData = function() {
        return $localStorage[$stateParams.itemId].historyData;
      };
      this.clear = function() {
        $localStorage.historyReset = (new Date).getTime();
        if ($localStorage[id] == null) {
          $localStorage[id] = {};
        }
        return $localStorage[id].historyData = {
          historyLength: 0,
          maxHistoryLength: 15,
          history: {}
        };
      };
      if (($localStorage[id] == null) || ($localStorage[id].historyData == null) || ($localStorage.historyReset == null) || $localStorage.historyReset < this.historyExpiration) {
        this.clear();
      }
    }

    History.prototype.add = function(listOfIncorrect) {
      var historyData, i, j, _i, _j, _len, _len1, _ref, _results;
      historyData = this.getHistoryData();
      historyData.historyLength += 1;
      for (_i = 0, _len = listOfIncorrect.length; _i < _len; _i++) {
        i = listOfIncorrect[_i];
        if (historyData.history[i] == null) {
          historyData.history[i] = 0;
        }
        historyData.history[i] += 1;
      }
      if (historyData.historyLength >= historyData.maxHistoryLength) {
        historyData.historyLength -= 1;
      }
      _ref = historyData.history;
      _results = [];
      for (j = _j = 0, _len1 = _ref.length; _j < _len1; j = ++_j) {
        i = _ref[j];
        if (j > 0) {
          _results.push(historyData.history[i] -= 1);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    History.prototype.colors = function() {
      var cssColor, historyData, i, wrong, _ref;
      historyData = this.getHistoryData();
      cssColor = {};
      if (historyData.historyLength > 0) {
        _ref = historyData.history;
        for (i in _ref) {
          wrong = _ref[i];
          cssColor[i] = "hsla(" + (116 * (1 - (wrong / historyData.historyLength))) + ", 100%, 45%, .4)";
        }
      }
      return cssColor;
    };

    return History;

  })());
});

// Generated by CoffeeScript 1.9.0
app.value("mobile", /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)));

// Generated by CoffeeScript 1.9.0
app.service("LocalVerseData", function($http, $stateParams, $q) {
  var audioDeffered, deffered;
  deffered = $q.defer();
  audioDeffered = $q.defer();
  $http.get("learn/" + $stateParams.itemId + ".json").success(function(data) {
    return deffered.resolve(data);
  });
  this.verses = deffered.promise;
  return true;
});

// Generated by CoffeeScript 1.9.0
app.factory("VerseHandler", function(LocalVerseData, VerseLocalStorage) {
  var VerseHandler;
  return new (VerseHandler = (function() {
    function VerseHandler() {}

    VerseHandler.prototype.reload = function() {
      LocalVerseData.verses.then((function(_this) {
        return function(data) {
          _this.verses = data.listToLearn;
          _this.meanings = data.listOfMeaning;
          _this.title = data.title;
          _this.length = Object.keys(_this.verses).length;
          _this.audioURL = data.audioURL ? data.audioURL + "#t=" : void 0;
          return _this.audioTimes = data.audioTimes;
        };
      })(this));
      this.state = VerseLocalStorage.getState();
      if (this.state.currentPosition == null) {
        this.state.currentPosition = 0;
      }
      this.hasNext = function() {
        if (this.state.currentPosition + 2 <= this.length) {
          return true;
        } else {
          return false;
        }
      };
      this.hasPrev = function() {
        if (this.state.currentPosition > -1) {
          return true;
        } else {
          return false;
        }
      };
      this.next = function() {
        if (this.hasNext()) {
          return this.state.currentPosition += 1;
        }
      };
      this.prev = function() {
        if (this.hasPrev()) {
          return this.state.currentPosition -= 1;
        }
      };
      this.getVerse = function() {
        return this.verses[this.state.currentPosition];
      };
      this.getMeaning = function() {
        return this.meanings[this.state.currentPosition];
      };
      this.getAudioSegmentSrc = function() {
        var time;
        if (this.audioURL) {
          time = this.audioTimes[this.state.currentPosition];
          return this.audioURL + time;
        }
      };
      this.peekNextVerse = function() {
        if (this.hasNext()) {
          return this.verses[this.state.currentPosition + 1];
        }
      };
      this.peekNextMeaning = function() {
        if (this.hasNext()) {
          return this.meanings[this.state.currentPosition + 1];
        }
      };
      return this.setPosition = function(location) {
        if (location != null) {
          location = parseInt(location);
        }
        if (angular.isNumber(location && location < this.length && location > -1)) {
          return this.state.currentPosition = location;
        }
      };
    };

    return VerseHandler;

  })());
});

// Generated by CoffeeScript 1.9.0
app.service("VerseLocalStorage", function($localStorage, $stateParams) {
  this.getState = function() {
    return $localStorage[$stateParams.itemId];
  };
  return false;
});

app.factory('throttle', function ($timeout) {
  return function (fn, threshhold, scope) {
    threshhold = threshhold || 250;
    var last, promise;
    return function throttle () {
      var context = scope || this;
      var now = Date.now(),
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        $timeout.cancel(promise);
        promise = $timeout(function throttleTimeout () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  };
});
// Generated by CoffeeScript 1.9.0
app.directive('animateOnChange', function($animate, $compile) {
  var watchers;
  watchers = {};
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      watchers[scope.$id] && watchers[scope.$id]();
      return watchers[scope.$id] = scope.$watch(attrs.animateOnChange, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          $animate.enter($compile(element.clone())(scope), element.parent(), element);
          element.html(oldValue);
          return $animate.leave(element);
        }
      });
    }
  };
});

// Generated by CoffeeScript 1.9.0
app.directive("fullCoverImage", function() {
  return function(scope, element, attrs) {
    element.css("background-image", "url(" + attrs.fullCoverImage + ")");
    return element.addClass("full-bg");
  };
});

app.controller("ItemListerCtrl", [
  "$scope", "$http", function($scope, $http) {
    return $http.get("./learn/index.json").success(function(data) {
      return $scope.items = data;
    });
  }
]);

app.constant("storageExpiration", 1416095403068);

app.controller("TestCtrl", [
  "$scope", '$stateParams', "$location", '$localStorage', 'hotkeys', 'History', 'storageExpiration', "verses", function($scope, $stateParams, $location, storage, hotkeys, history, storageExpiration, verses) {
    var bindHotkeys, colors, defaults, id, incorrect, k, nextInLink, nextState, previousInLink, v;
    id = "" + $stateParams.itemId;
    $scope.state = "loading";
    $scope.hint = false;
    bindHotkeys = function() {
      return hotkeys.bindTo($scope).add({
        combo: 'u',
        description: 'Undo',
        callback: function() {
          return $scope.undo();
        }
      }).add({
        combo: 'c',
        description: 'Correct answer',
        callback: function() {
          return $scope.submitAnswer("correct");
        }
      }).add({
        combo: 'x',
        description: 'Wrong answer',
        callback: function() {
          return $scope.submitAnswer("incorrect");
        }
      }).add({
        combo: 'r',
        description: 'Restart',
        callback: function() {
          return $scope.restart();
        }
      }).add({
        combo: 's',
        description: 'Show Answer',
        callback: function() {
          return $scope.showAnswer();
        }
      }).add({
        combo: 'space',
        description: 'Show Answer',
        callback: function() {
          return $scope.showAnswer();
        }
      }).add({
        combo: 'm',
        description: 'Show Meaning',
        callback: function() {
          return $scope.toggleMeaning();
        }
      }).add({
        combo: 'h',
        description: 'Show Hint',
        callback: function() {
          return $scope.showHint();
        }
      }).add({
        combo: 'e',
        description: 'Empty History',
        callback: function() {
          return $scope.emptyHistory();
        }
      });
    };
    bindHotkeys();
    defaults = {
      "currentPosition": 0,
      "displayMeaning": false,
      "incorrect": [],
      "listToLearn": verses.data.listToLearn,
      "listOfMeaning": verses.data.listOfMeaning
    };
    if (storage[id] == null) {
      storage[id] = {};
    }
    for (k in defaults) {
      v = defaults[k];
      if (storage[id][k] == null) {
        storage[id][k] = v;
      }
    }
    console.log(storage[id]);
    incorrect = storage[id]["incorrect"];
    $scope.currentPosition = storage[id]["currentPosition"] != null ? storage[id]["currentPosition"] : 0;
    $scope.displayMeaning = storage[id]["displayMeaning"];
    colors = {};
    $scope.emptyHistory = function() {
      history.clear();
      return colors = history.colors();
    };
    $scope.home = function() {
      return $location.path("/");
    };
    $scope.listToLearn = verses.data.listToLearn;
    $scope.listOfMeaning = verses.data.listOfMeaning;
    $scope.title = verses.data.title;
    $scope.state = "show";
    colors = history.colors();
    $scope.getColor = function() {
      return {
        "background-color": $scope.state === "show" ? colors[$scope.currentPosition] : void 0
      };
    };
    $scope.showAnswer = function() {
      if ($scope.state === "end") {
        $location.path("results/" + id);
      }
      return $scope.state = "answer";
    };
    $scope.toggleMeaning = function() {
      return $scope.displayMeaning = !$scope.displayMeaning;
    };
    nextState = function() {
      $scope.hint = false;
      if ($scope.currentPosition + 2 < $scope.listToLearn.length) {
        $scope.currentPosition += 1;
        storage[id]["currentPosition"] = $scope.currentPosition;
        return $scope.state = "show";
      } else {
        return $scope.state = "end";
      }
    };
    $scope.showHint = function() {
      return $scope.hint = true;
    };
    $scope.getHint = function() {
      if ($scope.state === "show") {
        return nextInLink().slice(0, 15);
      } else {
        return "";
      }
    };
    $scope.submitAnswer = function(result) {
      if ($scope.state === "answer") {
        if (result !== "correct") {
          incorrect.push($scope.currentPosition);
        }
        return nextState();
      }
    };
    previousInLink = function(meaning) {
      if ((meaning != null)) {
        return $scope.listOfMeaning[$scope.currentPosition];
      } else {
        return $scope.listToLearn[$scope.currentPosition];
      }
    };
    nextInLink = function(meaning) {
      if ((meaning != null)) {
        return $scope.listOfMeaning[$scope.currentPosition + 1];
      } else {
        return $scope.listToLearn[$scope.currentPosition + 1];
      }
    };
    $scope.linkPrevious = function() {
      if ($scope.state !== "loading") {
        return previousInLink();
      } else {
        return "Loading";
      }
    };
    $scope.linkTest = function() {
      if ($scope.state === "loading") {
        return "Loading";
      } else if ($scope.state === "answer") {
        return nextInLink();
      } else {
        return previousInLink();
      }
    };
    $scope.meaning = function() {
      if ($scope.state === "loading") {
        return "Loading";
      } else if ($scope.state === "answer") {
        return nextInLink(true);
      } else {
        return previousInLink(true);
      }
    };
    $scope.showResults = function() {
      return $location.path("results/" + id);
    };
    $scope.restart = function() {
      storage[id]["currentPosition"] = 0;
      storage[id]["incorrect"] = [];
      $scope.currentPosition = storage[id]["currentPosition"];
      incorrect = storage[id]["incorrect"];
      return $scope.state = "show";
    };
    if (storage[id].restart === true) {
      $scope.restart();
      storage[id].restart = false;
    }
    return $scope.undo = function() {
      if ($scope.currentPosition > -1) {
        if (incorrect.length > 0 && incorrect[incorrect.length - 1] === $scope.currentPosition) {
          incorrect.pop();
        }
        $scope.currentPosition -= 1;
        return $scope.state = "answer";
      }
    };
  }
]);

app.controller("HowtoCtrl", [
  "$scope", '$stateParams', function($scope, $stateParams) {
    return $scope.itemId = $stateParams.itemId;
  }
]);

app.controller("LearnCtrl", function($scope, VerseHandler, VerseLocalStorage, mobile, hotkeys, History) {
  var colors, storage;
  $scope.bg = "img/feet.jpg";
  $scope.mobile = mobile;
  $scope.displayMeaning = false;
  $scope.state = "show";
  storage = VerseLocalStorage.getState();
  VerseHandler.reload();
  colors = History.colors();
  $scope.home = function() {
    return $location.path("/");
  };
  $scope.jumpTo = function(location) {
    location = parseInt(location);
    VerseHandler.setPosition(location);
    return $scope.isCollapsed = true;
  };
  $scope.getColor = function() {
    return {
      "background-color": $scope.state === "show" ? colors[VerseHandler.currentPosition] : "#eee"
    };
  };
  $scope.toggleMeaning = function() {
    return $scope.displayMeaning = !$scope.displayMeaning;
  };
  $scope.verse = function() {
    return VerseHandler.getVerse();
  };
  $scope.meaning = function() {
    return VerseHandler.getMeaning();
  };
  $scope.next = function($event) {
    $event.stopPropagation();
    VerseHandler.next();
    return false;
  };
  $scope.prev = function($event) {
    $event.stopPropagation();
    VerseHandler.prev();
    return false;
  };
  $scope.getAudioSegmentSrc = function() {
    console.log("ASfd", VerseHandler.getAudioSegmentSrc());
    return VerseHandler.getAudioSegmentSrc();
  };
  return hotkeys.bindTo($scope).add({
    combo: 'space',
    description: 'Next',
    callback: function() {
      return $scope.next();
    }
  });
});

app.controller("ResultsCtrl", [
  "$scope", "$localStorage", '$stateParams', '$http', 'dateFilter', "$window", "History", function($scope, storage, $stateParams, $http, dateFilter, $window, history) {
    var now, state, today;
    $scope.id = $stateParams.itemId;
    state = storage[$scope.id];
    $scope.buttonColor = "btn-primary";
    $scope.incorrect = state.incorrect.map(function(id) {
      return {
        next: state.listToLearn[id + 1],
        previous: state.listToLearn[id]
      };
    });
    $scope.quizletText = "Export to Quizlet";
    state.restart = true;
    now = new Date();
    history.add(state.incorrect);
    $scope.exportQuizlet = function() {
      if ($scope.quizletUrl == null) {
        return $http.post("http://amma-archana.herokuapp.com/quizlet.php", {
          "title": $scope.id + " - " + (today()),
          "terms": $scope.incorrect.map(function(term) {
            return term.previous;
          }),
          "definitions": $scope.incorrect.map(function(term) {
            return term.next;
          }),
          "lang_terms": "en",
          "lang_definitions": "en",
          "allow_discussion": 0,
          "visibility": "public"
        }).success(function(data) {
          $scope.buttonColor = "btn-success";
          $scope.quizletUrl = data["url"];
          return $scope.quizletText = "Checkout your deck!";
        }).error(function() {
          $scope.buttonColor = "btn-danger";
          $scope.quizletUrl = "";
          return $scope.quizletText = "Could not create deck. Mistakes will be colored in next run.";
        });
      } else {
        return $window.open($scope.quizletUrl);
      }
    };
    return today = function() {
      return dateFilter(new Date(), "MMM dd yyyy");
    };
  }
]);
