Stripe.setPublishableKey("pk_live_nGCzNyBi6ZScbVpXcr8d0SwH");
var avaanaApp = angular
  .module("avaanaApp", [
    "ui.router",
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "slick",
    "ngSanitize",
    "mdPickers",
    "ui.bootstrap",
    "avaanaService",
    "ui.calendar",
    "angularSpinners",
    "ngImgCrop",
    "infinite-scroll",
    "ngMeta",
    "angularPayments",
    "720kb.socialshare"
  ])
  .run(function ($rootScope, $location, $window, $state, $timeout, ngMeta) {
    ngMeta.init();
  })
  .filter("timeformat", function () {
    return function (input) {
      var str = input;
      var res = str.toString().split(" ");
      if (res.includes("day") || res.includes("days")) {
        return str;
      }
      if (
        res[1] == "Hour" ||
        res[1] == "Hours" ||
        res[1] == "hrs" ||
        res[1] == "hr" ||
        res[1] == "Hrs" ||
        res[1] == "Hr"
      ) {
        if (
          res.includes("minute") ||
          res.includes("minutes") ||
          res.includes("mins") ||
          res.includes("min")
        ) {
          return parseInt(res[0]) * 60 + parseInt(res[2]);
        } else {
          return parseInt(res[0]) * 60;
        }
      } else {
        return parseInt(res[0]);
      }
    };
  })
  .filter("range", function () {
    return function (input, total) {
      var total = Math.round(total);
      for (var i = 0; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  })
  .filter("rate_us_test", function () {
    return function (input) {
      appointment_date = new Date(input.appointment_date);
      appointment_time = input.appointment_start_time.split(/[\s:]+/);
      if (appointment_time[3] == "PM") {
        appointment_time[0] = appointment_time[0] + 12;
      }
      appointment_date.setHours(appointment_time[0]);
      appointment_date.setMinutes(appointment_time[1]);
      current_date = new Date();
      return appointment_date > current_date ? false : true;
    };
  })
  .filter("convertHours_Minutes", function (type) {
    return function (input) {
      if (type == "start_hours" || type == "end_hours") {
        if (input.substr(6, 2) == "PM") {
          if (input.substr(0, 2) == "12") {
            return parseInt(input.substr(0, 2));
          }
          return parseInt(input.substr(0, 2)) + 12;
        } else if (input.substr(0, 2) == "12" && input.substr(6, 2) == "AM") {
          return 0;
        } else {
          return input.substr(0, 2);
        }
      } else if (type == "start_min" || type == "end_min") {
        return input.substr(3, 2);
      }
    };
  })
  .filter("capitalize", function () {
    return function (input) {
      if (typeof input != "undefined") {
        input = input.replace(/-/g, " ");
        return input
          .toLowerCase()
          .split(/[\s[\]]+/)
          .map(function (word) {
            return word[0].toUpperCase() + word.substr(1);
          })
          .join(" ");
      }
    };
  })
  .filter("lower", function () {
    return function (input) {
      if (typeof input != "undefined") {
        return input
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.toLowerCase();
          })
          .join("-");
      }
    };
  })
  .filter("dateOffset", function () {
    return function (input) {
      input.setTime(input.getTime() + input.getTimezoneOffset() * 60 * 1000);
      return input;
    };
  })
  .directive("footerNew", function () {
    return {
      templateUrl: "static/templates/footer.html"
    };
  })
  .directive("md-label-icon", function () {
    return {
      restrict: "EA",
      link: function ($scope, element, attributes) {
        // console.log(element, attributes);
      }
    };
  })
  // .constant('apiUrl', 'http://127.0.0.1:8000/api/') //Local URL
  .constant('apiUrl', 'https://avaana.com.au/api/') //dev URL 
  // .constant("apiUrl", "https://dev.avaana.com.au/api/") //dev URL
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    "$httpProvider",
    "$locationProvider",
    "ngMetaProvider",
    function (
      $stateProvider,
      $urlRouterProvider,
      $httpProvider,
      $locationProvider,
      ngMetaProvider
    ) {
      ngMetaProvider.useTitleSuffix(true);
      ngMetaProvider.setDefaultTitle(
        "Avaana: Book health, fitness and wellbeing online 24/7 "
      );
      ngMetaProvider.setDefaultTag("author", "Avaana");
      ngMetaProvider.setDefaultTag(
        "description",
        "This is the default description"
      );
      $stateProvider
        .state("app", {
          url: "",
          views: {
            main: {
              templateUrl: "static/templates/app.html?v=9",
              controller: "appCtrl"
            }
          },
          authentication: false
        })
        .state("app.home", {
          url: "/",
          views: {
            content: {
              templateUrl: "static/templates/home.html?v=9",
              controller: "homeCtrl"
            },
            searchBar: {
              templateUrl: "static/templates/home_search.html?v=9"
            },
            sponsored: {
              templateUrl: "static/templates/sponsored.html?v=9"
            }
          },
          authentication: false
        })

        .state("app.landingpage", {
          url: "/list-your-business",
          views: {
            content: {
              templateUrl: "static/templates/landingpage.html?v=9",
              controller: "landingpageCtrl"
            }
          },
          authentication: false
        })

        .state("app.listyourbusiness", {
          url: "/list-your-business-form/:keys",
          views: {
            content: {
              templateUrl: "static/templates/listyourbusiness_new.html?v=9",
              controller: "listBusinessCtrl_new"
            }
          },
          authentication: true
        })

        .state("app.userDashboard", {
          url: "/user-dashboard",
          views: {
            content: {
              templateUrl: "static/templates/userDashboard.html?v=9",
              controller: "userDashboardCtrl"
            }
          },
          authentication: false
        })

        .state("app.businessDashboard", {
          url: "/business-dashboard",
          views: {
            content: {
              templateUrl: "static/templates/businessDashboard.html?v=9",
              controller: "businessDashboardCtrl"
            }
          },
          authentication: false
        })

        .state("app.businessDashboard2", {
          url: "/business-dashboard2",
          views: {
            content: {
              templateUrl: "static/templates/businessDashboard2.html?v=9",
              controller: "businessDashboardCtrl"
            }
          },
          authentication: false
        })

        .state("app.forgotPassword", {
          url: "/forgot-password",
          views: {
            content: {
              templateUrl: "static/templates/forgotpassword.html?v=9",
              controller: "forgotPasswordCtrl"
            }
          }
        })

        .state("app.login", {
          url: "/login/:from/:key/:slug/:appoint_slug",
          views: {
            content: {
              templateUrl: "static/templates/login.html?v=9",
              controller: "loginCtrl"
            }
          },
          authentication: false
        })

        .state("app.map", {
          url: "/map",
          views: {
            content: {
              templateUrl: "static/templates/map.html?v=9",
              controller: "mapCtrl"
            }
          },
          authentication: false
        })

        .state("app.planpricing", {
          url: "/plan-pricing",
          views: {
            content: {
              templateUrl: "static/templates/planpricing.html?v=9",
              controller: "planpricingCtrl"
            }
          },
          authentication: false
        })

        .state("app.register", {
          url: "/register",
          views: {
            content: {
              templateUrl: "static/templates/register.html?v=9",
              controller: "registerCtrl"
            }
          },
          authentication: false
        })

        .state("app.payment", {
          url: "/:slug/checkout/:key/:appoint_slug",
          views: {
            content: {
              templateUrl: "static/templates/payment_new.html?v=9",
              controller: "paymentCtrl"
            },
            searchBar: {
              templateUrl: "static/templates/no-srcbar.html?v=9"
            }
          },
          authentication: true
        })
        .state("app.booking", {
          url: "/:slug/booking/:key/:date",
          views: {
            content: {
              templateUrl: "static/templates/booking.html?v=9",
              controller: "bookingCtrl"
            },
            searchBar: {
              templateUrl: "static/templates/no-srcbar.html?v=9"
            }
          },
          authentication: true
        })

        .state("reviews", {
          url: "/reviews/:key/:slug",
          views: {
            main: {
              templateUrl: "static/templates/review.html?v=9",
              controller: "reviewCtrl"
            }
          }
        })

        .state("activateAccount", {
          url: "/activate-account/:slug",
          views: {
            main: {
              templateUrl: "static/templates/activate_account.html?v=9",
              controller: "accountActivateCtrl"
            }
          }
        })

        .state("app.checkoutConfirm", {
          url: "/:appointment_id/confirm",
          views: {
            content: {
              templateUrl: "static/templates/checkoutConfirm.html?v=9",
              controller: "checkoutConfirmCtrl"
            },
            searchBar: {
              templateUrl: "static/templates/no-srcbar.html?v=9"
            }
          },
          authentication: false
        })

        .state("app.provider", {
          url: "/:provider_name/:subhurb",
          views: {
            content: {
              templateUrl: "static/templates/provider.html?v=9",
              controller: "providerCtrl"
            },
            searchBar: {
              templateUrl: "static/templates/searchBar.html?v=9"
            }
          },
          authentication: false
        })

        .state("app.custom-mobile", {
          url: "/custom-mobile",
          views: {
            content: {
              templateUrl: "static/templates/custom-mobile.html?v=9",
              controller: "homeCtrl"
            },
            searchBar: {
              templateUrl: "static/templates/home_search.html?v=9"
            },
            sponsored: {
              templateUrl: "static/templates/sponsored.html?v=9"
            }
          },
          authentication: false
        })

        .state("app.search_result", {
          url: "/:service/:location/:post_code",
          views: {
            content: {
              templateUrl: "static/templates/search_result.html?v=9",
              controller: "searchResultCtrl"
            },
            searchBar: {
              templateUrl: "static/templates/searchBar.html?v=9"
            },
            sponsored: {
              templateUrl: "static/templates/sponsored.html?v=9"
            }
          },
          data: {
            meta: {
              title: ":service in :location :post_code",
              "og:title": "All You Need To Know About Pet Vaccinations",
              "og:description":
                "Useful information about Routine Vaccines and Boosters for dogs and cats,   including start vaccines for puppies and kittens."
            },
            head: {
              canonical: "https://avaana.com.au/:service/:location"
            }
          },
          authentication: false
        })

        .state("app.terms", {
          url: "/booking-terms",
          views: {
            content: {
              templateUrl: "static/templates/term-condition.html?v=9",
              controller: ""
            }
          },
          authentication: false
        })

        .state("app.privacy_policy", {
          url: "/privacy-policy",
          views: {
            content: {
              templateUrl: "static/templates/privacy-policy.html?v=9",
              controller: ""
            }
          },
          authentication: false
        })

        .state("app.provider_terms", {
          url: "/provider-terms",
          views: {
            content: {
              templateUrl: "static/templates/provider-term.html?v=9",
              controller: ""
            }
          },
          authentication: false
        })

        .state("app.community_guidelines", {
          url: "/community-guidelines",
          views: {
            content: {
              templateUrl: "static/templates/community-guidelines.html?v=9",
              controller: ""
            }
          },
          authentication: false
        })
        .state("app.notsupport", {
          url: "/notsupport",
          views: {
            content: {
              templateUrl: "static/templates/notsupported.html?v=9",
              controller: ""
            }
          },
          authentication: false
        })
        .state("app.not_found", {
          url: "/404",
          views: {
            content: {
              templateUrl: "static/templates/404.html?v=9"
            }
          },
          authentication: false
        })
        .state("app.live-bookings", {
          url: "/live-bookings",
          views: {
            content: {
              templateUrl: "static/templates/live-bookings.html?v=9"
              // controller: "marketPlaceBookingsCtrl"
            }
          },
          authentication: false
        })
        .state("app.edit_account_details", {
          url: "/edit-account-details?edit&id",
          views: {
            content: {
              templateUrl: "static/templates/edit_account_details.html?v=9",
              controller: "editAccountDetailsCtrl"
            }
          },
          authentication: false
        })
        .state("app.marketplace-bookings", {
          url: "/marketplace-bookings",
          views: {
            content: {
              templateUrl: "static/templates/marketplace-bookings.html?v=9",
              controller: "marketPlaceBookingsCtrl"
            }
          },
          authentication: false
        });

      $urlRouterProvider.otherwise("/404");
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix("!");
    }
  ])
  .config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
      return date ? moment(date).format("ddd, DD/MM/YYYY") : "";
    };
  })
  .run(function ($rootScope) {
    $rootScope.Modernizr = Modernizr;
    var BrowserDetect = {
      init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version =
          this.searchVersion(navigator.userAgent) ||
          this.searchVersion(navigator.appVersion) ||
          "Unknown";
      },
      searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
          var dataString = data[i].string;
          this.versionSearchString = data[i].subString;
          if (dataString.indexOf(data[i].subString) !== -1) {
            return data[i].identity;
          }
        }
      },
      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
          return;
        }
        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
          return parseFloat(dataString.substring(rv + 3));
        } else {
          return parseFloat(
            dataString.substring(index + this.versionSearchString.length + 1)
          );
        }
      },
      dataBrowser: [
        {
          string: navigator.userAgent,
          subString: "Edge",
          identity: "MSEdge"
        },
        {
          string: navigator.userAgent,
          subString: "MSIE",
          identity: "Explorer"
        },
        {
          string: navigator.userAgent,
          subString: "Trident",
          identity: "Explorer"
        },
        {
          string: navigator.userAgent,
          subString: "Firefox",
          identity: "Firefox"
        },
        {
          string: navigator.userAgent,
          subString: "Opera",
          identity: "Opera"
        },
        {
          string: navigator.userAgent,
          subString: "OPR",
          identity: "Opera"
        },
        {
          string: navigator.userAgent,
          subString: "Chrome",
          identity: "Chrome"
        },
        {
          string: navigator.userAgent,
          subString: "Safari",
          identity: "Safari"
        }
      ]
    };
    BrowserDetect.init();
    $.BrowserDetects = BrowserDetect.browser;
  });
avaanaApp.distinctCities = [];
