//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

angular.module('ionic-timepicker', ['ionic', 'ionic-timepicker.templates'])

// Defining `ionicTimepicker` directive
.directive('ionicTimepicker', ['$ionicPopup', function($ionicPopup) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            itime: '=itime', //time getting from a template
            format: '=format', //format getting from a template
            step: '=step' //step getting from a template
        },
        link: function(scope, element, attrs) {

            element.on("click", function() {

                var obj = {
                    time: scope.itime,
                    step: scope.step,
                    format: scope.format
                };

                scope.time = {
                    hours: 0,
                    minutes: 0,
                    meridian: ""
                };

                var objDate = new Date(obj.time); // time in milliseconds.

                scope.increaseHours = function() {
                    scope.time.hours = Number(scope.time.hours);
                    if (obj.format == 12) {
                        if (scope.time.hours != 12) {
                            scope.time.hours += 1;
                        } else {
                            scope.time.hours = 1;
                        }
                    }
                    if (obj.format == 24) {
                        if (scope.time.hours != 23) {
                            scope.time.hours += 1;
                        } else {
                            scope.time.hours = 0;
                        }
                    }
                    scope.time.hours = (scope.time.hours < 10) ? ('0' + scope.time.hours) : scope.time.hours;
                };

                scope.decreaseHours = function() {
                    scope.time.hours = Number(scope.time.hours);
                    if (obj.format == 12) {
                        if (scope.time.hours > 1) {
                            scope.time.hours -= 1;
                        } else {
                            scope.time.hours = 12;
                        }
                    }
                    if (obj.format == 24) {
                        if (scope.time.hours > 0) {
                            scope.time.hours -= 1;
                        } else {
                            scope.time.hours = 23;
                        }
                    }
                    scope.time.hours = (scope.time.hours < 10) ? ('0' + scope.time.hours) : scope.time.hours;
                };

                scope.increaseMinutes = function() {
                    scope.time.minutes = Number(scope.time.minutes);

                    if (scope.time.minutes != (60 - obj.step)) {
                        scope.time.minutes += obj.step;
                    } else {
                        scope.time.minutes = 0;
                    }
                    scope.time.minutes = (scope.time.minutes < 10) ? ('0' + scope.time.minutes) : scope.time.minutes;
                };

                scope.decreaseMinutes = function() {
                    scope.time.minutes = Number(scope.time.minutes);
                    if (scope.time.minutes !== 0) {
                        scope.time.minutes -= obj.step;
                    } else {
                        scope.time.minutes = 60 - obj.step;
                    }
                    scope.time.minutes = (scope.time.minutes < 10) ? ('0' + scope.time.minutes) : scope.time.minutes;
                };

                if (obj.format == 12) {

                    scope.time.meridian = (objDate.getHours() >= 12) ? "下午" : "上午";
                    scope.time.hours = (objDate.getHours() > 12) ? ((objDate.getHours() - 12)) : (objDate.getHours());
                    scope.time.minutes = (objDate.getMinutes());

                    if (scope.time.hours === 0 && scope.time.meridian == "上午") {
                        scope.time.hours = 12;
                    }

                    scope.changeMeridian = function() {
                        scope.time.meridian = (scope.time.meridian === "上午") ? "下午" : "上午";
                    };

                    $ionicPopup.show({
                        cssClass: 'ionic-timepicker',
                        templateUrl: 'time-picker-12-hour.html',
                        title: '<strong>12小时格式</strong>',
                        subTitle: '',
                        scope: scope,
                        buttons: [{
                            text: '关闭'
                        }, {
                            text: '设置',
                            type: 'button-positive',
                            onTap: function(e) {
                                scope.loadingContent = true;

                                function hoursConvert(hours, meridian) {
                                    if (meridian === "下午") {
                                        hours += 12;
                                    }
                                    return hours % 24;
                                }
                                var timeStr = hoursConvert(scope.time.hours, scope.time.meridian) + ":" + scope.time.minutes;
                                var dateStr = objDate.getFullYear() + "-" + (objDate.getMonth() + 1) + "-" + objDate.getDate();
                                if (isNaN(tmpItime)) { //for ios
                                    tmpItime = Date.parse(dateStr.replace(/-/g, '/') + " " + timeStr);
                                }
                                scope.itime = tmpItime;
                            }
                        }]
                    });

                }

                if (obj.format == 24) {

                    scope.time.hours = ((objDate.getHours()) < 10) ? ('0' + (objDate.getHours()) : (objDate.getHours());
                    scope.time.minutes = ((objDate.getMinutes() < 10) ? ('0' + (objDate.getMinutes()) : (objDate.getMinutes());


                    $ionicPopup.show({
                        cssClass: 'ionic-timepicker',
                        templateUrl: 'time-picker-24-hour.html',
                        title: '<strong>24小时格式</strong>',
                        subTitle: '',
                        scope: scope,
                        buttons: [{
                            text: '关闭'
                        }, {
                            text: '设置',
                            type: 'button-positive',
                            onTap: function(e) {

                                scope.loadingContent = true;
                                var timeStr = scope.time.hours + ":" + scope.time.minutes;
                                var dateStr = objDate.getFullYear() + "-" + (objDate.getMonth() + 1) + "-" + objDate.getDate();
                                var tmpItime = Date.parse(dateStr + " " + timeStr);

                                if (isNaN(tmpItime)) { //for ios
                                    tmpItime = Date.parse(dateStr.replace(/-/g, '/') + " " + timeStr);
                                }
                                scope.itime = tmpItime;
                            }
                        }]
                    });
                }
            });

        }
    };
}]);
