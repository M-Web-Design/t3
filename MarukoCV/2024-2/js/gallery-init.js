$(document).ready(function () {
  // Magnific Popup 初始化
  $(".popup-trigger").magnificPopup({
    type: "inline",
    midClick: true,
    closeBtnInside: true,
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "auto", // 允許垂直滾動
    preloader: false,
    removalDelay: 300,
    mainClass: "mfp-fade",
    callbacks: {
      open: function () {
        // 強制滾動到頂部
        $(".mfp-content").scrollTop(0);
      },
    },
  });
});

// PhotoSwipe 初始化邏輯
var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i];
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> tag
      size = linkEl.getAttribute("data-size").split("x");

      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
        title: figureEl.children[1]?.innerHTML || "",
        msrc: linkEl.children[0]?.getAttribute("src") || "",
        el: figureEl,
      };
      items.push(item);
    }
    return items;
  };

  var closest = function (el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  var onThumbnailsClick = function (e) {
    e.preventDefault();

    var clickedListItem = closest(e.target, function (el) {
      return el.tagName === "FIGURE";
    });
    if (!clickedListItem) {
      console.error("Error: clickedListItem not found.");
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedGallery.childNodes,
      index = Array.prototype.indexOf.call(childNodes, clickedListItem);

    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  var openPhotoSwipe = function (index, galleryElement) {
    var pswpElement = document.querySelectorAll(".pswp")[0];
    var items = parseThumbnailElements(galleryElement);

    var options = {
      index: index,
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0],
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
    };

    var gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUI_Default,
      items,
      options
    );
    gallery.init();
  };

  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0; i < galleryElements.length; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
};

// 定義 initPhotoSwipeFromDOM 函式
var initPhotoSwipeFromDOM = function (gallerySelector) {
  var galleryElements = document.querySelectorAll(gallerySelector);
  console.log("Found gallery elements:", galleryElements);

  // 其餘的程式碼，處理點擊事件和初始化 PhotoSwipe
};

// 確保 DOM 完全加載後執行初始化函式
document.addEventListener("DOMContentLoaded", function () {
  initPhotoSwipeFromDOM(".my-gallery");
});
