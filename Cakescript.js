const timeline = gsap.timeline({
  duration: 0.3
});

timeline.fromTo('.cake-topping', {
  yPercent: -300,
  opacity: 0.5
}, {
  yPercent: 0,
  opacity: 1
});

timeline.to('.candle-container', {
  opacity: 1
});

timeline.to('.flame-wrap', {
  scale: 1,
  ease: "back.out"
});

timeline.to('.greeting', {
  scale: 1,
  ease: "back.out"
});

timeline.to('.star', {
  opacity: 0.5,
  stagger: 0.05,
  onComplete: function () {
    gsap.to('.star', {
      scale: 0.25,
      repeat: -1,
      stagger: 0.1,
      yoyo: true,
      yoyoEase: "power1.out"
    });
  }
});

// Add cut cake functionality
let cutsTaken = 0;
const maxCuts = 4;
let originalWidth = 200; // Original cake width
let originalHeight = 100; // Original cake height

document.querySelector('.cut-cake-btn').addEventListener('click', function() {
  if (cutsTaken >= maxCuts) {
    this.textContent = "Cake is all gone!";
    this.disabled = true;
    return;
  }
  
  cutsTaken++;
  
  // Animate the button
  gsap.to(this, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  });
  
  // Hide the candle on first cut
  if (cutsTaken === 1) {
    hideCandle();
  }
  
  // Create cake crumbs
  createCrumbs();
  
  // Animate knife cutting motion
  animateKnifeCut();
  
  // Calculate new cake dimensions after cut
  const newWidth = originalWidth * (1 - (cutsTaken * 0.2));
  const newHeight = originalHeight * (1 - (cutsTaken * 0.15));
  
  // Animate the cake getting smaller (like pieces being cut off)
  const cakeTopping = document.querySelector('.cake-topping');
  const cakeBase = document.querySelector('.cake-base');
  
  gsap.to(cakeTopping, {
    width: newWidth,
    height: newHeight,
    duration: 0.8,
    ease: "back.inOut"
  });
  
  gsap.to(cakeBase, {
    width: newWidth,
    duration: 0.8,
    ease: "back.inOut"
  });
  
  // Create a flying cake piece that's been "cut"
  createFlyingCakePiece(cutsTaken);
  
  // Update button text
  if (cutsTaken === maxCuts) {
    this.textContent = "Cake is all gone!";
    this.disabled = true;
    
    // Hide the remaining tiny cake
    setTimeout(() => {
      gsap.to(cakeTopping, {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "back.in"
      });
      
      gsap.to(cakeBase, {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "back.in"
      });
      
      // Show celebration message
      const celebration = document.createElement('div');
      celebration.className = 'celebration';
      celebration.textContent = 'Enjoy the cake! 🎂🎉';
      celebration.style.cssText = `
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        font-family: "Cookie", cursive;
        font-size: 3rem;
        color: #b381ae;
        opacity: 0;
      `;
      document.querySelector('.wrapper').appendChild(celebration);
      
      gsap.to(celebration, {
        opacity: 1,
        y: -20,
        duration: 1,
        ease: "back.out"
      });
      
      // Make stars celebrate
      gsap.to('.star', {
        scale: 1.5,
        duration: 0.5,
        repeat: 3,
        yoyo: true,
        stagger: 0.1
      });
      
      // Create and show "Go to Surprise" button after delay
      setTimeout(() => {
        createSurpriseButton();
      }, 2000);
      
    }, 1000);
  } else {
    this.textContent = `Cut the Cake! (${cutsTaken}/${maxCuts})`;
  }
});

// Function to create "Go to Surprise" button
function createSurpriseButton() {
  const surpriseButton = document.createElement('button');
  surpriseButton.className = 'surprise-btn';
  surpriseButton.textContent = '🎁 Go to Surprise!';
  surpriseButton.style.cssText = `
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Cookie", cursive;
    font-size: 2.5rem;
    color: #fff;
    background: linear-gradient(135deg, #ff6b6b, #ff8e53);
    border: none;
    border-radius: 50px;
    padding: 20px 50px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    transition: all 0.3s ease;
    opacity: 0;
    z-index: 1001;
  `;
  
  document.querySelector('.wrapper').appendChild(surpriseButton);
  
  // Animate button appearance
  gsap.to(surpriseButton, {
    opacity: 1,
    y: -20,
    duration: 1,
    ease: "back.out"
  });
  
  // Add hover effects
  surpriseButton.addEventListener('mouseenter', () => {
    gsap.to(surpriseButton, {
      scale: 1.05,
      duration: 0.2,
      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.6)',
      background: 'linear-gradient(135deg, #ff8e53, #ff6b6b)'
    });
  });
  
  surpriseButton.addEventListener('mouseleave', () => {
    gsap.to(surpriseButton, {
      scale: 1,
      duration: 0.2,
      boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)',
      background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)'
    });
  });
  
  // Add click event to start the interactive dialog
  surpriseButton.addEventListener('click', function() {
    // Animate button click
    gsap.to(this, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Hide the surprise button
        gsap.to(this, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            this.style.display = 'none';
            // Start the interactive dialog sequence
            startInteractiveDialog();
          }
        });
      }
    });
  });
}

// Function to start the interactive dialog sequence
function startInteractiveDialog() {
  const questions = [
    {
      text: "Do you really want the surprise?",
      options: [{ text: "Yes", correct: true }],
      delay: 500
    },
    {
      text: "Are you sure you want the surprise?",
      options: [{ text: "Yes", correct: true }],
      delay: 800
    },
    {
      text: "Click yes to go to surprise?",
      options: [{ text: "Yes", correct: true }],
      delay: 800
    },
    {
      text: "Are you bored?",
      options: [{ text: "No", correct: true }],
      delay: 800
    },
    {
      text: "There is no surprise! 😜",
      options: [{ text: "Ok", correct: true }],
      delay: 800,
    }
  ];
  
  let currentQuestionIndex = 0;
  
  function showNextQuestion() {
    if (currentQuestionIndex >= questions.length) {
      // All questions shown, now show "Just kidding" and navigate
      setTimeout(() => {
        showJustKidding();
      }, 4000);
      return;
    }
    
    const question = questions[currentQuestionIndex];
    
    setTimeout(() => {
      showDialog(question.text, question.options, question.special);
      currentQuestionIndex++;
    }, question.delay);
  }
  
  showNextQuestion();
  
  function showDialog(text, options, isSpecial = false) {
    // Remove any existing dialog
    const existingDialog = document.querySelector('.dialog-container');
    if (existingDialog) {
      gsap.to(existingDialog, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          existingDialog.remove();
          createNewDialog();
        }
      });
    } else {
      createNewDialog();
    }
    
    function createNewDialog() {
      const dialogContainer = document.createElement('div');
      dialogContainer.className = 'dialog-container';
      dialogContainer.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 30px 40px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        text-align: center;
        min-width: 400px;
        max-width: 500px;
        z-index: 1002;
        opacity: 0;
      `;
      
      const questionText = document.createElement('div');
      questionText.className = 'question-text';
      questionText.textContent = text;
      questionText.style.cssText = `
        font-family: "Cookie", cursive;
        font-size: 2.8rem;
        color: #333;
        margin-bottom: 30px;
      `;
      
      dialogContainer.appendChild(questionText);
      
      // Create options container
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'options-container';
      optionsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 20px;
      `;
      
      // Add options buttons
      options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'dialog-option';
        optionButton.textContent = option.text;
        optionButton.style.cssText = `
          font-family: "Cookie", cursive;
          font-size: 2.2rem;
          color: #fff;
          background: linear-gradient(135deg, ${option.correct ? '#06d6a0' : '#ef476f'}, ${option.correct ? '#118ab2' : '#ff6b6b'});
          border: none;
          border-radius: 50px;
          padding: 15px 40px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          min-width: 120px;
        `;
        
        optionButton.addEventListener('mouseenter', () => {
          gsap.to(optionButton, {
            scale: 1.05,
            duration: 0.2
          });
        });
        
        optionButton.addEventListener('mouseleave', () => {
          gsap.to(optionButton, {
            scale: 1,
            duration: 0.2
          });
        });
        
        optionButton.addEventListener('click', () => {
          // Animate button click
          gsap.to(optionButton, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              if (isSpecial) {
                // For the "There is no surprise" message
                setTimeout(() => {
                  gsap.to(dialogContainer, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    onComplete: () => {
                      dialogContainer.remove();
                      showNextQuestion();
                    }
                  });
                }, 1500);
              } else {
                // For normal questions
                setTimeout(() => {
                  gsap.to(dialogContainer, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    onComplete: () => {
                      dialogContainer.remove();
                      showNextQuestion();
                    }
                  });
                }, 300);
              }
            }
          });
        });
        
        optionsContainer.appendChild(optionButton);
      });
      
      dialogContainer.appendChild(optionsContainer);
      document.querySelector('.wrapper').appendChild(dialogContainer);
      
      // Animate dialog appearance
      gsap.to(dialogContainer, {
        opacity: 1,
        y: -10,
        duration: 0.5,
        ease: "back.out"
      });
    }
  }
  
  function showJustKidding() {
    const justKidding = document.createElement('div');
    justKidding.className = 'just-kidding';
    justKidding.textContent = 'Just kidding! 😄';
    justKidding.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: "Cookie", cursive;
      font-size: 4rem;
      color: #ff6b6b;
      opacity: 0;
      text-shadow: 3px 3px 6px rgba(0,0,0,0.2);
      z-index: 1003;
    `;
    
    document.querySelector('.wrapper').appendChild(justKidding);
    
    // Animate "Just kidding" appearance
    gsap.to(justKidding, {
      opacity: 1,
      scale: 1.2,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => {
        // Add confetti animation
        createConfetti();
        
        // Navigate to surprise.html after 4 seconds
        setTimeout(() => {
          window.location.href = 'surprise.html';
        }, 4000);
      }
    });
  }
}

// Function to create confetti animation
function createConfetti() {
  const colors = ['#ff6b6b', '#ff8e53', '#ffd166', '#06d6a0', '#118ab2', '#ef476f'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: 50%;
      left: 50%;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      opacity: 0;
      z-index: 1002;
    `;
    
    document.querySelector('.wrapper').appendChild(confetti);
    
    const angle = Math.random() * 360;
    const distance = Math.random() * 300 + 200;
    const radians = angle * Math.PI / 180;
    const x = Math.cos(radians) * distance;
    const y = Math.sin(radians) * distance;
    
    gsap.to(confetti, {
      opacity: 1,
      x: x,
      y: y,
      rotation: angle + 720,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        confetti.remove();
      }
    });
  }
}

// Function to hide candle with animation
function hideCandle() {
  const candleContainer = document.querySelector('.candle-container');
  const flame = document.querySelector('.flame-wrap');
  const stars = document.querySelectorAll('.star');
  
  // Make flame flicker before disappearing
  gsap.to(flame, {
    scale: 1.5,
    duration: 0.1,
    repeat: 3,
    yoyo: true,
    onComplete: () => {
      // Blow out flame with smoke effect
      createSmokeEffect();
      
      // Hide flame
      gsap.to(flame, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in"
      });
      
      // Animate stars fading out
      gsap.to(stars, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
      
      // Make candle shrink and disappear
      gsap.to(candleContainer, {
        scale: 0,
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "back.in",
        delay: 0.3
      });
    }
  });
}

// Function to create smoke effect when candle is blown out
function createSmokeEffect() {
  for (let i = 0; i < 5; i++) {
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    smoke.style.cssText = `
      position: absolute;
      width: ${Math.random() * 20 + 10}px;
      height: ${Math.random() * 20 + 10}px;
      background: radial-gradient(circle, rgba(200,200,200,0.8) 0%, rgba(150,150,150,0.2) 70%, transparent 100%);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      opacity: 0;
      filter: blur(3px);
      z-index: 10000;
    `;
    
    document.querySelector('.wrapper').appendChild(smoke);
    
    gsap.to(smoke, {
      opacity: 0.8,
      duration: 0.2,
      onComplete: () => {
        gsap.to(smoke, {
          x: (Math.random() - 0.5) * 60,
          y: -Math.random() * 100 - 50,
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            smoke.remove();
          }
        });
      }
    });
  }
}

// Function to create flying cake piece
function createFlyingCakePiece(pieceNumber) {
  const piece = document.createElement('div');
  piece.className = 'cake-piece';
  
  // Different sizes for different pieces
  const sizes = [
    { width: 50, height: 40 },
    { width: 45, height: 35 },
    { width: 40, height: 30 },
    { width: 35, height: 25 }
  ];
  
  const sizeIndex = Math.min(pieceNumber - 1, sizes.length - 1);
  
  piece.style.cssText = `
    width: ${sizes[sizeIndex].width}px;
    height: ${sizes[sizeIndex].height}px;
    background: linear-gradient(135deg, #b381ae, #c5a5c0);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 100;
  `;
  
  document.querySelector('.wrapper').appendChild(piece);
  
  // Animate the piece flying away
  const angle = (pieceNumber * 90) - 45; // Spread pieces in different directions
  const distance = 200 + (pieceNumber * 50);
  const radians = angle * Math.PI / 180;
  const x = Math.cos(radians) * distance;
  const y = Math.sin(radians) * distance - 100;
  
  gsap.to(piece, {
    x: x,
    y: y,
    rotation: angle + 360,
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    ease: "power2.out",
    onComplete: () => {
      piece.remove();
    }
  });
}

// Function to create crumbs animation
function createCrumbs() {
  const colors = ['#b381ae', '#c5a5c0', '#9e7199', '#f0abf0'];
  
  for (let i = 0; i < 10; i++) {
    const crumb = document.createElement('div');
    crumb.className = 'crumb';
    crumb.style.cssText = `
      position: absolute;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      opacity: 0;
    `;
    
    document.querySelector('.wrapper').appendChild(crumb);
    
    gsap.to(crumb, {
      opacity: 1,
      x: (Math.random() - 0.5) * 150,
      y: (Math.random() - 0.5) * 150 + 50,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        crumb.remove();
      }
    });
  }
}

// Function to animate knife cutting motion
function animateKnifeCut() {
  const knife = document.createElement('div');
  knife.className = 'knife';
  knife.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 8px;
    background: linear-gradient(to right, #ccc, #fff, #ccc);
    border-radius: 4px;
    transform-origin: left center;
    transform: translate(-50%, -50%) rotate(-30deg);
    z-index: 999;
    opacity: 0;
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  `;
  
  document.querySelector('.wrapper').appendChild(knife);
  
  // Animate the knife cutting
  gsap.to(knife, {
    opacity: 1,
    duration: 0.1,
    onComplete: () => {
      gsap.to(knife, {
        rotation: 30,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(knife, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => {
              knife.remove();
            }
          });
        }
      });
    }
  });
}