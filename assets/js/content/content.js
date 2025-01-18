/**
 * ============================================================
 *
 * [content]
 *
 * ============================================================
 */
// import * as azlib from '../global/azlib_light.bundle.js';
/**
 * 汎用JS クラス
 */
class ContentJS {
  constructor() {
    this.isSkip = false;
    this.isFlowAnime = false;
    this.isPopup = false;
    this.isOpen = false;
    this.isAllowClose = false;
    this.isDefaultFirst = true;
    this.isScroll = true;
    this.isNoCueOffset = false;
    this.hHeight = 0;
    this.hHeightOrg = 0;
    this.hWidth = 0;
    this.isNavMainHover = [];
    this.isNavSubHover = [];
    this.subHeights = [];
    this.resizeTimer = false;
    this.adminMargin = 0;
    this.scrTopCache = 0;
    // ex
    this.gNavAcc = null;
    this.footerbnr = {
      slider: null,
      elem: "js-footerBnr",
      count: 0,
    };
  }
  init() {
    this.isSkip = document.body.classList.contains("is-skip") ? true : false;
    this.isFlowAnime = document.body.classList.contains("is-flowAnime")
      ? true
      : false;
    this.isPopup = document.body.classList.contains("is-popup") ? true : false;
    this.isNoCueOffset = document.body.classList.contains("is-noCueOffset")
      ? true
      : false;

    // ロケーションハッシュ
    window.addEventListener("load", () => {
      if (location.hash !== "" && !this.isNoCueOffset) {
        const hash = location.hash.replace("#", "");
        const target = document.getElementById(hash);
        if (!target) return;
        const offset = -Number(this.hHeight);
        const targetPos =
          target?.getBoundingClientRect().top + window.pageYOffset + offset;
        const anime = new azlib.anime({
          targets: "html, body",
          scrollTop: targetPos,
          duration: 10,
          easing: "easeInQuad",
          complete: () => {
            const newTargetPos =
              target.getBoundingClientRect().top + window.pageYOffset + offset;
            // console.log(targetPos, newTargetPos)
            if (targetPos !== newTargetPos) {
              new azlib.anime({
                targets: "html, body",
                scrollTop: newTargetPos,
                duration: 10,
                easing: "linear",
              });
            }
          },
        });
      }
    });

    window.addEventListener("resize", () => {
      if (this.resizeTimer !== false) {
        clearTimeout(this.resizeTimer);
      }

      this.resizeTimer = setTimeout(() => {
        this.adjust();
        if (util.isChangeMode) {
          window.location.reload();
          // if (!util.isRespMode) {
          //   document.getElementById('gNavWrapper').style.display = 'block';
          // } else {
          //   if (util.isNavOpen) document.getElementById('gNavWrapper').click();
          // }
        }
      }, 500);
    });

    if (document.getElementById("js-pageTopVox")) {
      document
        .querySelector("#js-pageTopVox button")
        .addEventListener("click", (e) => {
          new azlib.anime({
            targets: "html, body",
            scrollTop: 0,
            duration: 500,
            easing: "easeInOutQuart",
          });
        });
    }

    if (document.getElementById("gNavOpener")) {
      const inertObjs = ["#siteLogo", "#main", "#siteFooter", ".bnrArea"];
      const closeNav = () => {
        document.getElementById("js-gNavBg")?.remove();
        document.getElementById("gNavOpener").classList.remove("is-navOpen");
        document.body.classList.remove("is-navOpen");
        if (util.isRespMode) {
          document.body.style.top = "auto";
          window.scrollTo(0, this.scrTopCache);
        }
        util.isNavOpen = false;
        inertObjs.forEach((v, i) => {
          document.querySelector(v)?.removeAttribute("inert");
        });
        document.getElementById("gNavWrapper").setAttribute("inert", "");
        // console.log(this.gNavAcc);
        for (let key in this.gNavAcc.accParams) {
          // console.log(key);
          this.gNavAcc.close(key);
        }
      };

      document.getElementById("gNavOpener").addEventListener("click", (e) => {
        if (util.isNavOpen) {
          closeNav();
        } else {
          const elem = document.createElement("div");
          elem.id = "js-gNavBg";
          document.querySelector("#siteHeader .inner").appendChild(elem);
          document.getElementById("js-gNavBg").addEventListener("click", () => {
            if (util.isNavOpen) closeNav();
          });
          util.isNavOpen = true;
          if (util.isRespMode) {
            this.scrTopCache = util.scrTop;
            this.adjust();
            document.body.style.top = `-${this.scrTopCache}px`;
          }
          document.getElementById("gNavOpener").classList.add("is-navOpen");
          document.body.classList.add("is-navOpen");

          inertObjs.forEach((v, i) => {
            document.querySelector(v)?.setAttribute("inert", "");
          });
          document.getElementById("gNavWrapper").removeAttribute("inert");
        }
      });
    }

    document.querySelectorAll("#gNavWrapper a").forEach((v, i) => {
      v.addEventListener("click", (e) => {
        if (util.isNavOpen) document.getElementById("gNavOpener").click();
      });
    });

    this.hHeightOrg = document.getElementById("siteHeader")
      ? document.getElementById("siteHeader").clientHeight
      : 0;

    const rplSPImg01 = new azlib.ReplaceImageSP(".rplSPImg", {
      spBreakPoint: util.spBreakPoint,
    });

    if (this.isPopup) {
      const popup = new azlib.PopupAdjust(".popupBtItem", {
        onComplete: () => {
          console.log("loaded");
        },
      });
      document.querySelectorAll(".popupBtItem.movie").forEach((v, i) => {
        v.addEventListener("click", (e) => {
          const movie = v.getAttribute("data-movie");
          const src = `<iframe src="https://www.youtube.com/embed/${movie}?autoplay=1&rel=0" frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          document
            .querySelector("#popupWrapperMovie .content")
            .insertAdjacentHTML("beforeend", src);
        });
      });
    }

    if (this.isFlowAnime) {
      // flowVox
      const flowVox = new azlib.FlowVox(".flowVox", {
        // isRepeat: true,
        // per: 0.25,
        duration: 1000,
        easing: "easeInOutQuad",
      });
    }

    const flowVox = new azlib.FlowVox(".flowVox");
    const acc01 = new azlib.SimpleAccordion();

    if (util.isRespMode) {
      // if (document.getElementById('gNavWrapper')) document.getElementById('gNavWrapper').style.height = `${util.wHeight}px`;
      document.getElementById("gNavOpener").removeAttribute("aria-hidden");
      const button = document.createElement("button");
      button.setAttribute("class", "main opener");
      button.innerText = "客製化服務";
      document.querySelector(".js-gNavAcc .main").replaceWith(button);
      this.gNavAcc = new azlib.SimpleAccordion(".js-gNavAcc");
      //document.querySelector('#gNavWrapper .snsList .x').classList.add('w')刪除Twitter;
    } else {
      // if (document.getElementById('gNavWrapper')) document.getElementById('gNavWrapper').style.height = 'auto';
      document.getElementById("gNavOpener").setAttribute("aria-hidden", true);
    }

    this.adjust().then(() => this.runIntro());
  }
  async adjust() {
    this.hHeight = document.getElementById("siteHeader").clientHeight;
    this.adminMargin = parseInt(
      getComputedStyle(document.getElementsByTagName("html")[0]).marginTop
    );
    util.sScroll(
      -(Number(this.adminMargin) + Number(this.hHeight)),
      500,
      "easeInQuad"
    );

    const toggleHeader = () => {
      if (util.scrTop > 10) {
        document.getElementById("siteHeader").classList.add("is-mini");
      } else {
        document.getElementById("siteHeader").classList.remove("is-mini");
      }
    };

    if (!document.body.classList.contains("home")) {
      window.removeEventListener("scroll", toggleHeader);
      window.addEventListener("scroll", toggleHeader);
    }

    if (util.isRespMode) {
      this.initFooterbnrList();
    }
    this.initTab();
    this.adjustHeader();

    return "resolve";
  }
  initFooterbnrList() {
    if (!document.getElementById(this.footerbnr.elem)) return;
    const elem = document.getElementById(this.footerbnr.elem);

    this.footerbnr.count = elem.querySelectorAll(".swiper-slide").length;
    if (this.footerbnr.count <= 1) {
      elem.classList.add("is-noslider");
      return;
    }
    if (this.footerbnr.count <= 3) {
      elem.querySelectorAll(".swiper-slide").forEach((v, i) => {
        const copy = v.cloneNode(true);
        elem.querySelector(".subList").appendChild(copy);
      });
    }
    this.footerbnr.slider = new Swiper(elem, {
      slidesPerView: 1.5,
      centeredSlides: true,
      spaceBetween: 15,
      loop: true,
      speed: 1500,
      autoplay: {
        disableOnInteraction: false,
        delay: 3000,
      },
    });
  }
  initTab() {
    if (document.querySelector(".tabVoxWrapper")) {
      document.querySelectorAll(".tabVoxWrapper").forEach((v, i) => {
        const content = v.querySelectorAll(".tabContents");
        const list = v.querySelectorAll(".tabs button");
        const tabList = v.querySelector('[role="tablist"]');
        let current = 0;
        const length = v.querySelectorAll(".tabs button").length;

        window.addEventListener("load", () => {
          content[current].classList.add("show");
          list[current].parentElement.classList.add("is-active");
        });
        list.forEach((v, i) => {
          if (current !== i) {
            list[i].setAttribute("aria-selected", false);
            list[i].setAttribute("tabindex", -1);
            content[i].setAttribute("aria-hidden", true);
          } else {
            list[i].setAttribute("aria-selected", true);
            list[i].setAttribute("tabindex", 0);
            content[i].setAttribute("aria-hidden", false);
          }
          v.addEventListener("click", (e) => {
            current = i;
            Array.from(list).map((item) => {
              item.parentElement.classList.remove("is-active");
              item.setAttribute("aria-selected", false);
              item.setAttribute("tabindex", -1);
            });
            Array.from(content).map((item) => {
              item.setAttribute("aria-hidden", true);
              item.setAttribute("tabindex", 0);
              item.classList.remove("show");
            });

            e.currentTarget.parentElement.classList.add("is-active");
            list[current].setAttribute("aria-selected", true);
            list[current].setAttribute("tabindex", 0);
            content[current].setAttribute("aria-hidden", false);
            content[i].classList.add("show");
            // content[num].style.display = 'block';
          });
        });
        tabList?.addEventListener("keydown", (e) => {
          // console.log(e.code);
          if (
            e.code === "ArrowRight" ||
            e.code === "ArrowLeft" ||
            e.code === "ArrowDown" ||
            e.code === "ArrowUp"
          ) {
            current = (() => {
              switch (e.code) {
                case "ArrowRight":
                case "ArrowDown":
                  return current !== length - 1 ? current + 1 : 0;
                  break;
                case "ArrowLeft":
                case "ArrowUp":
                  return current !== 0 ? current - 1 : length - 1;
                  break;
              }
            })();
            // console.log(a);
            list[current].focus();
            // list[a].click();
          }
        });
      });
    }
  }
  runIntro() {
    if (this.isSkip) return;

    // document.getElementById('wrapper').style.visibility = 'visible';

    new azlib.anime({
      targets: "#loading",
      opacity: [1, 0],
      complete: (anim) => {
        if (document.getElementById("loading")) {
          document.getElementById("loading").style.display = "none";
        }
      },
    });

    new azlib.anime({
      targets: "#wrapper",
      opacity: 1,
      delay: 400,
      duration: 250,
      easing: "linear",
      complete: (anim) => {
        this.isDefaultFirst = false;
        document.body.classList.add("is-finishedIntro");
      },
    });
  }
  adjustHeader() {}
}
/**
 * Home用JSクラス
 */
class HomeJS {
  constructor() {
    this.rTimer = false;
    this.isFirst = true;
    this.isAllowSlideMV = false;
    this.mvThmSlider = {
      slider: null,
      elem: "js-lineupList",
      count: 0,
    };
    this.recipeSlider = {
      slider: null,
      elem: "js-recipeSlider",
      container: ".recipeSliderContainer",
      count: 0,
    };
    this.bnrList = {
      slider: null,
      elem: "js-bnrList",
      count: 0,
    };
    this.footerbnr = {
      slider: null,
      elem: "js-footerBnr",
      count: 0,
    };
  }
  init() {
    window.addEventListener("resize", () => {
      if (this.rTimer !== false) {
        clearTimeout(Number(this.rTimer));
      }

      this.rTimer = window.setTimeout(() => {
        this.adjust();
        if (util.isChangeMode) {
          this.adjust();
        }
      }, 500);
    });

    if (util.isRespMode) {
      this.initMvThmSlider();
    }
    this.initMvSlider();
    this.initRecipeSlider();
    this.initbnrList();
    this.initDetails();

    this.adjust().then(() => this.runIntro());
  }
  async adjust() {
    document.getElementById(
      "mainVisualWrapper"
    ).style.height = `${util.wHeight}px`;

    const toggleHeader = () => {
      const pos = util.isRespMode
        ? 10
        : document.getElementById("js-lineupList").getBoundingClientRect().top +
          window.pageYOffset;

      if (util.scrTop > pos) {
        document.getElementById("siteHeader").classList.add("is-mini");
      } else {
        document.getElementById("siteHeader").classList.remove("is-mini");
      }
    };

    window.removeEventListener("scroll", toggleHeader);
    window.addEventListener("scroll", toggleHeader);

    return "resolve";
  }
  initMvSlider() {
    if (!document.getElementById("js-mvSlider")) return;
    const elem = document.getElementById("js-mvSlider");
    const mvItems = elem.querySelectorAll(".item:not(.sliderIntro)");
    const lineup = document.getElementById("js-lineupList");
    const lineupItems = lineup.querySelectorAll(".item");

    const count = elem.querySelectorAll(".item").length;
    if (count <= 1) {
      elem.classList.add("is-noslider");
      return;
    } else {
      this.isAllowSlideMV = true;
    }
    // const slider01 = new azlib.FadeSlider('#js-mvSlider', {
    //   ctrl: false,
    //   pager: false,
    //   speed: 1000,
    //   isAuto: true,
    //   pause: 3000,
    //   isChangeOpacity: true,
    // });
    if (!util.isRespMode) {
      lineupItems.forEach((v, i) => {
        v.addEventListener("mouseenter", () => {
          Array.from(mvItems).map((vv, ii) => {
            if (ii !== i) {
              closeSlide(mvItems[ii]);
            }
          });
          if (mvItems[i].classList.contains("is-hide"))
            mvItems[i].classList.remove("is-hide");
          mvItems[i].classList.add("is-active");
          lineupItems[i].classList.add("is-active");
        });
      });
      document.addEventListener("mouseover", (e) => {
        if (
          !e.target.closest("#js-mvSlider") &&
          !e.target.closest("#js-lineupList")
        )
          Array.from(mvItems).map((v, i) => {
            closeSlide(mvItems[i]);
          });
      });
    } else {
      lineupItems.forEach((v, i) => {
        v.addEventListener("click", (e) => {
          if (!this.isAllowSlideMV) return;
          e.preventDefault();
          Array.from(mvItems).map((vv, ii) => {
            if (ii !== i) {
              closeSlide(mvItems[ii]);
              lineupItems[ii].classList.remove("is-active");
            }
          });
          mvItems[i].classList.remove("is-hide");
          mvItems[i].classList.add("is-active");
          v.classList.add("is-active");
        });
      });
      elem.querySelectorAll(".closeBtn").forEach((v, i) => {
        v.addEventListener("click", () => {
          closeSlide(mvItems[i]);
        });
      });
    }
    const closeSlide = (target) => {
      if (!target.classList.contains("is-active")) return;
      target.classList.add("is-hide");
      target.classList.remove("is-active");
      target.addEventListener("transitionend", () => {
        target.classList.remove("is-hide");
      });
      Array.from(lineupItems).map((item) => item.classList.remove("is-active"));
    };
  }
  initMvThmSlider() {
    if (!document.getElementById(this.mvThmSlider.elem)) return;
    const elem = document.getElementById(this.mvThmSlider.elem);

    this.mvThmSlider.count = elem.querySelectorAll(".swiper-slide").length;
    if (this.mvThmSlider.count <= 1) {
      elem.classList.add("is-noslider");
      return;
    }
    elem.insertAdjacentHTML(
      "beforeend",
      `
        <div class="navigation">
          <div class="btn btnPrev"><span>Prev</span></div>
          <div class="btn btnNext"><span>Next</span></div>
        </div>
      `
    );
    // document.querySelectorAll('#mainVisualWrapper .lineupList .item').forEach(v => v.style.width = '107px');
    this.mvThmSlider.slider = new Swiper(elem, {
      slidesPerView: "auto",
      // width: 107,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: ".btnNext",
        prevEl: ".btnPrev",
      },
    });
  }
  initRecipeSlider() {
    if (!document.getElementById(this.recipeSlider.elem)) return;
    const elem = document.getElementById(this.recipeSlider.elem);
    const container = document.querySelector(this.recipeSlider.container);

    this.recipeSlider.count = elem.querySelectorAll(".swiper-slide").length;
    if (this.recipeSlider.count <= 1) {
      elem.classList.add("is-noslider");
      return;
    }
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="navigation">
          <div class="btn btnPrev"><span>Prev</span></div>
          <div class="btn btnNext"><span>Next</span></div>
        </div>
        <div class="scrollbar"></div>
      `
    );
    this.recipeSlider.slider = new Swiper(elem, {
      spaceBetween: !util.isRespMode ? 40 : 20,
      slidesPerView: "auto",
      navigation: {
        nextEl: ".btnNext",
        prevEl: ".btnPrev",
      },
      scrollbar: {
        el: ".scrollbar",
        hide: false,
        dragSize: 16,
        draggable: true,
      },
      // breakpoints: {
      //   768: {
      //     width: 330,
      //   },
      // },
    });
  }
  initbnrList() {
    if (!document.getElementById(this.bnrList.elem)) return;
    const elem = document.getElementById(this.bnrList.elem);

    this.bnrList.count = elem.querySelectorAll(".swiper-slide").length;
    if (this.bnrList.count <= 1) {
      elem.classList.add("is-noslider");
      return;
    }
    this.bnrList.slider = new Swiper(elem, {
      slidesPerView: util.isRespMode ? 1.4 : "auto",
      centeredSlides: true,
      spaceBetween: !util.isRespMode ? 50 : 15,
      loop: true,
      speed: 1500,
      autoplay: {
        disableOnInteraction: false,
        delay: 3000,
      },
    });
  }
  initDetails() {
    const items = document.querySelectorAll(".detailsSection .img");
    const fromParams = [
      util.isRespMode ? 0 : 100,
      util.isRespMode ? 75 : 50,
      util.isRespMode ? 100 : 100,
    ];
    const toParams = [
      util.isRespMode ? -50 : -200,
      util.isRespMode ? 0 : -50,
      util.isRespMode ? 0 : -100,
    ];
    Array.from(items).forEach((v, i) => {
      gsap.fromTo(
        v,
        {
          y: fromParams[i],
        },
        {
          y: toParams[i],
          scrollTrigger: {
            trigger: v,
            start: "top bottom",
            end: "bottom top",
            // markers: true,
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }
  runIntro() {
    this.isFirst = false;
    // return;

    Object.assign(document.getElementById("wrapper").style, {
      visibility: "visible",
      opacity: 0,
    });
    new azlib.anime({
      targets: "#wrapper",
      opacity: 1,
      duration: 500,
      easing: "linear",
    });
  }
}
/**
 * Lineup用JSクラス
 */
class LineupJS {
  constructor() {
    this.rTimer = false;
    this.isFirst = true;
    this.lNav = {
      open: false,
      elem: "js-lNavOpen",
      count: 0,
    };
  }
  init() {
    if (util.isRespMode) {
      this.initLocalNav();
    }
    document.querySelectorAll(".js-tabChanger")?.forEach((v, i) => {
      v.addEventListener("click", (e) => {
        const tc = e.currentTarget.dataset.content;
        // console.log(tc);
        document
          .querySelector(`#js-lineupDetail .tabs button[aria-controls="${tc}"]`)
          .click();
      });
    });
    document
      .querySelectorAll("#js-lineupDetail .tabs button")
      ?.forEach((v, i) => {
        v.addEventListener("click", () => {
          const offset = util.isRespMode ? -55 : -90;
          const target = document.getElementById("js-lineupDetail");
          const targetPos =
            target.getBoundingClientRect().top + window.pageYOffset + offset;
          new azlib.anime({
            targets: "html, body",
            scrollTop: targetPos,
            duration: 250,
            easing: "easeInQuad",
            complete: () => {
              const newTargetPos =
                target.getBoundingClientRect().top +
                window.pageYOffset +
                offset;
              // console.log(targetPos, newTargetPos)
              if (targetPos !== newTargetPos) {
                new azlib.anime({
                  targets: "html, body",
                  scrollTop: newTargetPos,
                  duration: 10,
                  easing: "linear",
                });
              }
            },
          });
        });
      });
    // ハッシュ
    window.addEventListener("load", () => {
      const hashs = ["#about", "#keys", "#gallery", "#nutrition"];
      if (hashs.includes(`${location.hash}`)) {
        const h = location.hash.slice(1);
        document
          .querySelector(`#js-lineupDetail button[role="tab"][data-tab="${h}"]`)
          ?.click();
      }
    });
    this.adjust().then(() => this.runIntro());
  }
  async adjust() {
    return;
  }
  initLocalNav() {
    if (document.getElementById(this.lNav.elem)) {
      const closeNav = () => {
        document
          .getElementById(this.lNav.elem)
          .parentElement.classList.remove("is-open");
        this.lNav.open = false;
      };
      document.getElementById(this.lNav.elem).addEventListener("click", (e) => {
        if (this.lNav.open) {
          closeNav();
        } else {
          document
            .getElementById("js-lNavClose")
            .addEventListener("click", () => {
              if (this.lNav.open) closeNav();
            });
          this.lNav.open = true;
          document
            .getElementById(this.lNav.elem)
            .parentElement.classList.add("is-open");
          document.getElementById("gNavWrapper").removeAttribute("inert");
        }
      });
    }
  }
  runIntro() {
    this.isFirst = false;
  }
}
/**
 * インスタンス化
 */
const util = new azlib.Utilities({
  spBreakPoint: 767,
});
const contentJS = new ContentJS();
const homeJS = new HomeJS();
const lineupJS = new LineupJS();
/**
 * 実行
 */
window.addEventListener("DOMContentLoaded", () => {
  util.init();
  contentJS.init();
  if (document.body.classList.contains("home")) {
    homeJS.init();
  }
  if (document.body.classList.contains("lineup")) {
    lineupJS.init();
  }
  const lazyBg = new azlib.LazyLoadBg(".js-lazyBg");
});
