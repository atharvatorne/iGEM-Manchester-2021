var textSection = null;
      var ACCnavbar = document.getElementById("ACCnavbar");
      window.addEventListener('load', function() {
          textSection = document.querySelector('.elevate-ACCnavbar');
          checkScrollPos();
          checkBackToTopPos();
      })
      window.addEventListener('scroll', function() {
          updateScrollbar();
          checkACCNavbarPos();
          checkScrollPos();
          checkBackToTopPos();
      });

      function checkScrollPos() {
          var footerTop = document.getElementById("footerWrapper").getBoundingClientRect().top;
          var scrollbarBottom = document.getElementById("scrollbar-container").getBoundingClientRect().bottom;
          let scrollWrapper = document.querySelector('.scroll-wrapper');
          if (scrollbarBottom >= footerTop) {
              if (scrollWrapper.getAttribute("hiddenScroll") == "false") scrollWrapper.setAttribute("hiddenScroll", "true");
          } else {
              if (scrollWrapper.getAttribute("hiddenScroll") == "true") scrollWrapper.setAttribute("hiddenScroll", "false");
          }
      }

      function checkBackToTopPos() {
          if ($(window).scrollTop() > 1000) {
              $('#backtotop-wrapper').addClass('scrolled')
          } else $('#backtotop-wrapper').removeClass('scrolled')
      }

      $(document).ready(function() {
          $('#backtotop-wrapper').on('click', function() {
              $('html, body').animate({
                  'scrollTop': $('body').offset().top
              }, 2000);
          });
      });
      function checkACCNavbarPos() {
          if (textSection != null) {
              var ACCnavbarTop = ACCnavbar.getBoundingClientRect().top;
              var mainTagTop = textSection.getBoundingClientRect().top;
              if (ACCnavbarTop >= mainTagTop) {
                  if (document.getElementById("bubbles-to-close").getAttribute("open") != true) ACCnavbar.setAttribute("onText", "true");
              } else {
                  ACCnavbar.setAttribute("onText", "false");
              }
          }
      }

      //---------------Closing the menu and returning to default values---------------
      function closeMenu() {
          var toggleable = document.querySelectorAll('.toggleable');
          for (let item of toggleable) {
              item.classList.remove("active");
          }
          document.getElementById("fixedOverlay").setAttribute("bg", "none");
          document.getElementById("popup-next").classList.remove(currentChoice);
          document.querySelector(".hamb-wrapper").classList.remove("invisible");
          currentChoice = null;
          const myNode = document.getElementById("appendable");
          document.getElementById("bubbles-to-close").setAttribute("<a href="javascript:void(0)" class="closeAccesibility" onclick="closeAccesibility()">&times;</a>", "false");
          while (myNode.firstChild) {
              myNode.removeChild(myNode.lastChild);
          }
          let node = document.querySelector('.center-link');
          document.querySelector('#popup-next .choices').removeChild(node)
          checkACCNavbarPos();

      }

      function openSecBubble(link) {
          link.classList.add("active");
          document.getElementById("popup-next").classList.remove(currentChoice);
          currentChoice = link.id;
          document.getElementById("popup-next").classList.add("active");
          var items = menuItems[currentChoice];
          document.getElementById("popup-next").classList.add(currentChoice)
          let counter = 0;
          for (const [key, value] of Object.entries(menuItems[currentChoice])) {
              var node = document.createElement("li");
              var nodeLink = document.createElement("a");
              nodeLink.href = value.link;
              nodeLink.innerHTML = value.name;
              if (link.id == 'wl') {
                  node.classList.add(counter < 3 ? 'right-align' : 'left-align');
                  counter++;
              }
              node.appendChild(nodeLink);
              document.getElementById("appendable").appendChild(node);
          }
          resizeBubble(link.id);
      }

      var openMenuEls = document.getElementsByClassName("menu-wrapper");
      for (let el of openMenuEls) {
          //---------------Clicking on menu sandwich/close button---------------
          el.addEventListener('click', function() {
              //---------------If menu is open and close button is clicked, close menu---------------
              if (this.classList.contains("active")) {
                  closeMenu();
              } else {
                  document.getElementById("popup-main").classList.add("active");
                  this.classList.add("active");
                  document.querySelector(".hamb-wrapper").classList.add("invisible");
                  fxdOv = document.getElementById("fixedOverlay");
                  fxdOv.setAttribute("bg", "dark");
                  document.getElementById("ACCnavbar").setAttribute("onText", "false");
                  document.getElementById("bubbles-to-close").setAttribute("open", "true");
                  if (fxdOv.classList.length != 0) {
                      link = fxdOv.classList[0]
                      openSecBubble(document.getElementById(link))
                  }
              }
          })
      }
      var currentChoice;
      var menuLinks = document.getElementsByClassName("main-choice");
      for (let link of menuLinks) {
          link.addEventListener('mouseover', initializeSecondBubble);
      }
      for (let link of menuLinks) {
          link.addEventListener('click', function() {
              for (let linkRecursive of menuLinks) linkRecursive.removeEventListener('mouseover', initializeSecondBubble);
              for (let linkRecursive of menuLinks) linkRecursive.addEventListener('click', initializeSecondBubble);
              link.initializeSecondBubble;
              setTimeout(function() {
                  for (let linkRecursive of menuLinks) linkRecursive.addEventListener('mouseover', initializeSecondBubble);
              }, 3000)
          })
      }

      function initializeSecondBubble() {
          for (let lk of menuLinks) {
              if (lk.classList.contains("active")) {
                  lk.classList.remove("active");
                  const myNode = document.getElementById("appendable");
                  while (myNode.firstChild) {
                      myNode.removeChild(myNode.lastChild);
                  }
              }
          }

          if (document.querySelector('#popup-main').classList.contains('active')) openSecBubble(this)
      }

      $('#appendable li a').on("click", function() {
          closeMenu();
      })

      $(window).resize(function() {
          resizeBubble();
      });

      function resizeBubble(type = "project") {
          $(function() {
              var elementWidth = $("#appendable").width();
              var elementHeight = $("#appendable").height();
              var resizingConstant = (function() {
                  if (type == "hp") {
                      return 1.5
                  } else if (type == "team") {
                      return 1.3
                  } else if (type == "project") {
                      return 1.45
                  } else if (type == "dl") {
                      return 1.6
                  } else if (type == "wl") {
                      return 1.2
                  }
              })();
              if (elementHeight > elementWidth) {
                  $("#bubbles #popup-next").css("height", elementHeight * resizingConstant);
                  $("#bubbles #popup-next").css("width", elementHeight * resizingConstant);
              } else {
                  $("#bubbles #popup-next").css("height", elementWidth * resizingConstant);
                  $("#bubbles #popup-next").css("width", elementWidth * resizingConstant);
              }
          })
      }
      document.getElementById("bubbles-to-close").addEventListener('click', function() {
          var isOpen = document.getElementById("popup-main");
          if (isOpen.classList.contains("active")) {
              closeMenu();
          }
        })
        
