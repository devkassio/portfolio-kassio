export const createAutoplay =
  (interval = 3800) =>
  (slider) => {
    let timeout;
    let isPaused = false;

    const clearNext = () => {
      clearTimeout(timeout);
    };

    const next = () => {
      clearNext();
      if (isPaused) {
        return;
      }
      timeout = setTimeout(() => {
        slider.next();
      }, interval);
    };

    const pause = () => {
      isPaused = true;
      clearNext();
    };

    const resume = () => {
      isPaused = false;
      next();
    };

    slider.on('created', () => {
      slider.container.addEventListener('mouseenter', pause);
      slider.container.addEventListener('mouseleave', resume);
      slider.container.addEventListener('focusin', pause);
      slider.container.addEventListener('focusout', resume);
      next();
    });

    slider.on('dragStarted', clearNext);
    slider.on('animationEnded', next);
    slider.on('updated', next);

    slider.on('destroyed', () => {
      slider.container.removeEventListener('mouseenter', pause);
      slider.container.removeEventListener('mouseleave', resume);
      slider.container.removeEventListener('focusin', pause);
      slider.container.removeEventListener('focusout', resume);
      clearNext();
    });
  };
