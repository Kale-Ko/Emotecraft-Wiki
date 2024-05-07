# Emotecraft Wiki

## Mod Config

### Opening the Config

To open the config screen on Fabric if you have Mod Menu installed go to the title screen and click the "Mods" button. Then find "Emotecraft" in the list and click the little sliders button.

To open the config screen without Mod Menu click the play emotes key (See [Playing Emotes](%playing-emotes)). Then click "All emote" and finally "Config Emotes".

### Setting the Emote Wheel

See [Setting the Emote Wheel](%setting-emote-wheel).

### Mod config

To open the mod config simply click the "Mod Options" button on the config screen.

To change an option you can just left click on it or if it is a slider left click and drag.

#### Basic options

| Name                           | Range | Default | Description                                                               |
| :----------------------------- | :----: | :-: | :--------------------------------------------------------------------------- |
| Load Built-In Emotes           | ON/OFF | ON  | Weather or not to load the emotes that come with the mod                     |
| Enable quark deserializer      | ON/OFF | OFF | Weather or not to attempt to load emotes from the forge quark mod            |
| Use Dark Emote Wheel           | ON/OFF | OFF | Weather or not the emote wheel should be a dark color instead of light       |
| Use Old Emote Wheel Style      | ON/OFF | OFF | Weather or not the emote wheel should be reverted to how it was before 2.1.3 |
| Play Emotes in 3rd Person      | ON/OFF | ON  | Weather or not to switch to 3rd person mode when you play an emote           |
| Use Front View for 3rd Person  | ON/OFF | OFF | Weather or not to use third person front instead of back                     |
| Show Icons Only (If Available) | ON/OFF | ON  | Weather or not to show emote icons instead of their names when possible      |
| Allow NSFW Emotes              | ON/OFF | OFF | Weather or not to allow players to play NSFW emotes                          |

#### Expert options

| Name                               | Range       | Default | Description                                                                                       |
| :--------------------------------- | :---------: | :--: | :--------------------------------------------------------------------------------------------------- |
| Debug                              | ON/OFF      | ON   | Weather or not to print extra debug messages into the console                                        |
| Validate Emotes                    | ON/OFF      | OFF  | Weather or not to make sure players stay close to their actually position while playing emotes       |
| validationThreshold                | 0.04-256.0  | 8.0  | How far is too far for a limb to be                                                                  |
| Auto patch emotes to stop smoothly | ON/OFF      | ON   | Weather or not to patch some emotes so they smoothly move back to the normal player state at the end |
| Always Validate Received Emotes    | ON/OFF      | OFF  | Weather or not to always make sure the limbs are not to far, even if it is disabled on the server    |
| Hide Emotes From Muted Players     | ON/OFF      | ON   | Weather or not block emotes from muted players (1.16.4+)                                             |
| stopThreshold                      | 0.02-2980.0 | 0.04 | How fast a player needs to be going for an emote to be stopped                                       |
| yratio                             | 0.0-100.0   | 75.0 | How much the y (up/down) axis contributes to the stop threshold                                      |
| Show Hidden Options                | ON/OFF      | OFF  | Wether to show the hidden config section                                                             |

#### Hidden options

**Note:** You must have "Show Hidden Options" enabled to see these config options.

| Name                          | Range  | Default                | Description                                                                                                             |
| :---------------------------- | :----: | :--------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| Load Emotes on Logical Server | ON/OFF | clients:OFF servers:ON | Weather or not to load emotes on the logical server <span style="color: yellow;">**(KEEP THIS OFF FOR CLIENTS)**</span> |
| Never Remove Bad Icons        | ON/OFF | OFF                    | Weather or not to never remove invalid emote icons                                                                      |
| Export Built-in               | ON/OFF | OFF                    | Weather or not to export built in emotes when you run an emotes export                                                  |
| Hide "no server" warning      | ON/OFF | OFF                    | Weather or not to hind the "No server" warning you will see if the mod is not installed on the server                   |
