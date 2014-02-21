require.config({
  waitSeconds: 120,
  paths: {
    async: '../bower_components/requirejs-plugins/src/async',
    jquery: '../bower_components/jquery/jquery',
    bootstrapAffix: '../bower_components/bootstrap/js/affix',
    bootstrapAlert: '../bower_components/bootstrap/js/alert',
    bootstrapButton: '../bower_components/bootstrap/js/button',
    bootstrapCarousel: '../bower_components/bootstrap/js/carousel',
    bootstrapCollapse: '../bower_components/bootstrap/js/collapse',
    bootstrapDropdown: '../bower_components/bootstrap/js/dropdown',
    bootstrapModal: '../bower_components/bootstrap/js/modal',
    bootstrapPopover: '../bower_components/bootstrap/js/popover',
    bootstrapScrollspy: '../bower_components/bootstrap/js/scrollspy',
    bootstrapTab: '../bower_components/bootstrap/js/tab',
    bootstrapTooltip: '../bower_components/bootstrap/js/tooltip',
    bootstrapTransition: '../bower_components/bootstrap/js/transition',
    gmaps: '../bower_components/gmaps/gmaps'
  },
  shim: {
    bootstrapAffix: {
      deps: ['jquery']
    },
    bootstrapAlert: {
      deps: ['jquery']
    },
    bootstrapButton: {
      deps: ['jquery']
    },
    bootstrapCarousel: {
      deps: ['jquery']
    },
    bootstrapCollapse: {
      deps: ['jquery']
    },
    bootstrapDropdown: {
      deps: ['jquery']
    },
    bootstrapModal: {
      deps: ['jquery']
    },
    bootstrapPopover: {
      deps: ['jquery']
    },
    bootstrapScrollspy: {
      deps: ['jquery']
    },
    bootstrapTab: {
      deps: ['jquery']
    },
    bootstrapTooltip: {
      deps: ['jquery']
    },
    bootstrapTransition: {
      deps: ['jquery']
    },
    gmaps: {
      deps: ['async!http://maps.google.com/maps/api/js?sensor=true']
    }
  }
});

require([
  'app',
  'jquery',
  'bootstrapButton',
  'bootstrapCarousel',
  'bootstrapCollapse',
  'bootstrapDropdown',
  'bootstrapModal',
  'bootstrapTab',
  'bootstrapTransition',
  'gmaps'
],
  function (app, $) {
    'use strict';

    $('#seo-show').click(function () {
      $(this).parent().hide();
    });

    $('.carousel').carousel({
      interval: 5000000
    });

    var map = new GMaps({
      el: '#map',
      lat: 55.823115,
      lng: 37.495918,
      scrollwheel: false
    });
    map.addMarker({
      lat: 55.823115,
      lng: 37.495918,
      title: 'ИКТ'
    });
  });
