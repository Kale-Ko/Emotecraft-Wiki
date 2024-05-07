# Emotecraft Wiki

## Creating Emotes With Blender

**This requires basic knowledge of how to move and rotate objects as well as use keyframes in blender.** For help see [this](https://docs.blender.org/manual/en/latest/scene_layout/object/editing/transform/introduction.html) and [this](https://docs.blender.org/manual/en/latest/animation/keyframes/introduction.html).

To start you are going to need [Blender](https://www.blender.org/download/).
If you need help installing it see [this](https://docs.blender.org/manual/en/latest/getting_started/installing/index.html).

Then you are going to need the Blender model, either with or without bend support. You can get it [here](%downloads#tool-downloads).

Once you have Blender installed, open the model. You should be greeted with a readme, make sure to read it.\
To get started switch to the animation tab. You can move and rotate any of the joints how you want and add keyframes.

When you are done or would like to test your emote switch to the export tab. Here you will see a script with a few variables you can edit. You can change the `emoteName`, `emoteDescription`, and `author` to whatever you want. If you want the emote to loop you can set `loop` to true and set `returnTick` to the tick you would like it to return to.\
When you are done click the play/run button. This will generate an emote.json in the same place as the blend file.

Next see [Installing Custom Emotes](%install-emotes) to install the emote you created.\
If you are testing your emote a-lot it is recommended you use [The Helpful Feature](%a-helpful-feature) but if you want you can still install it every time.

If you want you can add an icon for your emote, just put the image in the emotes folder as `{nameOfEmoteFile}.png`
You can also add music to your emotes, see [here](%creating-music)
