# Follow.js_for_PLAYCANVAS
Follow.js script for PlayCanvas
Welcome, I made this repository specifically to store this code for future use! and to share my work :^)
Please support my work via my Kofi -> https://ko-fi.com/thebiblecodex and check out my other repositories for more stuff I've made! all free!
---Features---
-Following the player/entity
-Adjustable speed 
-Adjustable distance that will always be maintained from the player
-Creates a psedocamera (i.e, a box that will look at the player's direction). This is important for ensuring models will look at players' positions when following them.
-Can parent models to the pseudocamera, allowing your models to follow the player.
---How to use this script---
> To use this script, firstly apply the script to an entity (e.g, use a cube to make this easy)
> After, you should check the inspector , where you can select which entity you want the object to follow (e.g, your player entity)
> Test by running the scene, all good?, Continue to the next step!
> You might have seen a box inside of your picked entity, so do not fret; that was the pseudo-camera. To avoid this, please disable the rendering of your selected entity. You should only be seeing the cube(i.e the pseudo-camera)
> Once done, run and test the scene!, Only seeing the cube?, You nailed it!

> **HOW TO GET YOUR IMPORTED MODEL FOLLOWING YOU**
> Firstly, get your imported model in the scene! (i.e, upload it to the assets tab by clicking the '+' sign and then, get it into the scene by right clicking 'root' in the hierarchy tab and clicking add template, and then search through the asset tab and click on your model)
> Now with the model in the scene, you will have to parent it to the pseudo-camera (p.s. do not worry about your model existing in 2 different places or issues like that, already accounted for that)
> Parent the model to the pseudo-camera by finding it in the inspector panel through your entity that has the script, select your model through the script (p.s. if your entity has child components, ensure the parent is selected!)
> Run the scene to test, make sure to disable the collision of your model in the scene to avoid movement issues. All good? ok, but your entity seems to be facing the wrong way, eh?
> In case your entity is facing wrongly or in the wrong place, you can easily edit it via the script through the inspector panel, tweak values till you get it right! edit the LOC,ROT and SCALE! :^)
> And that's a wrap if you have any issues! DM me on playcanvas or mention me in a post -> https://forum.playcanvas.com/u/potatoindivdual/summary
Thanks.
