angular.module('meatcrawl', ['ngRoute'])
	.config(function($routeProvider, WeatherProvider){
		WeatherProvider.setApiKey('thisismykey')

		$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'MainController'
		})
		.when('/settings', {
			templateUrl: 'templates/settings.html',
			controller: 'SettingsController'
		})
		.otherwise({
			redirectTo: '/'
		})
	})
	.service('MainService', function($scope){

	})
	.service('UserService', function(){

	})
	.provider('Weather', function(){
		var weather = this;

		weather.apiKey = "";

		weather.setApiKey = function(key){
			if (key) weather.apiKey = key;
		};

		weather.getUrl = function(type, location){
			return "http://api.wunderground.com/api/" + weather.apiKey +
			"/" + type + "/q/" + location + ".json";
		}

		weather.$get = function($q, $http){
			var self = this;
			return {
				getWeatherForecast: function(city){
					var d = $q.defer();
					$http({
						method: "GET",
						url: self.getUrl("forecast", city),
						cache: true
					}).success(function(data){
						console.log("Success: ", data)
						d.resolve(data)
					}).error(function(error){
						d.reject(error)
					});
					return d.promise;
				}
			}
		}
	})
	.controller('MainController', function($scope, $timeout, Weather){
		var ctrl = this;

		ctrl.date = {};

		ctrl.updateTime = function(){
			ctrl.date.raw = new Date();
			$timeout(ctrl.updateTime, 1000);
		}

		ctrl.updateTime();

		ctrl.weather = {};

		Weather.getWeatherForecast("CA/San_Francisco").then(function(data){
			ctrl.weather.forecast = data;
		})

	})
	.controller('SettingsController', function($scope){
		var settings = this;

	})

