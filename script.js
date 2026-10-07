/* =========================
   LUCIDE ICONS
========================= */

lucide.createIcons();



/* =========================
   HERO VIDEO
========================= */

const heroVideo =
    document.getElementById("heroVideo");


let fading = false;



function fadeVideo(
    element,
    startOpacity,
    endOpacity,
    duration
) {

    const startTime =
        performance.now();


    function animate(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const opacity =
            startOpacity +
            (endOpacity - startOpacity)
            * progress;


        element.style.opacity =
            opacity;


        if (progress < 1) {

            requestAnimationFrame(
                animate
            );

        }

    }


    requestAnimationFrame(
        animate
    );

}



/* VIDEO READY */

heroVideo.addEventListener(
    "canplay",
    () => {

        heroVideo
            .play()
            .catch(() => {});


        fadeVideo(
            heroVideo,
            0,
            1,
            500
        );

    }
);



/* VIDEO NEAR END */

heroVideo.addEventListener(
    "timeupdate",
    () => {

        if (
            !heroVideo.duration ||
            fading
        ) return;


        const remaining =
            heroVideo.duration
            - heroVideo.currentTime;


        if (remaining <= 0.55) {

            fading = true;


            const currentOpacity =
                parseFloat(
                    getComputedStyle(
                        heroVideo
                    ).opacity
                ) || 1;


            fadeVideo(
                heroVideo,
                currentOpacity,
                0,
                500
            );

        }

    }
);



/* VIDEO ENDED */

heroVideo.addEventListener(
    "ended",
    () => {

        heroVideo.style.opacity = 0;


        setTimeout(() => {

            heroVideo.currentTime = 0;


            heroVideo
                .play()
                .catch(() => {});


            fadeVideo(
                heroVideo,
                0,
                1,
                500
            );


            fading = false;

        }, 100);

    }
);



/* =========================
   SCROLL ANIMATION
========================= */

const elements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("show");


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15,
            rootMargin:
                "0px 0px -80px 0px"
        }

    );


elements.forEach(
    element => {

        observer.observe(
            element
        );

    }
);



/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar =
    document.querySelector(
        ".nav-container"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 100
        ) {

            navbar.style.background =
                "rgba(0,0,0,0.35)";

        }

        else {

            navbar.style.background =
                "rgba(255,255,255,0.01)";

        }

    }
);