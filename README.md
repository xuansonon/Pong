# Pong
Pong, a game that we all have played at least once in a lifetime. It's a classic! The game has two players (you and the AI), each having their own "paddles" and there is one ball. The aim of the game is to get the ball to go to the opponents side and past their paddle to score a point. If you would like to play, you can try the demo at: http://playpong.xuansonon.com
<br />
<br />
<img src="http://i.imgur.com/ISnreGM.jpg"/>
<br />
<br />
This game has been made in JavaScript, with the help of a bit of CSS for styling (fonts and position of the canvas). The game does include sound (taken from royalty-free sites). Furthermore, the motivation for this project is to understand the JavaScript, it's objects, animations and 2D context rendering.
<br />
<br />
**How to play**<br />
You can move your own paddle with the UP and DOWN arrow keys on your keyboard. If you feel the speed of your paddle is too slow, press the addtion key (+) (on your number bar); inversly, if it's too fast feel free to press the subtract button (-).
<br />
<br />
**There are still some issues that arise with this solution:** <br />
- Some calculation glitches so that when the ball (or puck) hits the top or bottom of the paddle it will move in an opposite direction expected.
- The AI is hard to defeat without increasing the speed of the ball/puck
- Consequently, when the ball/puck speed increases, the collision detection still works but there is no offset (i.e. users may see the puck positioned behind their paddle before reflecting)
- AI paddle moves into the top/bottom of screen (because of AI logic)
- When the ball hits the top of the screen sometimes it will get stuck

**Still to do**
- [ ] Implement Two-Player Matches
- [ ] Fix the calculation glitch
- [ ] Correct the puck offset
- [ ] Allow for ambigious keycodes and include extra support if no arrow keys are present (WASD keys).
- [ ] Fix AI
- [ ] Fix the puck logic
