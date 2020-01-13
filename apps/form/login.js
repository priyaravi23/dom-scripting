
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    const register = document.querySelector('.register input[value="Register"]');
    const open = document.querySelector('.register input[name="signup_submit"]');
    const cancel = document.querySelector('.register input[value="Cancel"]');
    const viewPwd = document.querySelector('.form-group .input-icons > i[id="pass-status"]');
    const pwdStrength = document.querySelector('.form-group .input-icons > input[id="password"]');

    // register.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     console.log('stopped propagation..');
    // });

    document.querySelector('form').addEventListener('submit', e => {
        console.log('Do not allow the form to be submitted ... ');
        e.preventDefault();
    });

    open.addEventListener('click', () => {
        document.getElementById('content').style.display = 'none';
        fetch(
            document.getElementById("myForm").style.display = "block",
            { method: 'POST' }
            )
          .then( response => response.json() )
          .then( json => console.log(json) )
          .catch( error => console.error('error:', error) );
    });

    cancel.addEventListener('click', () => {
        document.getElementById("myForm").style.display = "none";
        document.getElementById('content').style.display = 'block';
    });

    viewPwd.addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const passStatus = document.getElementById('pass-status');

        if (passwordInput.type === 'password'){
            passwordInput.type='text';
            passStatus.className='fa fa-eye-slash fa_custom';
        }
        else {
            passwordInput.type='password';
            passStatus.className='fa fa-eye';
        }
    });

    pwdStrength.addEventListener('keyup', () => {
        let strength = {
            0: "Bad",
            1: "Weak",
            2: "Medium",
            3: "Good",
            4: "Strong"
          };

          const password = document.getElementById('password');
          const meter = document.getElementById('password-strength');
          const text = document.getElementById('password-strength-text');

          password.addEventListener('input', function() {
            const val = password.value;
            const result = zxcvbn(val);

            // This updates the password strength meter
            meter.value = result.score;

            // Update the text indicator
            if (val !== "") {
              text.innerHTML = "Strength: " + strength[result.score];
            } else {
              text.innerHTML = "";
            }
          });
    });
}


// ParticlesJS Config.
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 500
                }
            },
            "color": {
                "value": ["#F08080", "#6495ED", "#00CED1", "#FF69B4"]
            },
            "shape": {
                "type": "polygon",
                "stroke": {
                    "width": 2,
                    "color": "#ff9800"
                },
                "polygon": {
                    "nb_sides": 6
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 10,
                "random": true
            },
            "line_linked": {
                "enable": false,
                "distance": 200,
                "color": "#ff5722",
                "opacity": 0.3,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 5,
                "direction": "bottom",
                "random": true,
                "straight": true,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": [
                        "grab",
                        "bubble"
                    ]
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 0.7
                    }
                },
                "bubble": {
                    "distance": 600,
                    "size": 12,
                    "duration": 1,
                    "opacity": 0.8,
                    "speed": 2
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 20
                },
                "remove": {
                    "particles_nb": 10
                }
            }
        },
        "retina_detect": true
    });