//  Sebastien Wong
//  Test animation using html, js, and css
//  Structure is as follows:
//      Load all pictures and set intial frame
//      Animation functions, ordered from frame 1-5, with transition and specific animation functions in between
//      Animation loop at the end using requestAnimationFrame

let canvas, ctx;
let store, lily1, lily2, lily3, att, globe, hoop_no_ball, hoop_only;
let shot5, shot4, shot3, shot2, shot1, shot0;
let ball;
let bg, att_alt, att_globe, nba, phone, ball2, shadow;
let word_mark_5g, cta;

window.addEventListener('load', function () {
    //LOAD ALL PICTURES

    canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");

    store = new Image();
    store.src = 'assets/store.jpg';

    lily1 = new Image();
    lily1.src = 'assets/lily_fr_1.png';

    lily2 = new Image();
    lily2.src = 'assets/lily_fr_2.png';

    lily3 = new Image();
    lily3.src = 'assets/lily_fr_3.png';

    att = new Image();
    att.src = 'assets/att.png';

    globe = new Image();
    globe.src = 'assets/globe.png';

    hoop_no_ball = new Image();
    hoop_no_ball.src = 'assets/hoop_no_ball.png';
    hoop_only = new Image();
    hoop_only.src = 'assets/Hoop only.png'

    shot5 = new Image();
    shot5.src = 'assets/05.png';
    shot4 = new Image();
    shot4.src = 'assets/04.png';
    shot3 = new Image();
    shot3.src = 'assets/03.png';
    shot2 = new Image();
    shot2.src = 'assets/02.png';
    shot1 = new Image();
    shot1.src = 'assets/01.png';
    shot0 = new Image();
    shot0.src = 'assets/00.png';

    ball = new Image();
    ball.src = 'assets/ball.png';

    bg = new Image();
    bg.src = 'assets/bg.png';

    att_alt = new Image();
    att_alt.src = 'assets/att_alt.png';

    att_globe = new Image();
    att_globe.src = 'assets/att_vt_lkp_rgb_pos.png';

    nba = new Image();
    nba.src = 'assets/nba-logo.png';

    phone = new Image();
    phone.src = 'assets/Device.png';

    ball2 = new Image();
    ball2.src = 'assets/GettyImages-1196341149.png';
    shadow = new Image();
    shadow.src = 'assets/Shadow.png';

    word_mark_5g = new Image();
    word_mark_5g.src = 'assets/5G Word mark.png';

    cta = new Image();
    cta.src = 'assets/CTA.png';

    store.addEventListener('load', (e) => {
        ctx.drawImage(store, 0, 0);
    });

    lily1.addEventListener('load', (e) => {
        ctx.drawImage(lily1, 0, 50);
    });

    att.addEventListener('load', (e) => {
        ctx.drawImage(att, 15, 15, 77, 15);
    });

    globe.addEventListener('load', (e) => {
        ctx.drawImage(globe, 270, 220, 20, 20);
    });

    hoop_no_ball.addEventListener('load', (e) => {
        ctx.drawImage(hoop_no_ball, 160, 0, 122, 250);
    });

    shot4.addEventListener('load', (e) => {
        ctx.drawImage(shot4, 205, 3);
    });

    window.requestAnimationFrame(step);
});

// variables for all fade ins/outs
let fade_done = false;
let fade = 1.0;

function frame1() {
    background();

    ctx.drawImage(lily1, 0, 50);
}

function transition_1_2() {
    background();

    if(fade >= 0) {
        ctx.globalAlpha = fade;
        ctx.drawImage(lily1, 0, 50);

        ctx.globalAlpha = 1.0-fade;
        ctx.drawImage(lily2, 0, 50);

        ctx.globalAlpha = 1.0;

        fade-=0.2;
    } else {
        fade = 1.0;
        fade_done = true;
    }
}

function frame2() {
    background();

    ctx.drawImage(lily2, 0, 50);
}

//variables for tracking ball throw
let throw_start = false;
let ball_x = 25, ball_y = 160;
let ball_w = 95;
let up = true;

function ball_reset() {
    ball_x = 25, ball_y = 160, ball_w = 95;
}

function ball_throw() {
    ctx.drawImage(ball, ball_x, ball_y, ball_w, ball_w);
    ctx.drawImage(hoop_only, 197, 106, 48, 142);

    if(ball_w > 35) {
        ball_w-=4;
    }

    if(ball_x < 205) {
        ball_x += 7;
    }

    if(up) {    //upwards arc
        if(ball_y > -25) {
            let dif = ball_y-(-25);

            let speed = scale(dif, 0, 185, 5, 15);
            
            ball_y -= speed;
        } else {
            up = false;
        }
    } else {    //downwards arc
        if(ball_y < 125) {
            let dif = 125-ball_y;

            let speed = scale(dif, -25, 125, 1, 10);
            
            ball_y += speed;
        } else if (ball_y >= 125 && ball_y <= 330) {
            ball_y += 10;
        } else {
            throw_start = false;
            up = true;
        }
    }

    
}

function transition_2_3() {
    background();

    if(fade >= 0) {
        ctx.globalAlpha = fade;
        ctx.drawImage(lily2, 0, 50);

        ctx.globalAlpha = 1.0-fade;
        ctx.drawImage(lily3, 0, 50);

        ctx.globalAlpha = 1.0;

        fade-=0.2;
    } else {
        fade = 1.0;
        fade_done = true;
    }

    ball_throw();
    start_fr3_text = true;
}

function frame3() {
    background();

    ctx.drawImage(lily3, 0, 50);
}

//variables for "stay connected" text movement
let sc_line1_x = -225, sc_line2_x = -275;
let start_fr3_text = false;

function frame3_reset() {
    sc_line1_x = -225, sc_line2_x = -275;
    ctx.fillText("Stay connected to every", sc_line1_x, 215);
    ctx.fillText("NBA buzzer beater", sc_line2_x, 235);
}

function frame3_text() {
    ctx.fillStyle = "white";
    ctx.font = "18px ATTAleckSans";
    ctx.fillText("Stay connected to every", sc_line1_x, 215);
    ctx.fillText("NBA buzzer beater", sc_line2_x, 235);

    if(sc_line1_x < 10) {
        sc_line1_x += 10;
    }
    if(sc_line2_x < 10) {
        sc_line2_x += 10;
    }
}

//variables for blue vector thingy consuming screen
let blue_y = -400, blue_h = 700; 
let blue_done = true;

function transition_3_4() {
    if(fade >= 0) {
        ctx.globalAlpha = fade;
        frame3();
        frame3_text();

        ctx.globalAlpha = 1.0-fade;
        ctx.drawImage(bg, 0, blue_y, 300, blue_h);

        ctx.globalAlpha = 1.0;

        fade-=0.025;
    } else {
        fade = 1.0;
        fade_done = true;
        blue_done = false;
    }
}

function blue_reset() {
    blue_y = -400, blue_h = 700; 
}

//move the blue vector to proper position
function blue_move() {
    background2();
    ctx.drawImage(att_alt, 15, 15, 77, 15);

    if(blue_y < 111) {
        blue_y+=16;
    }

    if(blue_h > 140) {
        blue_h-=16;
    } else {
        blue_done = true;
        console.log(blue_y + " " + blue_h)
    }

    ctx.drawImage(bg, 0, blue_y, 300, blue_h);
}

//variables for "its not complicated"
let c_line1_x = -400, c_line2_x = -450;

//variables for phone and ball2 movement
let phone_x = 100, shadow_x = 100, ball2_x = 100, objects_x = 400;

function frame4_text() {
    ctx.fillStyle = "#00A8E0";
    ctx.font = "28px ATTAleckSans";
    ctx.fillText("It's not", 10 + c_line1_x, 100);
    ctx.fillText("complicated", 10 + c_line2_x, 130);

    if(c_line1_x < 0) {
        c_line1_x += 10;
    }

    if(c_line2_x < 0) {
        c_line2_x += 10;
    }
}

function frame4_text_leave() {
    ctx.fillStyle = "#00A8E0";
    ctx.font = "28px ATTAleckSans";
    ctx.fillText("It's not", 10 + c_line1_x, 100);
    ctx.fillText("complicated", 10 + c_line2_x, 130);

    if(c_line1_x <= 400) {
        c_line1_x += 20;
    }

    if(c_line2_x <= 400) {
        c_line2_x += 20;
    }
}

function frame4_obj() {
    ctx.drawImage(phone, 200 + objects_x, 50);
    ctx.drawImage(shadow, 220 + objects_x, 188);
    ctx.drawImage(ball2, 235 + objects_x, 140);

    if(objects_x > 0) {
        objects_x -= 10;
    }
}

function frame4_reset() {
    c_line1_x = -400, c_line2_x = -450;
    phone_x = 100, shadow_x = 100, ball2_x = 100, objects_x = 400;
}

function frame4() {
    background2();
    if(!key5) {
        ctx.drawImage(att_alt, 15, 15, 77, 15);
    }

    if(!key5) {
        frame4_text();
    }
    frame4_obj();
}

function transition_4_5() {
    if(fade >= 0) {
        ctx.globalAlpha = fade;
        ctx.drawImage(att_alt, 15, 15, 77, 15);
        frame4_text_leave();

        ctx.globalAlpha = 1.0;
        
        fade-=0.1;
    } else {
        fade = 1.0;
        fade_done = true;
    }
}

//variables for final att logo and cta
let att_x = -400, att_done = false, cta_fade = true;

function frame5_text() {
    ctx.drawImage(word_mark_5g, 10 + att_x, 70, 154, 45);

    if(att_x < 0) {
        att_x += 10;
    } else {
        att_done = true;
    }
}

function frame5_cta() {
    if(!cta_fade) {
        ctx.drawImage(cta, 10, 130, 95, 25);
    } else {
        if(fade >= 0) {
            ctx.globalAlpha = 1.0-fade;
            ctx.drawImage(cta, 10, 130, 95, 25);
    
            ctx.globalAlpha = 1.0;
            
            fade-=0.05;
        } else {
            fade = 1.0;
            cta_fade = false;
        }
    }
}

function frame5_reset() {
    att_x = -400, att_done = false, cta_fade = true;
}

function frame5() {
    background2();

    frame5_text();
    if(att_done) {
        frame5_cta();
    }
    frame4_obj();
}

//variable and function for changing shot clock
let clock = 5;

function shotclock(num) {
    if(num == 5) {
        ctx.drawImage(shot5, 205, 3);
    } else if(num == 4) {
        ctx.drawImage(shot4, 205, 3);
    } else if(num == 3) {
        ctx.drawImage(shot3, 205, 3);
    } else if(num == 2) {
        ctx.drawImage(shot2, 205, 3);
    } else if(num == 1) {
        ctx.drawImage(shot1, 205, 3);
    } else if(num == 0) {
        let light = ctx.createRadialGradient(220, 25, 5, 220, 25, 40);
        light.addColorStop(0, "cyan");
        light.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = light;
        ctx.fillRect(175, 0, 100, 50);

        ctx.drawImage(shot0, 205, 3);
    }
}

//function for background 1 (store)
function background() {
    ctx.drawImage(store, 0, 0);
    ctx.drawImage(att, 15, 15, 77, 15);
    ctx.drawImage(globe, 270, 220, 20, 20);
    ctx.drawImage(hoop_no_ball, 160, 0, 122, 250);
    ctx.drawImage(hoop_only, 197, 106, 48, 142);
    shotclock(clock);
}

//function for background 2 (not store)
function background2() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300, 250);
    ctx.drawImage(bg, 0, 112, 300, 140);
    ctx.drawImage(nba, 245, 205);
    ctx.drawImage(att_globe, 265, 205);
    
    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    ctx.fillText("5G req's compatible plan & device.", 10, 220);
    ctx.fillText("5G may not be avail. in your area.", 10, 230);
    ctx.fillText("See att.com/5Gforyou for more details.", 10, 240);
}

//time loop variables
let start, previousTimeStamp;

//ket frame booleans
let key1, key2, key3, key4, key5;


//ANIMATION LOOP
function step(timestamp) {
    //function modified from https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    if(start === undefined) {
        start = timestamp;
        key1 = true;
        key2 = false;
        key3 = false;
        key4 = false;
        key5 = false;
        clock = 5;
        ball_reset();
        frame3_reset();
        blue_reset();
        frame4_reset();
        frame5_reset();
        frame1();
    }

    const elapsed = timestamp - start;
    console.log(elapsed);

    if(previousTimeStamp !== timestamp) {
        //10 second animation
        if(elapsed < 10000) {
            if(key2) {frame2()}
            if(key3 && !key4) {frame3()}
            if(!key3 && key4) {frame4()}
            if(key5 && !key4) {frame5()}

            //update clock at specific times
            if(clock != 0) {
                if(elapsed > 2500 && clock == 1) {
                    clock--;
                    shotclock(clock);
                } else if(elapsed > 2000 && clock == 2) {
                    clock--;
                    shotclock(clock);
                } else if(elapsed > 1500 && clock == 3) {
                    clock--;
                    shotclock(clock);
                } else if(elapsed > 1000 &&clock == 4) {
                    clock--;
                    shotclock(clock);
                } else if(elapsed > 500 && clock == 5) {
                    clock--;
                    shotclock(clock);
                }
            }

            if(elapsed > 1000 && key1) {
                transition_1_2();
                throw_start = true;
                
                if(fade_done) {
                    fade_done = false;
                    key1 = false;
                    key2 = true;
                    frame2();
                }
            }

            if(elapsed > 2000 && key2) {
                transition_2_3();
                
                if(fade_done) {
                    fade_done = false;
                    key2 = false;
                    key3 = true;
                    frame3();
                }
            }

            if(elapsed > 4000 && key3) {
                transition_3_4();
                start_fr3_text = false;
                key4 = true;

                if(fade_done) {
                    fade_done = false;
                    key3 = false;
                }
            }

            if(elapsed > 7000 && key4) {
                key5 = true;
                transition_4_5();

                if(fade_done) {
                    fade_done = false;
                    key4 = false;
                }
            }

            //statements to handle animation events
            if(throw_start) {
                ball_throw();
            }

            if(start_fr3_text) {
                frame3_text();
            }

            if(!blue_done) {
                blue_move();
            }

            previousTimeStamp = timestamp;
            
            window.requestAnimationFrame(step);
        } else {
            //LOOP

            timestamp = 0;
            start = undefined;
            window.requestAnimationFrame(step);
        }
    }
}
