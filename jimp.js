const jimp = require("jimp");

async function main() {
  let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
  let mask = await jimp.read("welcome_images/mascara.png");
  //    let avatar = await jimp.read('welcome_images/teste.png');
  let background = await jimp.read("welcome_images/fundo.png");

  jimp
    .read(
      "https://cdn.discordapp.com/attachments/722471025073455124/924440358237130793/download20211206201540.png"
    )
    .then((avatar) => {
      avatar.resize(130, 130);
      mask.resize(130, 130);
      avatar.mask(mask);
      background.print(font, 200, 175, "Dante Alighieri");
      background.composite(avatar, 40, 90).write("welcome_images/beta.png");
    })
    .catch((err) => {
      console.log("Error 404");
    });
}
main();

client.on("guildMemberAdd", async (member) => {
    let channel = client.channels.get("711349793418641501");
    let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let mask = await jimp.read("welcome_images/mascara.png");
    let background = await jimp.read("welcome_images/fundo.png");
  
    jimp
      .read('welcome_images/teste.png')
      .then((avatar) => {
        avatar.resize(130, 130);
        mask.resize(130, 130);
        avatar.mask(mask);
        
        background.print(font, 200, 175, 'dante');
        background.composite(avatar, 40, 90).write("beta.png");
        channel.send(``, { files: ["beta.png"] });
  
        console.log("Image sended");
      })
      .catch((err) => {
        console.log("Error 404");
      });
  });
